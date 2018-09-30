import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TbodyTr } from './Table';

const InventoryLevelColor = styled.div`
    width: 15px;
    height: 15px;
    border-radius: 25px;
    background-color: ${ props => {
        if (props.inventory > 10) {
            return '#03A9F4';
        } else if (props.inventory <= 10 && props.inventory > 0) {
            return '#FF9800';
        } else if (props.inventory === 0) {
            return '#F44336';
        }
    }};
`;

const propTypes = {
    shopName: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    inventory: PropTypes.number.isRequired
};

export default class ShopRow extends React.Component {

    componentDidUpdate(prevProps) {

        if (this.props.inventory !== prevProps.inventory && this.refs.inventory !== undefined) {
            setTimeout(() => {
                if (this.refs.inventory !== undefined) {
                    this.refs.inventory.style.backgroundColor = "transparent";
                    this.refs.inventory.style.color = "inherit";
                }
            }, 1000);
            let backgroundColor;
            
            if (this.props.inventory > 10) {
                backgroundColor = "#03A9F4";
            } else if (this.props.inventory <= 10) {
                backgroundColor = "#FF9800";
            } else if (this.props.inventory === 0) {
                backgroundColor = "#F44336";
            }

            this.refs.inventory.style.backgroundColor = backgroundColor;
            this.refs.inventory.style.transition = "background-color 200ms";
            this.refs.inventory.style.color = "#ffffff";
        }
    }
    
    render() {
        return (
            <TbodyTr>
                <td>{this.props.shopName}</td>
                <td>{this.props.productName}</td>
                <td ref="inventory">{this.props.inventory}</td>
                <td><InventoryLevelColor inventory={this.props.inventory} /></td>
            </TbodyTr>
        );
    }
}

ShopRow.propTypes = propTypes;