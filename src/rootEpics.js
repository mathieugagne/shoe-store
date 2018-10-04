import { combineEpics } from 'redux-observable';

import inventory from './modules/inventory/state/inventoryEpics';
import shoe from './modules/shoe/state/shoeEpics';
import store from './modules/store/state/storeEpics';

const epics = combineEpics(inventory, shoe, store);

export default epics;
