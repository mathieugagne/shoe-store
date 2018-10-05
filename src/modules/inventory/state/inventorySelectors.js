import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import sumBy from 'lodash/sumBy';
import createCachedSelector from 're-reselect';
import { storeIdSelector } from '../../store/state/storeSelectors';

export const inventoryItemsSelector = state => state.inventory.items;

export const storeInventorySelector = createCachedSelector(
  inventoryItemsSelector,
  storeIdSelector,
  (items, storeId) => items[storeId] || null,
)(storeIdSelector);

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
