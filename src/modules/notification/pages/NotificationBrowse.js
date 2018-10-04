import React from 'react';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';

function NotificationBrowse() {
  return <div>Browse notifications page</div>;
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

export default injectBreadcrumb(breadcrumb)(NotificationBrowse);
