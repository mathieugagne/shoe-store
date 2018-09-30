import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';


const visibilityFilter = (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const inventory = (state = {}, action) => {
    switch (action.type) {
        case types.RECEIVE_SHOPS:
            
            return {
                shops: action.shops
            };
        default:
            return state;
    }
};

export default combineReducers({
    inventory,
    visibilityFilter
});