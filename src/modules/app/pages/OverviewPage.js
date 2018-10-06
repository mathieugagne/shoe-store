import { Row, Col } from 'react-flexbox-grid';
import React from 'react';
import injectBreadcrumb from '../hocs/injectBreadcrumb';
import StoreWithLowestInventoryTable from '../../inventory/components/StoreWithLowestInventoryTable';
import InventoryChangeLogTable from '../../inventory/components/InventoryChangeLogTable';
import ShoeWithBiggestInventoryTable from '../../inventory/components/ShoeWithBiggestInventoryTable';

function OverviewPage() {
  return (
    <Row>
      <Col md={6}>
        Stores with lowest inventory
        <StoreWithLowestInventoryTable limit={3} />
      </Col>
      <Col md={6}>
        Shoe with biggest inventory
        <ShoeWithBiggestInventoryTable limit={3} />
      </Col>
      <Col xs={12}>
        Last 50 inventory changes
        <InventoryChangeLogTable limit={50} />
      </Col>
    </Row>
  );
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

export default injectBreadcrumb(breadcrumb)(OverviewPage);
