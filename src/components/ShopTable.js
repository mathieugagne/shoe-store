import React from 'react';
import PropTypes from 'prop-types';
import { Table, TheadTh, TheadTr } from './Table';

const propTypes = {
    children: PropTypes.node
};

export default class ShopTable extends React.Component {
    render() {
        return (
            <Table>
                <thead>
                    <TheadTr>
                        <TheadTh>Shop Name</TheadTh>
                        <TheadTh>Product Name</TheadTh>
                        <TheadTh>Stock</TheadTh>
                    </TheadTr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>
            </Table>
        );
    }
}
    
ShopTable.propTypes = propTypes;