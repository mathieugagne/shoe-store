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
    
    componentDidUpdate(prevProps) {

        if (this.props.fullStock !== prevProps.fullStock && this.refs.full !== undefined) {
            setTimeout(() => {
                if (this.refs.full !== undefined) {
                    this.refs.full.style.backgroundColor = "transparent";
                    this.refs.full.style.color = "inherit";
                }
            }, 1000);
            this.refs.full.style.backgroundColor = "#03A9F4";
            this.refs.full.style.transition = "background-color 200ms";
            this.refs.full.style.color = "#ffffff";
        }
        if (this.props.lowOnStock !== prevProps.lowOnStock && this.refs.low !== undefined) {
            setTimeout(() => {
                if (this.refs.low !== undefined) {
                    this.refs.low.style.backgroundColor = "transparent";
                    this.refs.low.style.color = "inherit";
                }
            }, 1000);
            this.refs.low.style.backgroundColor = "#FF9800";
            this.refs.low.style.transition = "backgroundColor 200ms";
            this.refs.low.style.color = "#ffffff";
        }
        if (this.props.noStock !== prevProps.noStock && this.refs.no !== undefined) {
            setTimeout(() => {
                if (this.refs.no !== undefined) {
                    this.refs.no.style.backgroundColor = "transparent";
                    this.refs.no.style.color = "inherit";
                }
            }, 1000);
            this.refs.no.style.backgroundColor = "#F44336";
            this.refs.no.style.transition = "backgroundColor 200ms";
            this.refs.no.style.color = "#ffffff";
        }
    }

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