export const INVENTORY_CHANGE_LOG_REMOVE_NEW_FLAG =
  'INVENTORY_CHANGE_LOG_REMOVE_NEW_FLAG';
export const inventoryChangeLogRemoveNewFlag = () => ({
  type: INVENTORY_CHANGE_LOG_REMOVE_NEW_FLAG,
});

export const INVENTORY_GLOBAL_REQUEST = 'INVENTORY_GLOBAL_REQUEST';
export const inventoryGlobalRequest = () => ({
  type: INVENTORY_GLOBAL_REQUEST,
});

export const INVENTORY_GLOBAL_SUCCESS = 'INVENTORY_GLOBAL_SUCCESS';
export const inventoryGlobalSuccess = inventory => ({
  type: INVENTORY_GLOBAL_SUCCESS,
  payload: {
    inventory,
  },
});

export const INVENTORY_GLOBAL_FAILURE = 'INVENTORY_GLOBAL_FAILURE';
export const inventoryGlobalFailure = () => ({
  type: INVENTORY_GLOBAL_FAILURE,
});

export const INVENTORY_CHANGE_LOG_REQUEST = 'INVENTORY_CHANGE_LOG_REQUEST';
export const inventoryChangeLogRequest = () => ({
  type: INVENTORY_CHANGE_LOG_REQUEST,
});

export const INVENTORY_CHANGE_LOG_SUCCESS = 'INVENTORY_CHANGE_LOG_SUCCESS';
export const inventoryChangeLogSuccess = changeLog => ({
  type: INVENTORY_CHANGE_LOG_SUCCESS,
  payload: {
    changeLog,
  },
});

export const INVENTORY_CHANGE_LOG_FAILURE = 'INVENTORY_CHANGE_LOG_FAILURE';
export const inventoryChangeLogFailure = () => ({
  type: INVENTORY_CHANGE_LOG_FAILURE,
});

export const INVENTORY_CHANGE_LISTEN = 'INVENTORY_CHANGE_LISTEN';
export const inventoryChangeListen = () => ({
  type: INVENTORY_CHANGE_LISTEN,
});

export const INVENTORY_CHANGE_RECEIVED = 'INVENTORY_CHANGE_RECEIVED';
export const inventoryChangeReceived = change => ({
  type: INVENTORY_CHANGE_RECEIVED,
  payload: {
    change,
  },
});

export const INVENTORY_CHANGE_FAILURE = 'INVENTORY_CHANGE_FAILURE';
export const inventoryChangeFailure = () => ({
  type: INVENTORY_CHANGE_FAILURE,
});

export const INVENTORY_MONITORED_NUMBER_OF_SALES =
  'INVENTORY_MONITORED_NUMBER_OF_SALES';
export const inventoryMonitoredNumberOfSales = (
  id,
  numberOfSalesMonitor,
  date,
) => ({
  type: INVENTORY_MONITORED_NUMBER_OF_SALES,
  payload: {
    id,
    numberOfSalesMonitor,
    date,
  },
});
