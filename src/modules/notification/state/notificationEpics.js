import uuid from 'uuid/v4';
import { of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import { INVENTORY_CHANGE_RECEIVED } from '../../inventory/state/inventoryActions';
import {
  HIGH_SHOE_STORE_INVENTORY_STARTS_AT,
  LOW_SHOE_STORE_INVENTORY_STARTS_AT,
} from '../../inventory/inventoryConstants';
import { notificationReceived } from './notificationActions';
import {
  NOTIFICATION_TYPE_EMPTY_INVENTORY,
  NOTIFICATION_TYPE_HIGH_INVENTORY,
  NOTIFICATION_TYPE_LOW_INVENTORY,
} from '../notificationConstants';

// Here we are gonna simulate notification coming from the
// server by emitting notifications based on the payload
// of the inventory change action
const notify = action$ =>
  action$.pipe(
    ofType(INVENTORY_CHANGE_RECEIVED),
    mergeMap(({ payload }) => {
      const { store, model, inventory } = payload;

      let notificationType;
      let title;
      let content;

      if (inventory < 1) {
        title = 'Empty inventory';
        content = `There is no pair of ${model} left at ${store}!`;
        notificationType = NOTIFICATION_TYPE_EMPTY_INVENTORY;
      } else if (inventory <= LOW_SHOE_STORE_INVENTORY_STARTS_AT) {
        title = 'Low inventory';
        const plural = inventory > 1 ? 's' : '';
        content = `There is only ${inventory} pair${plural} of ${model} at ${store}.`;
        notificationType = NOTIFICATION_TYPE_LOW_INVENTORY;
      } else if (inventory >= HIGH_SHOE_STORE_INVENTORY_STARTS_AT) {
        title = 'High inventory';
        content = `There is ${inventory} pairs of ${model} at ${store}.`;
        notificationType = NOTIFICATION_TYPE_HIGH_INVENTORY;
      } else {
        return EMPTY;
      }

      return of(
        notificationReceived(
          uuid(),
          notificationType,
          title,
          content,
          false,
          Date.now(),
        ),
      );
    }),
  );

export default combineEpics(notify);
