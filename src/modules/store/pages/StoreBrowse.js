import React from 'react';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';

function StoreBrowse() {
  return <div>Browse stores page</div>;
}

const breadcrumb = [
  {
    label: 'Flash Sale Dashboard',
    to: '/',
  },
  {
    label: 'Stores',
  },
];

export default injectBreadcrumb(breadcrumb)(StoreBrowse);
