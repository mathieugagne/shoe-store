import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  storeBestSellerSelector,
  storeTotalInventoryCountSelector,
  storeWorstSellerSelector,
} from '../../inventory/state/inventorySelectors';
import StoreLink from './StoreLink';
import ShoeLink from '../../shoe/components/ShoeLink';
import MetricCard from '../../app/components/MetricCard';

function StoreCard(props) {
  const {
    storeId,
    bestSellerShoeId,
    worstSellerShoeId,
    totalInventoryCount,
  } = props;

  return (
    <MetricCard
      title={<StoreLink storeId={storeId} />}
      metrics={[
        {
          label: bestSellerShoeId,
          title: 'Best Seller',
          content: <ShoeLink shoeId={bestSellerShoeId} />,
        },
        {
          label: worstSellerShoeId,
          title: 'Worst Seller',
          content: <ShoeLink shoeId={worstSellerShoeId} />,
        },
        {
          label: totalInventoryCount,
          title: 'Inventory',
          content: totalInventoryCount,
        },
      ]}
    />
  );
}

StoreCard.defaultProps = {
  bestSellerShoeId: null,
  worstSellerShoeId: null,
  totalInventoryCount: 0,
};

StoreCard.propTypes = {
  bestSellerShoeId: PropTypes.string,
  storeId: PropTypes.string.isRequired,
  worstSellerShoeId: PropTypes.string,
  totalInventoryCount: PropTypes.number,
};

const mapState = (state, { storeId }) => ({
  bestSellerShoeId: storeBestSellerSelector(state, { storeId }),
  worstSellerShoeId: storeWorstSellerSelector(state, { storeId }),
  totalInventoryCount: storeTotalInventoryCountSelector(state, { storeId }),
});

export default connect(mapState)(StoreCard);
