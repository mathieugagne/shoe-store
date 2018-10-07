import { combineEpics } from 'redux-observable';

import inventory from './modules/inventory/state/inventoryEpics';
import notification from './modules/notification/state/notificationEpics';
import shoe from './modules/shoe/state/shoeEpics';
import store from './modules/store/state/storeEpics';

const epics = combineEpics(inventory, notification, shoe, store);

export default epics;
