import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { unreadNotificationCountSelector } from '../state/notificationSelectors';

const Root = styled.div`
  visibility: ${props => (props.hasNotification ? 'visible' : 'hidden')};
  font-size: 10px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 20px;
  color: #ffffff;
  background-color: ${props => props.theme.primary};
  margin-left: ${props => props.theme.gutter}px;
`;

function NotificationBullet(props) {
  const { unreadNotificationCount } = props;

  return (
    <Root hasNotification={Boolean(unreadNotificationCount)}>
      <div>
        {unreadNotificationCount > 99 ? '+99' : unreadNotificationCount}
      </div>
    </Root>
  );
}

NotificationBullet.propTypes = {
  unreadNotificationCount: PropTypes.number.isRequired,
};

const mapState = state => ({
  unreadNotificationCount: unreadNotificationCountSelector(state),
});

export default connect(mapState)(NotificationBullet);
