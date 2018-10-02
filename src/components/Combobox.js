import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

export const Select = styled.select `
    height: 40px;
    margin: auto 0 auto 20px;
    background-color: #36304a;
    color: #fff;
    border: none;
    font-size: 18px;
    font-family: 'Montserrat', sans-serif;

    ${props => props.noMargin && css`
        margin: auto 0;
    `}
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

export default class Combobox extends React.Component {
    render() {
        const { combotitle, comboPlaceholder, values, onChange} = this.props;
        return (
            <div>
                <div>{combotitle}</div>
                <Select noMargin onChange={onChange}>
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

Combobox.propTypes = propTypes;