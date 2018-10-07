import PropTypes from 'prop-types';
import React from 'react';
import take from 'lodash/take';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {
  newChangeLogCountSelector,
  oldChangeLogSelector,
} from '../state/inventorySelectors';
import Table from '../../app/components/Table';
import TableHeader from '../../app/components/TableHeader';
import TableRow from '../../app/components/TableRow';
import TableCell from '../../app/components/TableCell';
import { inventoryChangeLogRemoveNewGlag } from '../state/inventoryActions';
import StoreLink from '../../store/components/StoreLink';
import ShoeLink from '../../shoe/components/ShoeLink';

const NewChangeLogCountCell = styled(TableCell)`
  text-align: center;
  background-color: ${props => props.theme.primary};
  padding: 8px;
  font-size: ${props => props.theme.text.fontSize - 4}px;
  color: #ffffff;
  font-weight: 700;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const NewChangeLogCountRow = styled(TableRow)`
  height: 25px;
`;

function InventoryChangeLogTable(props) {
  const { changeLog, newChangeLogCount, limit, showNewChangeLog } = props;

  if (!changeLog) {
    return null;
  }

  return (
    <Table>
      <TableRow>
        <TableHeader>Store</TableHeader>
        <TableHeader>Shoe sold</TableHeader>
        <TableHeader>Quantity after purchase</TableHeader>
      </TableRow>
      {Boolean(newChangeLogCount) && (
        <NewChangeLogCountRow onClick={showNewChangeLog}>
          <NewChangeLogCountCell colSpan="4">
            Show{' '}
            {limit && newChangeLogCount > limit
              ? `+${limit}`
              : newChangeLogCount}{' '}
            new inventory changes
          </NewChangeLogCountCell>
        </NewChangeLogCountRow>
      )}
      {(limit ? take(changeLog, limit) : changeLog).map(shoeInventory => (
        <TableRow key={shoeInventory.id}>
          <TableCell>
            <StoreLink storeId={shoeInventory.store} />
          </TableCell>
          <TableCell>
            <ShoeLink shoeId={shoeInventory.model} />
          </TableCell>
          <TableCell>{shoeInventory.inventory}</TableCell>
        </TableRow>
      ))}
    </Table>
  );
}

InventoryChangeLogTable.defaultProps = {
  changeLog: null,
  limit: null,
};

InventoryChangeLogTable.propTypes = {
  changeLog: PropTypes.array,
  newChangeLogCount: PropTypes.number.isRequired,
  limit: PropTypes.number,
  showNewChangeLog: PropTypes.func.isRequired,
};

const mapState = state => ({
  changeLog: oldChangeLogSelector(state),
  newChangeLogCount: newChangeLogCountSelector(state),
});

const mapDispatch = dispatch => ({
  showNewChangeLog: () => dispatch(inventoryChangeLogRemoveNewGlag()),
});

export default connect(
  mapState,
  mapDispatch,
)(InventoryChangeLogTable);
