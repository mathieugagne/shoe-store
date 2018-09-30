import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as types from '../constants/ActionTypes';
import { changeStatVisibilityFilter, changeNameVisibilityFilter } from '../actions';
import styled from 'styled-components';

const FiltersStyled = styled.div`
    margin-top: 40px;
    /* layout */
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    /* layout horizontal */
    -ms-flex-direction: row;
    -webkit-flex-direction: row;
    flex-direction: row;
`;

const Select = styled.select `
    height: 40px;
    margin: auto 0 auto 10px;
    background-color: #36304a;
    color: #fff;
    border: none;
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
`;

const Option = styled.option `
    background-color: whitesmoke;
    border: none;
    color: grey;
`;

const FilterTitle = styled.div `
    margin-top: auto;
    margin-bottom: auto;
    font-size:25px;
`;


const propTypes = {
    shopsName: PropTypes.arrayOf(PropTypes.string),
    shopName: PropTypes.string,
    shopStat: PropTypes.string,
    changeStatVisibilityFilter: PropTypes.func,
    changeNameVisibilityFilter: PropTypes.func
};

class Filters extends React.Component {
    render() {
        const { shopsName, shopName, shopStat, changeStatVisibilityFilter, changeNameVisibilityFilter} = this.props;
        return (
            <FiltersStyled>
                <FilterTitle>Filters : </FilterTitle>
                <Select value={shopStat} onChange={(e) => changeStatVisibilityFilter(e.currentTarget.value)}>
                    <Option value={types.VisibilityFilters.SHOW_ALL}>Show all</Option>
                    <Option value={types.VisibilityFilters.SHOW_FULL_STOCK}>Full stock</Option>
                    <Option value={types.VisibilityFilters.SHOW_LOW_ON_STOCK}>Low on stock</Option>
                    <Option value={types.VisibilityFilters.SHOW_NO_STOCK}>No stock</Option>
                </Select>
                <Select value={shopName} onChange={(e) => changeNameVisibilityFilter(e.currentTarget.value)}>
                    <Option value={types.VisibilityFilters.SHOW_ALL}>Show all</Option>
                    {shopsName.map((name, index) => {
                        return <Option key={index} value={name}>{name}</Option>
                    })}
                </Select>
            </FiltersStyled>
        );
    }
}

const mapStateToProps = (state) => {
    try {
        let shopsName = state.inventory.shops.map((shop) => {
            return shop.name;
        });

        return {
            shopsName: shopsName,
            shopName: state.visibilityFilter.shopName,
            shopStat: state.visibilityFilter.shopStat
        };
    } catch (err) {
        return {
            shopsName: [],
            shopName: "",
            shopStat: ""
        };
    }
};

Filters.propTypes = propTypes;

export default connect(mapStateToProps, {changeStatVisibilityFilter, changeNameVisibilityFilter})(Filters);