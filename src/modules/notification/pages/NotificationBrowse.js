import PropTypes from 'prop-types';
import React from 'react';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import take from 'lodash/take';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';
import { notificationListSelector } from '../state/notificationSelectors';
import Notification from '../components/Notification';

function NotificationBrowse(props) {
  const { notificationList } = props;

  return (
    <>
      Today
      {take(notificationList, 50).map(({ id }) => (
        <Notification key={id} notificationId={id} />
      ))}
    </>
  );
}

const breadcrumb = [
  {
    label: 'Flash Sale Dashboard',
    to: '/',
  },
  {
    label: 'Notifications',
  },
];

NotificationBrowse.propTypes = {
  notificationList: PropTypes.array.isRequired,
};

const mapState = state => ({
  notificationList: notificationListSelector(state),
});

export default compose(
  injectBreadcrumb(breadcrumb),
  connect(mapState),
)(NotificationBrowse);
