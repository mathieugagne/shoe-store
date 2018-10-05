import {
  INVENTORY_GLOBAL_REQUEST,
  INVENTORY_GLOBAL_SUCCESS,
  INVENTORY_GLOBAL_FAILURE,
  INVENTORY_CHANGE_RECEIVED,
} from './inventoryActions';

const initialState = {
  items: {},
  isGlobalLoading: false,
  isGlobalLoaded: false,
  hasGlobalLoadingError: false,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case INVENTORY_GLOBAL_REQUEST:
      return {
        ...state,
        isGlobalLoading: true,
        hasGlobalLoadingError: false,
      };

    case INVENTORY_GLOBAL_SUCCESS:
      return {
        ...state,
        items: action.payload.inventory.reduce(
          (itemsCarry, storeInventory) => ({
            ...itemsCarry,
            [storeInventory.storeId]: {
              ...storeInventory,
              inventory: storeInventory.inventory.reduce(
                (inventoryCarry, shoeInventory) => ({
                  ...inventoryCarry,
                  [shoeInventory.shoeId]: shoeInventory,
                }),
                {},
              ),
            },
          }),
          state.items,
        ),
        isGlobalLoading: false,
        isGlobalLoaded: true,
        hasGlobalLoadingError: false,
      };

    case INVENTORY_GLOBAL_FAILURE:
      return {
        ...state,
        isGlobalLoading: false,
        hasGlobalLoadingError: true,
      };

    case INVENTORY_CHANGE_RECEIVED:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.storeId]: {
            ...state.items[action.payload.storeId],
            inventory: {
              ...state.items[action.payload.storeId].inventory,
              [action.payload.shoeId]: {
                ...state.items[action.payload.storeId].inventory[
                  action.payload.shoeId
                ],
                sold:
                  state.items[action.payload.storeId].inventory[
                    action.payload.shoeId
                  ].sold + 1,
                quantity: action.payload.quantity,
              },
            },
          },
        },
      };
    default:
      return state;
  }
};

export default inventoryReducer;
