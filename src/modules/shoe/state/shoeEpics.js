import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import {
  SHOE_BROWSE_REQUEST,
  shoeBrowseSuccess,
  shoeBrowseFailure,
} from './shoeActions';
import graphqlCall from '../../../libs/graphqlCall';

const shoeBrowse = action$ =>
  action$.pipe(
    ofType(SHOE_BROWSE_REQUEST),
    mergeMap(() =>
      graphqlCall({
        query: `{
          shoes {
            id
            name
          } 
        }`,
      }).pipe(
        map(({ data }) => shoeBrowseSuccess(data.shoes)),
        catchError(error => of(shoeBrowseFailure(error))),
      ),
    ),
  );

export default combineEpics(shoeBrowse);
