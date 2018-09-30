import React from 'react';
import PropTypes from 'prop-types';
import { TbodyTr } from './Table';

const propTypes = {
    shopName: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    inventory: PropTypes.number.isRequired
};

export default class ShopRow extends React.Component {
    render() {
        return (
            <TbodyTr>
                <td>{this.props.shopName}</td>
                <td>{this.props.productName}</td>
                <td ref="inventory">{this.props.inventory}</td>
            </TbodyTr>
        );
    }
}

ShopRow.propTypes = propTypes;