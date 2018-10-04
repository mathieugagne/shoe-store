import React from 'react';
import injectBreadcrumb from '../hocs/injectBreadcrumb';

function Overview() {
  return <div>Overview page</div>;
}

const breadcrumb = [
  {
    label: 'Flash Sale Dashboard',
    to: '/',
  },
  {
    label: 'Overview',
  },
];

export default injectBreadcrumb(breadcrumb)(Overview);
