import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import StockCard from '../components/StockCard';
import styled from 'styled-components';

const CardContainersStyled = styled.div`
    width: 100%;

    /* layout */
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    /* layout horizontal */
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;

    /* layout around justified */
    -ms-flex-pack: distribute;
    -webkit-justify-content: space-around;
    justify-content: space-around;

    /* layout wrap */
    -ms-flex-wrap: wrap;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
`;

const propTypes = {
    fullStock: PropTypes.number.isRequired,
    lowOnStock: PropTypes.number.isRequired,
    noStock: PropTypes.number.isRequired
};

class CardContainers extends React.Component {
    render() {
        const { fullStock, lowOnStock, noStock} = this.props;
        return (
            <CardContainersStyled>
                <StockCard quantity={fullStock} type="fullStock"></StockCard>
                <StockCard quantity={lowOnStock} type="lowOnStock"></StockCard>
                <StockCard quantity={noStock} type="noStock"></StockCard>
            </CardContainersStyled>
        );
    }
}

CardContainers.propTypes = propTypes;

const mapStateToProps = (state) => {
    if (state.inventory.shopsStats === undefined) {
        return {
            fullStock: 0,
            lowOnStock: 0,
            noStock: 0
        };
    } else {
        return {
            fullStock: state.inventory.shopsStats.fullStock,
            lowOnStock: state.inventory.shopsStats.lowOnStock,
            noStock: state.inventory.shopsStats.noStock
        }
    }
}

export default connect(mapStateToProps)( CardContainers );