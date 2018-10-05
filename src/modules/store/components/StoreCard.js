import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import { storeSelector } from '../state/storeSelectors';
import {
  storeBestSellerSelector,
  storeTotalInventoryCountSelector,
  storeWorstSellerSelector,
} from '../../inventory/state/inventorySelectors';

const Root = styled.div`
  background-color: ${props => props.theme.backgroundContrast};
  padding: ${props => props.theme.gutter}px;
  font-size: 14px;
`;

const CardTitle = styled(Link)`
  display: block;
  padding-bottom: ${props => props.theme.gutter / 2}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetricTitle = styled.div`
  font-size: 10px;
  padding-bottom: ${props => props.theme.gutter / 4}px;
`;

const MetricContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function StoreCard(props) {
  const {
    store,
    bestSellerShoeId,
    worstSellerShoeId,
    totalInventoryCount,
  } = props;

  if (!store) {
    return null;
  }

  return (
    <Root>
      <CardTitle to={store.readUrl}>{store.name}</CardTitle>
      <Row>
        <Col title={bestSellerShoeId} xs={4}>
          <MetricTitle>Best Seller</MetricTitle>
          <MetricContent>{bestSellerShoeId}</MetricContent>
        </Col>
        <Col title={worstSellerShoeId} xs={4}>
          <MetricTitle>Worst Seller</MetricTitle>
          <MetricContent>{worstSellerShoeId}</MetricContent>
        </Col>
        <Col title={totalInventoryCount} xs={4}>
          <MetricTitle>Inventory</MetricTitle>
          <MetricContent>{totalInventoryCount}</MetricContent>
        </Col>
      </Row>
    </Root>
  );
}

StoreCard.defaultProps = {
  bestSellerShoeId: null,
  store: null,
  worstSellerShoeId: null,
  totalInventoryCount: 0,
};

StoreCard.propTypes = {
  bestSellerShoeId: PropTypes.string,
  store: PropTypes.object,
  worstSellerShoeId: PropTypes.string,
  totalInventoryCount: PropTypes.number,
};

const mapState = (state, { storeId }) => ({
  store: storeSelector(state, { storeId }),
  bestSellerShoeId: storeBestSellerSelector(state, { storeId }),
  worstSellerShoeId: storeWorstSellerSelector(state, { storeId }),
  totalInventoryCount: storeTotalInventoryCountSelector(state, { storeId }),
});

export default connect(mapState)(StoreCard);
