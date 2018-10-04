import React from 'react';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';

function ShoeBrowse() {
  return <div>Browse shoes page</div>;
}

const breadcrumb = [
  {
    label: 'Flash Sale Dashboard',
    to: '/',
  },
  {
    label: 'Shoes',
  },
];

export default injectBreadcrumb(breadcrumb)(ShoeBrowse);
