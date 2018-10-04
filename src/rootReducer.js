import { combineReducers } from 'redux';

import app from './modules/app/state/appReducer';
import inventory from './modules/inventory/state/inventoryReducer';
import shoe from './modules/shoe/state/shoeReducer';
import store from './modules/store/state/storeReducer';

/**
 * Merge all reducers into one.
 *
 * @see http://redux.js.org/docs/api/combineReducers.html
 */
const rootReducer = combineReducers({
  app,
  inventory,
  shoe,
  store,
});

export default rootReducer;
