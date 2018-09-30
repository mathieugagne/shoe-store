import React from 'react';
import PropTypes from 'prop-types';
import {Table, TheadTr, TheadTh} from './Table';

const propTypes = {
    children: PropTypes.node
};

export default class ShopsTable extends React.Component {
    render() {
        return (
            <Table>
                <thead>
                    <TheadTr>
                        <TheadTh>Shop Name</TheadTh>
                        <TheadTh>In Stock</TheadTh>
                        <TheadTh>Low On Stock</TheadTh>
                        <TheadTh>No Stock</TheadTh>
                    </TheadTr>
                </thead>
                <tbody>
                    {this.props.children}
                </tbody>            
            </Table>
        );
    }
}

ShopsTable.propTypes = propTypes;