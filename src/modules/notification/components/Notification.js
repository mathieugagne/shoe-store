import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { notificationSelector } from '../state/notificationSelectors';

const Root = styled.div`
  padding: ${props => props.theme.gutter / 2}px ${props => props.theme.gutter}px;
`;

function Notification(props) {
  const { notification } = props;

  if (!notification) {
    return null;
  }

  return (
    <Root>
      <div>{notification.title}</div>
      <div>{notification.content}</div>
      <div>{moment(notification.createdAt).fromNow()}</div>
    </Root>
  );
}

Notification.defaultProps = {
  notification: null,
};

Notification.propTypes = {
  notification: PropTypes.object,
};

const mapState = (state, { notificationId }) => ({
  notification: notificationSelector(state, {
    notificationId,
  }),
});

export default connect(mapState)(Notification);
