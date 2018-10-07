import PropTypes from 'prop-types';
import React from 'react';
import take from 'lodash/take';
import { connect } from 'react-redux';
import { lowestStoreInventoryListSelector } from '../state/inventorySelectors';
import Table from '../../app/components/Table';
import TableHeader from '../../app/components/TableHeader';
import TableRow from '../../app/components/TableRow';
import TableCell from '../../app/components/TableCell';
import StoreLink from '../../store/components/StoreLink';

function StoreWithLowestInventoryTable(props) {
  const { inventory, limit } = props;

  if (!inventory) {
    return null;
  }

  return (
    <Table>
      <TableRow>
        <TableHeader>Store</TableHeader>
        <TableHeader>Quantity</TableHeader>
      </TableRow>
      {(limit ? take(inventory, limit) : inventory).map(
        ({ storeId, quantity }) => (
          <TableRow key={storeId}>
            <TableCell>
              <StoreLink storeId={storeId} />
            </TableCell>
            <TableCell>{quantity}</TableCell>
          </TableRow>
        ),
      )}
    </Table>
  );
}

StoreWithLowestInventoryTable.defaultProps = {
  inventory: null,
  limit: null,
};

StoreWithLowestInventoryTable.propTypes = {
  inventory: PropTypes.array,
  limit: PropTypes.number,
};

const mapState = state => ({
  inventory: lowestStoreInventoryListSelector(state),
});

export default connect(mapState)(StoreWithLowestInventoryTable);
