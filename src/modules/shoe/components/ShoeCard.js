import PropTypes from 'prop-types';
import React from 'react';
import round from 'lodash/round';
import { connect } from 'react-redux';
import { specificShoeAverageSoldPerStoreSelector } from '../../inventory/state/inventorySelectors';
import ShoeLink from './ShoeLink';
import MetricCard from '../../app/components/MetricCard';

function ShoeCard(props) {
  const { shoeId, averageSoldPerStore } = props;

  const averageSoldPerStoreRounded = round(averageSoldPerStore, 2);

  return (
    <MetricCard
      title={<ShoeLink shoeId={shoeId} />}
      metrics={[
        {
          label: averageSoldPerStoreRounded,
          title: 'Avg. sold/store',
          content: averageSoldPerStoreRounded,
        },
      ]}
    />
  );
}

ShoeCard.propTypes = {
  averageSoldPerStore: PropTypes.number.isRequired,
  shoeId: PropTypes.string.isRequired,
};

const mapState = (state, { shoeId }) => ({
  averageSoldPerStore: specificShoeAverageSoldPerStoreSelector(state, {
    shoeId,
  }),
});

export default connect(mapState)(ShoeCard);
