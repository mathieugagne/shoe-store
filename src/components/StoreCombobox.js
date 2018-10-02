import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Select = styled.select `
    height: 40px;
    margin: auto 0 ;
    background-color: #36304a;
    color: #fff;
    border: none;
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;
`;

export const Option = styled.option `
    background-color: whitesmoke;
    border: none;
    color: grey;
`;

const propTypes = {
    combotitle: PropTypes.string.isRequired,
    comboPlaceholder: PropTypes.string.isRequired,
    values: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func,
};

export default class StoreCombobox extends React.Component {
    render() {
        const { combotitle, comboPlaceholder, values, onChange} = this.props;
        return (
            <div>
                <div>{combotitle}</div>
                <Select onChange={onChange}>
                    <option>{comboPlaceholder}</option>
                    {
                        values.map(value => {
                            return <Option key={value}>{value}</Option>
                        })
                    }
                </Select>
            </div>
        );
    }
}

 StoreCombobox.propTypes = propTypes;