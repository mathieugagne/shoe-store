/**
 * TODO : Global state should be flattenized (use of normalizr?)
 */

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
        
        case types.WEBSOCKET_INVENTORY_CHANGE:
            return alternInventory(state, [{
                store: action.entry.store,
                model: action.entry.model,
                inventory: action.entry.inventory,
                isNewInventory: true
            }]);
        case types.DO_TRANSFER:
            return alternInventory(state, [{
                store: action.transfer.from,
                model: action.transfer.product,
                inventory: -1 * action.transfer.quantity,
                isNewInventory: false
            },
            {
                store: action.transfer.to,
                model: action.transfer.product,
                inventory: action.transfer.quantity,
                isNewInventory: false
            }]);
        default:
            return state;
    }
};

const transfer = (state = {
    storeFrom: "",
    storeTo: "",
    shoeModel: "",
    shoeQuantity: 0,
    quantityFromOk: false,
    quantityToOk: false
}, action) => {
    switch (action.type) {
        case types.SET_STORE_FROM_TO:
            if (action.store.type === "from") {
                return {
                    ...state,
                    ...{ storeFrom: action.store.name }
                }
            } else {
                return {
                    ...state,
                    ...{ storeTo: action.store.name }
                }
            }
        case types.SET_SHOE_FROM_TO:
            return {
                ...state,
                ...{
                    shoeModel: action.shoeModel
                }
            }
        case types.SET_QUANTITY:
            return {
                ...state,
                ...{
                    shoeQuantity: action.quantity
                }
            }
        case types.SET_TRANSFER_VALIDITY:
             if (action.transfer.type === "from") {
                return {
                    ...state,
                    ...{ quantityFromOk: action.transfer.isValid }
                }
            } else {
                return {
                    ...state,
                    ...{ quantityToOk: action.transfer.isValid }
                }
            }
        case types.TRANSFER_RESET:
            return {
                ...state,
                ...{
                    storeFrom: "",
                    storeTo: "",
                    shoeModel: "",
                    shoeQuantity: 0,
                    quantityFromOk: false,
                    quantityToOk: false
                }
            }
        default:
            return state;
    }
};

export default combineReducers({
    inventory,
    visibilityFilter,
    transfer
});

/**
 * 
 * @param {Object} state The inventory state
 * @param {Array} entries array of inventory to edit.
 *                      {
 *                        store,
 *                        model,
 *                        inventory,
 *                        isNewInventory
 *                      }
 */
const alternInventory = (state, entries) => {
    let shopsStatsCopy = Object.assign({}, state.shopsStats);
    let aldoShop = state.shops.map(shop => {
        let inventoryUpdate = false;
        let shopCopy = Object.assign({}, shop);
        let shopStatsCopy = Object.assign({}, shop.stats);
       
        entries.forEach((entry) => {
           
            if (shopCopy.name === entry.store) {
                shopCopy.products = shopCopy.products.map(product => {
                    let productCopy = Object.assign({}, product);
                    if (productCopy.name === entry.model) {
                        if (entry.isNewInventory) {
                            productCopy.inventory = entry.inventory;
                        } else {
                            productCopy.inventory = productCopy.inventory + entry.inventory < 0 ? 0 : productCopy.inventory + entry.inventory;
                        }
                        inventoryUpdate = true;
                    }
                    return productCopy;
                });
            }

            //refresh ShopsStats
            if (inventoryUpdate) {
                const newStats = getShopStats(shopCopy);
                updateShopsStats(shopStatsCopy, newStats, shopsStatsCopy);
                shopCopy.stats = newStats;
            }
        });

        return shopCopy;

    });
    return {
        shops: aldoShop,
        shopsStats: shopsStatsCopy
    };
}


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

/**
 * Return the new shops stats object with modification 
 * @param {Object} oldShopStats old shop stats object
 * @param {Object} newShopStat new shop stats object
 * @param {Object} shopsStats object of all shops stats
 * @returns {Object} The new shops stats object.
 */
const updateShopsStats = (oldShopStats, newShopStat, shopsStats) => {
    const full = oldShopStats.fullStock - newShopStat.fullStock;
    const low = oldShopStats.lowOnStock - newShopStat.lowOnStock;
    const no = oldShopStats.noStock - newShopStat.noStock;

    shopsStats.fullStock = shopsStats.fullStock - full;
    shopsStats.lowOnStock = shopsStats.lowOnStock - low;
    shopsStats.noStock = shopsStats.noStock - no;

    return shopsStats;
}
