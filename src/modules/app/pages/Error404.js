import React from 'react';
import injectBreadcrumb from '../hocs/withBreadcrumb';

function Error404() {
  return <div>404</div>;
}

const breadcrumb = [
  {
    label: 'Flash Sale Dashboard',
    to: '/',
  },
  {
    label: 'Not Found',
  },
];

export default injectBreadcrumb(breadcrumb)(Error404);
