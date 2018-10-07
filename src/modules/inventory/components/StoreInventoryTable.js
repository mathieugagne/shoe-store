import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { storeInventoryByQuerySelector } from '../state/inventorySelectors';
import Table from '../../app/components/Table';
import TableHeader from '../../app/components/TableHeader';
import TableRow from '../../app/components/TableRow';
import TableCell from '../../app/components/TableCell';
import ShoeLink from '../../shoe/components/ShoeLink';

function StoreInventoryTable(props) {
  const { inventory } = props;

  if (!inventory) {
    return null;
  }

  return (
    <Table>
      <TableRow>
        {/* TODO: order on name instead of shoeId, but for now it works, because name and id are equal... */}
        <TableHeader orderKey="shoeId">Shoe</TableHeader>
        <TableHeader orderKey="quantity">Quantity</TableHeader>
        <TableHeader orderKey="sold">Sold</TableHeader>
        <TableHeader>Status</TableHeader>
      </TableRow>
      {inventory.map(shoeInventory => (
        <TableRow key={shoeInventory.shoeId}>
          <TableCell>
            <ShoeLink shoeId={shoeInventory.shoeId} />
          </TableCell>
          <TableCell>{shoeInventory.quantity}</TableCell>
          <TableCell>{shoeInventory.sold}</TableCell>
          <TableCell />
        </TableRow>
      ))}
    </Table>
  );
}

StoreInventoryTable.defaultProps = {
  inventory: null,
};

StoreInventoryTable.propTypes = {
  inventory: PropTypes.array,
};

const mapState = (state, { storeId }) => ({
  inventory: storeInventoryByQuerySelector(state, {
    storeId,
  }),
});

export default connect(mapState)(StoreInventoryTable);
