import { of } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import {
  INVENTORY_GLOBAL_REQUEST,
  INVENTORY_GLOBAL_SUCCESS,
  inventoryGlobalSuccess,
  inventoryGlobalFailure,
  inventoryChangeReceived,
  inventoryChangeFailure,
  inventoryChangeListen,
  INVENTORY_CHANGE_LISTEN,
} from './inventoryActions';
import graphqlCall from '../../../libs/observables/graphqlCall';

const inventoryGlobal = action$ =>
  action$.pipe(
    ofType(INVENTORY_GLOBAL_REQUEST),
    mergeMap(() =>
      graphqlCall({
        query: `{
          globalInventory {
            storeId
            inventory {
              shoeId
              quantity
              sold
            }
          }
        }`,
      }).pipe(
        map(({ data }) => inventoryGlobalSuccess(data.globalInventory)),
        catchError(error => of(inventoryGlobalFailure(error))),
      ),
    ),
  );

const startListenInventoryChange = action$ =>
  action$.pipe(
    ofType(INVENTORY_GLOBAL_SUCCESS),
    map(() => inventoryChangeListen()),
  );

const listenInventoryChange = action$ =>
  action$.pipe(
    ofType(INVENTORY_CHANGE_LISTEN),
    mergeMap(() =>
      // TODO: move url to environment variable
      webSocket('ws://localhost:8080/').pipe(
        map(({ store, model, inventory }) =>
          inventoryChangeReceived(store, model, inventory),
        ),
        catchError(error => of(inventoryChangeFailure(error))),
      ),
    ),
  );

export default combineEpics(
  inventoryGlobal,
  startListenInventoryChange,
  listenInventoryChange,
);
