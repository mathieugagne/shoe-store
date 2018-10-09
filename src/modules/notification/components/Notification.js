import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components/macro';
import { connect } from 'react-redux';
import { notificationSelector } from '../state/notificationSelectors';
import omitProps from '../../../libs/omitProps';
import { notificationRead } from '../state/notificationActions';

const Root = styled(omitProps(['isRead'])(Link))`
  display: block;
  padding: ${props => props.theme.gutter / 2}px ${props => props.theme.gutter}px;
  margin-bottom: ${props => props.theme.gutter / 2}px;
  background-color: ${props =>
    props.isRead ? 'transparent' : props.theme.primaryFaded};
  border-left-color: ${props =>
    props.isRead ? 'transparent' : props.theme.primary};
  border-left-style: solid;
  border-left-width: 2px;
  :hover {
    text-decoration: none;
  }
  :last-child {
    margin-bottom: 0;
  }
`;

const Title = styled.div`
  font-weight: 700;
  margin-bottom: ${props => props.theme.gutter / 4}px;
`;

const TimeAgo = styled.div`
  font-size: 12px;
`;

function Notification(props) {
  const { notification, onRead, className } = props;

  if (!notification) {
    return null;
  }

  return (
    <Root
      onClick={onRead}
      to={notification.to}
      isRead={notification.isRead}
      className={className}
    >
      <Title>{notification.title}</Title>
      <div>{notification.content}</div>
      <TimeAgo>{moment(notification.createdAt).fromNow()}</TimeAgo>
    </Root>
  );
}

Notification.defaultProps = {
  className: null,
  notification: null,
};

Notification.propTypes = {
  notification: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    isRead: PropTypes.bool.isRequired,
    createdAt: PropTypes.number.isRequired,
  }),
  className: PropTypes.string,
  onRead: PropTypes.func.isRequired,
};

const mapState = (state, { notificationId }) => ({
  notification: notificationSelector(state, {
    notificationId,
  }),
});

const mapDispatch = (dispatch, { notificationId }) => ({
  onRead: () => dispatch(notificationRead(notificationId)),
});

export default connect(
  mapState,
  mapDispatch,
)(Notification);
