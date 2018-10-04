import { combineReducers } from 'redux';

import app from './modules/app/state/appReducer';

/**
 * Merge all reducers into one.
 *
 * @see http://redux.js.org/docs/api/combineReducers.html
 */
const rootReducer = combineReducers({
  app,
});

export default rootReducer;
