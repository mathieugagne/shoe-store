import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ShopTable from '../components/ShopTable';
import ShopRow from '../components/ShopRow';
import { VisibilityFilters } from '../constants/ActionTypes';

const propTypes = {
    shops: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,
            products: PropTypes.arrayOf(PropTypes.shape({
                productName: PropTypes.string,
                inventory: PropTypes.number
            }))
        })
    )
};

class ShopTableContainer extends React.Component {
    render() {
        const { shops } = this.props;
        return (
            <div>
                <ShopTable>
                    {
                        shops && shops.map( shop => {
                            return shop.products.map( product => {
                                return <ShopRow
                                    key={shop.name+product.name}
                                    shopName={shop.name}
                                    productName={product.name}
                                    inventory={product.inventory} />
                            })
                        })
                    }
                </ShopTable>
            </div>
        );
    }
}

ShopTableContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
    try {
        let shops = [];
        let shopsCopy = Object.assign([], state.inventory.shops);

        shopsCopy = filterShopByName(shopsCopy, state.visibilityFilter.shopName);

        shops = shopsCopy.map((shop) => {
            let shopCopy = Object.assign({}, shop);
            let productsCopy = Object.assign([], shopCopy.products);
            shopCopy.products = filterProductsArrayByStock(productsCopy, state.visibilityFilter.shopStat);
            return shopCopy;
        });

        return {
            shops: shops
        }
        
    } catch (err) {
        return {
            shops: []
        }
    }
};

const filterShopByName = (shops, filter) => {
    if (filter === VisibilityFilters.SHOW_ALL) {
        return shops;
    }
        
    return shops.filter((shop) => shop.name === filter);
}

const filterProductsArrayByStock = (products, filter) => {
    if (filter === VisibilityFilters.SHOW_ALL) {
        return products;
    }

    return products.filter((product) => (filter === VisibilityFilters.SHOW_FULL_STOCK && product.inventory > 10) ||
        (filter === VisibilityFilters.SHOW_LOW_ON_STOCK && (product.inventory <= 10 && product.inventory > 0)) ||
        (filter === VisibilityFilters.SHOW_NO_STOCK && product.inventory === 0)
    );
}

export default connect(mapStateToProps)(ShopTableContainer);