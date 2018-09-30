import React from 'react';
import PropTypes from 'prop-types';
import { TbodyTr } from './Table';

const propTypes = {
    shopName: PropTypes.string.isRequired,
    fullStock: PropTypes.number.isRequired,
    lowOnStock: PropTypes.number.isRequired,
    noStock: PropTypes.number.isRequired
};

export default class ShopsRow extends React.Component {

    render() {
        const { shopName, fullStock, lowOnStock, noStock } = this.props;
        return (
            <TbodyTr>
                <td>{shopName}</td>
                <td ref="full">{fullStock}</td>
                <td ref="low">{lowOnStock}</td>
                <td ref="no">{noStock}</td>
            </TbodyTr>
        );
    }
}

ShopsRow.propTypes = propTypes;