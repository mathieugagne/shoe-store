import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';

export const shoeIdSelector = (state, { shoeId }) => shoeId;

export const shoeItemsSelector = state => state.shoe.items;
export const shoeListSelector = createSelector(shoeItemsSelector, items =>
  Object.values(items),
);

export const shoeSelector = createCachedSelector(
  shoeItemsSelector,
  shoeIdSelector,
  (items, shoeId) => items[shoeId] || null,
)(shoeIdSelector);
