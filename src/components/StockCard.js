import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StockCardStyled = styled.div`
    width : 300px;
    margin: 5px;
    height : 130px;
    color: #ffffff;
    border-radius:15px;
    cursor:pointer;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
                0 1px 5px 0 rgba(0, 0, 0, 0.12),
                0 3px 1px -2px rgba(0, 0, 0, 0.2);
    background-color: ${ props => {
        switch (props.type) {
            case 'fullStock': return '#03A9F4';
            case 'lowOnStock': return '#FF9800';
            case 'noStock': return '#F44336';
            default: return '#ffffff';
        }
    }};
    
    &:hover {
        opacity:0.7;
    }
`;

const StockCardTitle = styled.div`
    width : 100%;
    opacity: 0.5;
    font-size: 25px;
    padding: 4px;
`;

const StockCardQty = styled.div`
    width : 100%;
    font-size:57px;
    text-align:center;
`;

const propTypes = {
    onClick: PropTypes.func,
    quantity: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['fullStock', 'lowOnStock', 'noStock']).isRequired
};

const getDisplayName = (type) => {
    switch (type) {
        case "fullStock": return "Full Stock";
        case "lowOnStock": return "Low On Stock";
        case "noStock": return "No Stock";
        default: return "";
    }
};

const getTitle = (type) => {
    switch (type) {
        case "fullStock": return "Quantity of product with a good inventory";
        case "lowOnStock": return "Quantity of product with a low inventory";
        case "noStock": return "Quantity of product with no inventory";
        default: return "";
    }
};

export default class StockCard extends React.Component {
    render() {
        return (
            <StockCardStyled onClick={this.props.onClick} type={this.props.type} title={getTitle(this.props.type)}>
                <StockCardTitle>{getDisplayName(this.props.type)}</StockCardTitle>
                <StockCardQty>{this.props.quantity}</StockCardQty>
            </StockCardStyled>
        );
    }
}

StockCard.propTypes = propTypes;