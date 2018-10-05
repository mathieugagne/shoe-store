import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import {
  STORE_BROWSE_REQUEST,
  storeBrowseSuccess,
  storeBrowseFailure,
} from './storeActions';
import graphqlCall from '../../../libs/observables/graphqlCall';

const storeBrowse = action$ =>
  action$.pipe(
    ofType(STORE_BROWSE_REQUEST),
    mergeMap(() =>
      graphqlCall({
        query: `{
          stores {
            id
            name
          } 
        }`,
      }).pipe(
        map(({ data }) => storeBrowseSuccess(data.stores)),
        catchError(error => of(storeBrowseFailure(error))),
      ),
    ),
  );

export default combineEpics(storeBrowse);
