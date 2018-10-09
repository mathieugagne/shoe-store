import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { unreadNotificationListSelector } from '../state/notificationSelectors';
import StackedNotification from './StackedNotification';

const Root = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column-reverse;
  padding: ${props => props.theme.gutter}px;
  padding-left: 0;
  padding-bottom: 0;
  right: 0;
  top: 50px;
  width: 332px;
  z-index: ${props => props.theme.depths.notificationStack};
`;

function NotificationStack(props) {
  const { notifications } = props;

  return (
    <Root>
      {notifications.map(({ id }, index) => (
        <StackedNotification
          key={id}
          notificationId={id}
          removeFromStackTime={(index + 1) * 5000}
        />
      ))}
    </Root>
  );
}

NotificationStack.propTypes = {
  notifications: PropTypes.array.isRequired,
};

const mapState = state => ({
  notifications: unreadNotificationListSelector(state),
});

export default connect(mapState)(NotificationStack);
