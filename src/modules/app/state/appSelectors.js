import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import get from 'lodash/get';
import find from 'lodash/find';
import orderBy from 'lodash/orderBy';

export const querySelector = state => state.app.query;

/* eslint-disable no-param-reassign */
export const runQuery = (list, query) => {
  if (!list) {
    return null;
  }

  if (!query) {
    return list;
  }

  const { q: searchTerm, searchKey, order } = query;

  if (searchTerm && searchKey) {
    // list = ...;
  }

  if (order) {
    const keys = order.map(x => x[0]);
    const direction = order.map(x => x[1]);

    list = orderBy(list, keys, direction);
  }

  return list;
};
/* eslint-enable no-param-reassign */

export const orderKeySelector = (state, { orderKey }) => orderKey;

export const orderSelector = createSelector(
  querySelector,
  query => get(query, 'order') || null,
);

export const orderDirectionSelector = createCachedSelector(
  orderSelector,
  orderKeySelector,
  (order, orderKey) => {
    if (!order) {
      return null;
    }

    const orderItem = find(order, x => x[0] === orderKey);

    return get(orderItem, '[1]') || null;
  },
)(orderKeySelector);
