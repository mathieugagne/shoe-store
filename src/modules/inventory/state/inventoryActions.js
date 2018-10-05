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

export const INVENTORY_CHANGE_LISTEN = 'INVENTORY_CHANGE_LISTEN';
export const inventoryChangeListen = () => ({
  type: INVENTORY_CHANGE_LISTEN,
});

export const INVENTORY_CHANGE_RECEIVED = 'INVENTORY_CHANGE_RECEIVED';
export const inventoryChangeReceived = (store, model, inventory) => ({
  type: INVENTORY_CHANGE_RECEIVED,
  payload: { storeId: store, shoeId: model, quantity: inventory },
});

export const INVENTORY_CHANGE_FAILURE = 'INVENTORY_CHANGE_FAILURE';
export const inventoryChangeFailure = () => ({
  type: INVENTORY_CHANGE_FAILURE,
});
