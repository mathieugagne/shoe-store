import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import ShopsTable from '../components/ShopsTable';
import ShopsRow from '../components/ShopsRow';
import styled from 'styled-components';

const ShopsTableContainerStyled = styled.div`
    margin: 30px 0;
`;

const propTypes = {
    shops: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        stats: PropTypes.shape({
            fullStock: PropTypes.number.isRequired,
            lowOnStock: PropTypes.number.isRequired,
            noStock: PropTypes.number.isRequired
        }).isRequired
    }))
};

class ShopsTableContainer extends React.Component {
    render() {
        const { shops} = this.props;
        return (
            <ShopsTableContainerStyled>
                <ShopsTable>
                    {
                        shops && shops.map((shop) => {

                            return <ShopsRow
                                key={shop.name}
                                shopName={shop.name}
                                fullStock={shop.stats.fullStock}
                                lowOnStock={shop.stats.lowOnStock}
                                noStock={shop.stats.noStock} />
                        })
                    }
                </ShopsTable>
            </ShopsTableContainerStyled>
        );
    }
}

ShopsTableContainer.propTypes = propTypes;

const mapStateToProps = (state) => {
    try {
        return {
            shops: state.inventory.shops
        };
    } catch (err) {
        return {
            shops : []
        }
    }
};

export default connect(mapStateToProps)(ShopsTableContainer);