import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TransferSource from './TransferSource';
import styled from 'styled-components';
import {doTransfer, quantityChanged} from '../../actions';
import { layoutHorizontal, layoutWrap, layoutVertical } from '../../style/flex-layout';

const TransferStyled = styled.div`
    ${layoutHorizontal};
    ${layoutWrap};
`;

const QuantityInputGroup = styled.div`
    ${layoutVertical};
    padding: 5px;
`;

const Input = styled.input `
    border-color:#36304a;
    height: 26px;
    padding: 5px;
`;

const Button = styled.button`
    display: inline-block;
    border-radius: 3px;
    width: 7rem;
    height: 41px;
    padding: 5px;
    background: #36304a;
    color: #ffffff;
    text-align: center;
    border: 2px solid #36304a;
    margin: 23px;
    cursor: pointer;
    font-weight: 600;

    &:hover{
        opacity:0.7;
    }

    &:disabled{
        opacity:0.7;
    }
`

const propTypes = {
    shopsName: PropTypes.arrayOf(PropTypes.string),
    isTransferReady: PropTypes.bool.isRequired,
    doTransfer: PropTypes.func,
    quantityChanged: PropTypes.func,
    transfer: PropTypes.shape({
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        quantity: PropTypes.number.isRequired,
        product: PropTypes.string.isRequired
    })
};

class Transfer extends React.Component {
    render() {
        const { shopsName, isTransferReady, doTransfer, quantityChanged, transfer } = this.props;
        return (
            <TransferStyled>
                <TransferSource shopsName={shopsName} type={"from"} title={"From"} comboPlaceholder={"Select store from"}/>
                <TransferSource shopsName={shopsName} type={"to"} title={"To"} comboPlaceholder={"Select store to"} />
                <QuantityInputGroup>Quantity : <Input type={"number"} onChange={(e) => quantityChanged(Number(e.currentTarget.value))} name="Quantity" /></QuantityInputGroup>
                <Button  onClick={() => doTransfer(transfer)} disabled={isTransferReady && transfer.quantity !== 0 ? false : true}>Transfer</Button>
            </TransferStyled>
        );
    }
}

Transfer.propTypes = propTypes;

const mapStateToProps = (state) => {
    try {
        let shopsName = state.inventory.shops.map((shop) => {
            return shop.name;
        });

        let transfer = {};
        transfer.from = state.transfer.storeFrom;
        transfer.to = state.transfer.storeTo;
        transfer.quantity = state.transfer.shoeQuantity;
        transfer.product = state.transfer.shoeModel;

        return {
            shopsName: shopsName,
            isTransferReady: state.transfer.quantityFromOk && state.transfer.quantityToOk,
            transfer: transfer
        };
    } catch (err) {
        return {
            shopsName: [],
            isTransferReady: false,
            transfer: {
                from:"",
                to:"",
                quantity:0,
                product:""
            }
        };
    }
};

export default connect(mapStateToProps, {doTransfer, quantityChanged})(Transfer);