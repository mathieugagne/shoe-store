import { Row, Col } from 'react-flexbox-grid';
import React from 'react';
import styled from 'styled-components';
import injectBreadcrumb from '../hocs/injectBreadcrumb';
import StoreWithLowestInventoryTable from '../../inventory/components/StoreWithLowestInventoryTable';
import InventoryChangeLogTable from '../../inventory/components/InventoryChangeLogTable';
import ShoeWithBiggestInventoryTable from '../../inventory/components/ShoeWithBiggestInventoryTable';
import RealtimeNumberOfSalesChart from '../../inventory/components/RealtimeNumberOfSalesChart';

const Title = styled.div`
  margin-bottom: ${props => props.theme.text.fontSize}px;
  font-size: 22px;
`;

const StyledCol = styled(Col)`
  margin-bottom: ${props => props.theme.text.fontSize * 3}px;
  :last-child {
    margin-bottom: 0;
  }
`;

function OverviewPage() {
  return (
    <Row>
      <StyledCol xs={12}>
        <Title>Realtime number of sales</Title>
        <RealtimeNumberOfSalesChart />
      </StyledCol>
      <StyledCol md={6}>
        <Title>Stores with lowest inventory</Title>
        <StoreWithLowestInventoryTable limit={3} />
      </StyledCol>
      <StyledCol md={6}>
        <Title>Shoe with biggest inventory</Title>
        <ShoeWithBiggestInventoryTable limit={3} />
      </StyledCol>
      <StyledCol xs={12}>
        <Title>Last 50 inventory changes</Title>
        <InventoryChangeLogTable limit={50} />
      </StyledCol>
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
