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
