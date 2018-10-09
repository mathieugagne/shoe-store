import uuid from 'uuid/v4';
import {
  INVENTORY_GLOBAL_REQUEST,
  INVENTORY_GLOBAL_SUCCESS,
  INVENTORY_GLOBAL_FAILURE,
  INVENTORY_CHANGE_RECEIVED,
  INVENTORY_CHANGE_LOG_REMOVE_NEW_FLAG,
  INVENTORY_CHANGE_LOG_SUCCESS,
  INVENTORY_CHANGE_LOG_REQUEST,
  INVENTORY_CHANGE_LOG_FAILURE,
  INVENTORY_MONITORED_NUMBER_OF_SALES,
} from './inventoryActions';

const now = Number(Date.now());

const initialState = {
  items: {},
  changeLog: [],
  numberOfSalesMonitor: [
    { id: uuid(), sales: NaN, date: now - 50 * 1000 },
    { id: uuid(), sales: NaN, date: now - 45 * 1000 },
    { id: uuid(), sales: NaN, date: now - 40 * 1000 },
    { id: uuid(), sales: NaN, date: now - 35 * 1000 },
    { id: uuid(), sales: NaN, date: now - 30 * 1000 },
    { id: uuid(), sales: NaN, date: now - 25 * 1000 },
    { id: uuid(), sales: NaN, date: now - 20 * 1000 },
    { id: uuid(), sales: NaN, date: now - 15 * 1000 },
    { id: uuid(), sales: NaN, date: now - 10 * 1000 },
    { id: uuid(), sales: NaN, date: now - 5 * 1000 },
    { id: uuid(), sales: NaN, date: now },
  ],
  isGlobalLoaded: false,
  hasGlobalLoadingError: false,
  isChangeLogLoading: false,
  isChangeLogLoaded: false,
  hasChangeLogLoadingError: false,
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

    case INVENTORY_CHANGE_LOG_REQUEST:
      return {
        ...state,
        isChangeLogLoading: true,
        hasChangeLogLoadingError: false,
      };

    case INVENTORY_CHANGE_LOG_SUCCESS:
      return {
        ...state,
        changeLog: action.payload.changeLog,
        isChangeLogLoading: false,
        isChangeLogLoaded: true,
        hasChangeLogLoadingError: false,
      };

    case INVENTORY_CHANGE_LOG_FAILURE:
      return {
        ...state,
        isChangeLogLoading: false,
        hasChangeLogLoadingError: true,
      };

    case INVENTORY_MONITORED_NUMBER_OF_SALES:
      return {
        ...state,
        numberOfSalesMonitor: [
          ...state.numberOfSalesMonitor,
          {
            id: action.payload.id,
            sales: action.payload.numberOfSalesMonitor,
            date: action.payload.date,
          },
        ],
      };

    case INVENTORY_CHANGE_LOG_REMOVE_NEW_FLAG:
      return {
        ...state,
        changeLog: state.changeLog.map(x => ({ ...x, isNew: false })),
      };

    case INVENTORY_CHANGE_RECEIVED:
      return {
        ...state,
        changeLog: [
          { ...action.payload.change, isNew: true },
          ...state.changeLog,
        ],
        items: {
          ...state.items,
          [action.payload.change.store]: {
            ...state.items[action.payload.change.store],
            inventory: {
              ...state.items[action.payload.change.store].inventory,
              [action.payload.change.model]: {
                ...state.items[action.payload.change.store].inventory[
                  action.payload.change.model
                ],
                sold:
                  state.items[action.payload.change.store].inventory[
                    action.payload.change.model
                  ].sold + 1,
                quantity: action.payload.change.inventory,
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
