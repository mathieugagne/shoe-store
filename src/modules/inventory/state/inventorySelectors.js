import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import sumBy from 'lodash/sumBy';
import orderBy from 'lodash/orderBy';
import takeRight from 'lodash/takeRight';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import {
  storeIdSelector,
  storeCountSelector,
} from '../../store/state/storeSelectors';
import { shoeIdSelector } from '../../shoe/state/shoeSelectors';
import { querySelector, runQuery } from '../../app/state/appSelectors';

export const inventoryItemsSelector = state => state.inventory.items;
export const numberOfSalesMonitorSelector = state =>
  state.inventory.numberOfSalesMonitor;
export const inventoryChangeLogSelector = state => state.inventory.changeLog;

export const numberOfSalesChartDataSelector = createCachedSelector(
  numberOfSalesMonitorSelector,
  (state, { take }) => take,
  (monitor, take) =>
    takeRight(monitor, take).map(({ id, sales, date }) => ({
      id,
      x: date,
      y: sales,
    })),
)((state, { take }) => String(take));

export const inventoryListSelector = createSelector(
  inventoryItemsSelector,
  items => Object.values(items),
);

export const globalShoeInventorySelector = createSelector(
  inventoryItemsSelector,
  items =>
    Object.values(items).reduce(
      (inventoryCarry, storeInventory) =>
        Object.values(storeInventory.inventory).reduce(
          (carry, { shoeId, quantity, sold }) => ({
            ...carry,
            [shoeId]: {
              shoeId,
              quantity: carry[shoeId]
                ? carry[shoeId].quantity + quantity
                : quantity,
              sold: carry[shoeId] ? carry[shoeId].sold + sold : sold,
            },
          }),
          inventoryCarry,
          {},
        ),
      {},
    ),
);

export const globalShoeInventoryListSelector = createSelector(
  globalShoeInventorySelector,
  inventory => Object.values(inventory),
);

export const oldChangeLogSelector = createSelector(
  inventoryChangeLogSelector,
  list => list.filter(x => !x.isNew),
);

export const newChangeLogSelector = createSelector(
  inventoryChangeLogSelector,
  list => list.filter(x => x.isNew),
);

export const newChangeLogCountSelector = createSelector(
  newChangeLogSelector,
  list => list.length,
);

export const storeInventorySelector = createCachedSelector(
  inventoryItemsSelector,
  storeIdSelector,
  (items, storeId) => items[storeId] || null,
)(storeIdSelector);

export const storeInventoryListSelector = createCachedSelector(
  storeInventorySelector,
  storeInventory =>
    (storeInventory &&
      storeInventory.inventory &&
      Object.values(storeInventory.inventory)) ||
    null,
)(storeIdSelector);

export const storeInventoryByQuerySelector = createCachedSelector(
  storeInventoryListSelector,
  querySelector,
  runQuery,
)(storeIdSelector);

export const lowestStoreInventoryListSelector = createSelector(
  inventoryListSelector,
  list =>
    orderBy(
      list.map(({ storeId, inventory }) => ({
        storeId,
        quantity: sumBy(Object.values(inventory), 'quantity'),
      })),
      'quantity',
    ),
);

export const biggestShoeInventorySelector = createSelector(
  globalShoeInventoryListSelector,
  list => orderBy(list, 'quantity', 'desc'),
);

export const storeBestSellerSelector = createCachedSelector(
  storeInventorySelector,
  storeInventory => {
    if (!storeInventory) {
      return null;
    }

    const { shoeId } = maxBy(Object.values(storeInventory.inventory), 'sold');

    return shoeId;
  },
)(storeIdSelector);

export const storeWorstSellerSelector = createCachedSelector(
  storeInventorySelector,
  storeInventory => {
    if (!storeInventory) {
      return null;
    }

    const { shoeId } = minBy(Object.values(storeInventory.inventory), 'sold');

    return shoeId;
  },
)(storeIdSelector);

export const storeTotalInventoryCountSelector = createCachedSelector(
  storeInventorySelector,
  storeInventory => {
    if (!storeInventory) {
      return null;
    }

    return sumBy(Object.values(storeInventory.inventory), 'quantity');
  },
)(storeIdSelector);

export const specificShoeAverageSoldPerStoreSelector = createCachedSelector(
  globalShoeInventorySelector,
  storeCountSelector,
  shoeIdSelector,
  (globalShoeInventory, storeCount, shoeId) => {
    const shoeInventory = globalShoeInventory[shoeId];

    if (!(shoeInventory && shoeInventory.sold)) {
      return 0;
    }

    return shoeInventory.sold / storeCount;
  },
)(shoeIdSelector);
