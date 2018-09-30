import db from '../api/dbProvider';
import * as types from '../constants/ActionTypes';

const initStore = shops => ({
    type: types.RECEIVE_SHOPS,
    shops
});

export const getAllShops = () => dispatch => {
    db.getAllShopsValue(shops => {
        dispatch(initStore(shops))
    });
};

//Filter card clicked
export const setFilterStoreStat = (filter) => ({
    type: types.SET_VISIBILITY_FILTER_STORE_STAT,
    filter
});

export const changeStatVisibilityFilter = filter => dispatch => {
    dispatch(setFilterStoreStat(filter))
};

export const setFilterStoreName = (filter) => ({
    type: types.SET_VISIBILITY_FILTER_STORE_NAME,
    filter
});

export const changeNameVisibilityFilter = filter => dispatch => {
    dispatch(setFilterStoreName(filter))
};
