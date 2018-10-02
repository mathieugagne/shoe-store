import React from 'react';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import { connect } from 'react-redux';
import { shoeTransferSelected, inventoryTransferValidity } from '../../actions';
import InventoryLevelColor from '../../components/InventoryLevelColor';
import { layoutHorizontal, layoutFlex } from '../../style/flex-layout';

const ShoeNameContent = styled.div `
    ${layoutFlex};
    font-weight:600;
`;

const ShoeName = styled.div `
    ${layoutHorizontal};
    
    padding:5px;
    margin:2px;
    border: 2px solid #36304a;
    color: #36304a;
    cursor:pointer;

    ${props => props.shoeSelected && css`
        border: 2px solid #FF9800;
        color: #FF9800; 
  `}
`;

const propTypes = {
    productsFrom: PropTypes.arrayOf(PropTypes.shape({
        productName: PropTypes.string,
        inventory: PropTypes.number
    })),
    productsTo: PropTypes.arrayOf(PropTypes.shape({
        productName: PropTypes.string,
        inventory: PropTypes.number
    })),
    shoeModel: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    shoeTransferSelected: PropTypes.func, 
    inventoryTransferValidity: PropTypes.func
};

class ProductSuggestion extends React.Component {

    componentDidUpdate(prevProps) {
        const { productsFrom, productsTo, shoeModel, type, inventoryTransferValidity } = this.props;
        const isShoe = (obj) => { return obj.name === shoeModel };

        if (shoeModel !== prevProps.shoeModel) {
            if (type === "from") {
                if (productsFrom !== undefined) {
                    let result = productsFrom.find(isShoe) !== undefined;
                    inventoryTransferValidity({ isValid: result, type: "from" });
                }
            } else {
                if (productsTo !== undefined) {
                    let result = productsTo.find(isShoe) !== undefined;
                    inventoryTransferValidity({ isValid: result, type: "to" });
                }
            }
        }
    }

    render() {
        const { productsFrom, productsTo, type, shoeModel, shoeTransferSelected } = this.props;
        return (
            <div>
                {
                    (
                        type === "from" && productsFrom && productsFrom.map((product) => {
                            return (
                                <ShoeName key={type + product.name}
                                    onClick={() => shoeTransferSelected(product.name)}
                                    shoeSelected={shoeModel === product.name}>
                                    <ShoeNameContent>
                                        {product.name}
                                    </ShoeNameContent>
                                    <InventoryLevelColor inventory={product.inventory}>{product.inventory}</InventoryLevelColor>
                                </ShoeName>
                            )
                        })
                    ) || (
                        productsTo && productsTo.map((product) => {
                            return (
                                <ShoeName key={type + product.name}
                                    onClick={() => shoeTransferSelected(product.name)}
                                    shoeSelected={shoeModel === product.name}>
                                    <ShoeNameContent>
                                        {product.name}
                                    </ShoeNameContent>
                                    <InventoryLevelColor inventory={product.inventory}>{product.inventory}</InventoryLevelColor>
                                </ShoeName>
                            )
                        })
                    )
                }
            </div>
        );
    }
}

ProductSuggestion.propTypes = propTypes;

const mapStateToProps = (state) => {
    let productsFrom;
    let productsTo;
    state.inventory.shops.forEach((shop) => {
        if (shop.name === state.transfer.storeFrom) {
            productsFrom = shop.products.filter((product) => product.inventory > 10); //need to break
        }
        if (shop.name === state.transfer.storeTo) {
            productsTo = shop.products.filter((product) => product.inventory <= 10); //need to break
        }
    });

    if (productsTo !== undefined && productsFrom !== undefined) {
        productsFrom = productsFrom.filter((product) => {
            const isShoe = (obj) => { return obj.name === product.name };
            return productsTo.find(isShoe) !== undefined;
        });
    }

    return {
        productsFrom: productsFrom,
        productsTo: productsTo,
        shoeModel: state.transfer.shoeModel
    }
};

export default connect(mapStateToProps, {shoeTransferSelected, inventoryTransferValidity})(ProductSuggestion);