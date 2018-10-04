import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import {
  INVENTORY_GLOBAL_REQUEST,
  inventoryGlobalSuccess,
  inventoryGlobalFailure,
} from './inventoryActions';
import graphqlCall from '../../../libs/graphqlCall';

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

export default combineEpics(inventoryGlobal);
