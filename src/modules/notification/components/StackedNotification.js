import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import Notification from './Notification';
import { notificationRemoveFromStack } from '../state/notificationActions';

const StyledNotification = styled(Notification)`
  transform: translateX(${props => (props.display ? 0 : 352)}px);
  transition: transform 250ms ease-in;
  margin-bottom: ${props => props.theme.gutter / 2}px;
  box-shadow: 0 -${props => props.theme.gutter}px ${props =>
      props.theme.gutter}px ${props => props.theme.gutter}px ${props => props.theme.background};
  :first-child {
    margin-bottom: 0;
    box-shadow: 0 0 ${props => props.theme.gutter}px
      ${props => props.theme.gutter}px ${props => props.theme.background};
  }
  :last-child {
    margin-bottom: ${props => props.theme.gutter / 2}px;
  }
`;

class StackedNotification extends Component {
  state = { display: false };

  timeoutId = null;

  componentDidMount() {
    const { removeFromStack, removeFromStackTime } = this.props;

    setTimeout(this.display, 1);

    this.removeTimeoutId = setTimeout(removeFromStack, removeFromStackTime);
    this.hideTimeoutId = setTimeout(this.hide, removeFromStackTime - 250);
  }

  componentWillUnmount() {
    clearTimeout(this.removeTimeoutId);
    clearTimeout(this.hideTimeoutId);
  }

  display = () => this.setState({ display: true });

  hide = () => this.setState({ display: false });

  render() {
    const { removeFromStack, ...rest } = this.props;
    const { display } = this.state;

    return <StyledNotification display={display} {...rest} />;
  }
}

StackedNotification.defaultProps = {
  removeFromStackTime: 7500,
};

StackedNotification.propTypes = {
  removeFromStack: PropTypes.func.isRequired,
  removeFromStackTime: PropTypes.number,
};

const mapDispatch = (dispatch, { notificationId }) => ({
  removeFromStack: () => dispatch(notificationRemoveFromStack(notificationId)),
});

export default connect(
  null,
  mapDispatch,
)(StackedNotification);
