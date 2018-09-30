import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ShopTable from '../components/ShopTable';
import ShopRow from '../components/ShopRow';

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
        return {
            shops: state.inventory.shops
        }
        
    } catch (err) {
        return {
            shops: []
        }
    }
};

export default connect(mapStateToProps)(ShopTableContainer);