import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

export const storeIdSelector = (state, { storeId }) => storeId;

export const storeItemsSelector = state => state.store.items;
export const storeListSelector = createSelector(storeItemsSelector, items =>
  Object.values(items),
);
export const storeCountSelector = createSelector(
  storeListSelector,
  list => list.length,
);

export const storeSelector = createCachedSelector(
  storeItemsSelector,
  storeIdSelector,
  (items, storeId) => items[storeId] || null,
)(storeIdSelector);
