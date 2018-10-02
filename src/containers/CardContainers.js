import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import styled from 'styled-components';

import * as types from '../constants/ActionTypes';
import { changeStatVisibilityFilter } from '../actions';

import StockCard from '../components/StockCard';
import { layoutHorizontal, layoutWrap, layoutAroundJustified } from '../style/flex-layout';

const CardContainersStyled = styled.div`
    width: 100%;

    ${layoutHorizontal};
    ${layoutAroundJustified};
    ${layoutWrap};
`;

const propTypes = {
    fullStock: PropTypes.number.isRequired,
    lowOnStock: PropTypes.number.isRequired,
    noStock: PropTypes.number.isRequired,
    changeStatVisibilityFilter: PropTypes.func
};

class CardContainers extends React.Component {
    render() {
        const { fullStock, lowOnStock, noStock, changeStatVisibilityFilter} = this.props;
        return (
            <CardContainersStyled>
                <StockCard onClick={() => changeStatVisibilityFilter(types.VisibilityFilters.SHOW_FULL_STOCK)} quantity={fullStock && fullStock} type="fullStock"></StockCard>
                <StockCard onClick={() => changeStatVisibilityFilter(types.VisibilityFilters.SHOW_LOW_ON_STOCK)} quantity={lowOnStock && lowOnStock} type="lowOnStock"></StockCard>
                <StockCard onClick={() => changeStatVisibilityFilter(types.VisibilityFilters.SHOW_NO_STOCK)} quantity={noStock && noStock} type="noStock"></StockCard>
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

export default connect(mapStateToProps, {changeStatVisibilityFilter})( CardContainers );