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
