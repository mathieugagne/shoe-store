import db from '../api/dbProvider';
import * as types from '../constants/ActionTypes';

const initStore = shops => ({
    type: types.RECEIVE_SHOPS,
    shops
});

export const getAllShops = () => dispatch => {
    db.getAllShopsValue(shops => {
        dispatch(initStore(shops));
    });
};

//Filter card clicked
export const setFilterStoreStat = (filter) => ({
    type: types.SET_VISIBILITY_FILTER_STORE_STAT,
    filter
});

export const changeStatVisibilityFilter = filter => dispatch => {
    dispatch(setFilterStoreStat(filter));
};

export const setFilterStoreName = (filter) => ({
    type: types.SET_VISIBILITY_FILTER_STORE_NAME,
    filter
});

export const changeNameVisibilityFilter = filter => dispatch => {
    dispatch(setFilterStoreName(filter));
};

//Transfer

/**
 * @param {Object} store will contain {name,type}.
 */
export const setTransferStore = (store) => ({
    type: types.SET_STORE_FROM_TO,
    store
});

export const storeTransferSelected = store => dispatch => {
    dispatch(setTransferStore(store));
};

/**
 * @param {Object} shoeModel will contain {name}.
 */
export const setTransferShoe = (shoeModel) => ({
    type: types.SET_SHOE_FROM_TO,
    shoeModel
});

export const shoeTransferSelected = shoeModel => dispatch => {
    dispatch(setTransferShoe(shoeModel));
};

/**
 * @param {Object} transfer will contain {isValid,type}.
 */
export const setTransferValidity = (transfer) => ({
    type: types.SET_TRANSFER_VALIDITY,
    transfer
});

export const inventoryTransferValidity = transfer => dispatch => {
    dispatch(setTransferValidity(transfer));
};

export const setQuantity = (quantity) => ({
    type: types.SET_QUANTITY,
    quantity
});

export const quantityChanged = quantity => dispatch => {
    dispatch(setQuantity(quantity));
};

/**
 * @param {Object} transfer will contain {isValid,type}.
 */
export const executeTransfer = (transfer) => ({
    type: types.DO_TRANSFER,
    transfer
});

export const resetTransferState = () => ({
    type: types.TRANSFER_RESET
});

export const doTransfer = transfer => dispatch => {
    dispatch(executeTransfer(transfer)).then(() => {
        dispatch(resetTransferState());
    });
};

