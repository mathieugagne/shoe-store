import * as types from '../constants/ActionTypes';
import { combineReducers } from 'redux';

const visibilityFilter = (state = {
            shopName: 'SHOW_ALL',
            shopStat: 'SHOW_ALL'
        }, action) => {
    switch (action.type) {
        case types.SET_VISIBILITY_FILTER_STORE_STAT:
            return Object.assign({}, { shopName: state.shopName, shopStat: action.filter });
         case types.SET_VISIBILITY_FILTER_STORE_NAME:
            return Object.assign({}, { shopName: action.filter, shopStat: state.shopStat });
        default:
            return state;
    }
};


const inventory = (state = {}, action) => {
    switch (action.type) {
        case types.RECEIVE_SHOPS:
            
          //init state with all shop stats
          let shopsStats = {
              fullStock: 0,
              lowOnStock: 0,
              noStock: 0
          };

          //init all shop private stats
          action.shops.map(shop => {
              shop["stats"] = getShopStats(shop);

              //sum stats
              shopsStats = sumObjectsByKey(shopsStats, shop.stats);

              return shop;
          });

          return {
              shops: action.shops,
              shopsStats: shopsStats
          };
        default:
            return state;
    }
};

export default combineReducers({
    inventory,
    visibilityFilter
});


/**
 * Return a new object with stats about the products.
 * @param {Object} shop object that contain the different products
 */
const getShopStats = (shop) => {
    const shopStats = {
        fullStock: 0,
        lowOnStock: 0,
        noStock: 0
    };

    shop.products.forEach((product) => {
        if (product.inventory > 10) {
            shopStats.fullStock++;
        } else if (product.inventory <= 10 && product.inventory > 0) {
            shopStats.lowOnStock++;
        } else if (product.inventory === 0) {
            shopStats.noStock++;
        }
    });

    return shopStats;
}

/**
 * Add property values of object with the same signature
 * @param  {...any} objs list of similar objects
 * @returns {Object} 
 */
const sumObjectsByKey = (...objs) => {
    return objs.reduce((a, b) => {
        for (let k in b) {
            if (b.hasOwnProperty(k))
                a[k] = (a[k] || 0) + b[k];
        }
        return a;
    }, {});
};
