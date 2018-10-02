import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import StoreCombobox from '../../components/StoreCombobox';
import ProductSuggestion from './ProductSuggestion';
import { storeTransferSelected } from '../../actions';

const TransferSourceStyled = styled.div`
    margin: 5px;
`;

const propTypes = {
    storeTransferSelected: PropTypes.func,
    shopsName: PropTypes.arrayOf(PropTypes.string),
    type: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
};

class Transfer extends React.Component {
    render() {
        const { storeTransferSelected, shopsName, type, title, comboPlaceholder } = this.props;
        return (
            <TransferSourceStyled>
                <StoreCombobox comboPlaceholder={comboPlaceholder} onChange={(e) => storeTransferSelected({ name: e.currentTarget.value, type: type })} combotitle={title} values={shopsName} />
                <ProductSuggestion type={type}/>
            </TransferSourceStyled>
        );
    }
}

Transfer.propTypes = propTypes;

export default connect(null,{storeTransferSelected})(Transfer);