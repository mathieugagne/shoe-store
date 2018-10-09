import createCachedSelector from 're-reselect';
import { createSelector } from 'reselect';
import orderBy from 'lodash/orderBy';
import sumBy from 'lodash/sumBy';

export const notificationItemsSelector = state => state.notification.items;
export const notificationIdPropSelector = (state, { notificationId }) =>
  notificationId;

export const notificationListSelector = createSelector(
  notificationItemsSelector,
  items => {
    const list = Object.values(items);

    return orderBy(list, 'createdAt', 'desc');
  },
);

export const unreadNotificationListSelector = createSelector(
  notificationListSelector,
  list => list.filter(({ isRead, isInStack }) => isInStack && !isRead),
);

export const unreadNotificationCountSelector = createSelector(
  notificationItemsSelector,
  items => sumBy(Object.values(items), ({ isRead }) => (isRead ? 0 : 1)),
);

export const notificationSelector = createCachedSelector(
  notificationItemsSelector,
  notificationIdPropSelector,
  (items, notificationId) => items[notificationId] || null,
)(notificationIdPropSelector);
