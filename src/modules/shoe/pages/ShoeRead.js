import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';
import StoreInventoryTable from '../../inventory/components/StoreInventoryTable';
import { appSetQuery } from '../../app/state/appActions';
import ShoeCard from '../components/ShoeCard';

class ShoeRead extends Component {
  componentDidMount() {
    const { clearQuery } = this.props;

    clearQuery();
  }

  componentWillUnmount() {
    const { clearQuery } = this.props;

    clearQuery();
  }

  render() {
    const { match, isLoading } = this.props;

    if (isLoading) {
      return 'Loading...';
    }

    return (
      <>
        <ShoeCard shoeId={match.params.shoeId} />
        <StoreInventoryTable storeId={match.params.shoeId} />
      </>
    );
  }
}

ShoeRead.propTypes = {
  clearQuery: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired, // from router
  isLoading: PropTypes.bool.isRequired,
};

const breadcrumb = ({ match }) => [
  {
    label: 'Flash Sale Dashboard',
    to: '/',
  },
  {
    label: 'Shoes',
    to: '/shoes',
  },
  {
    label: match.params.shoeId,
    showBack: true,
  },
];

const mapState = state => ({
  isLoading: state.store.isLoading,
});

const mapDispatch = dispatch => ({
  clearQuery: () => dispatch(appSetQuery({})),
});

export default compose(
  connect(
    mapState,
    mapDispatch,
  ),
  injectBreadcrumb(breadcrumb),
)(ShoeRead);
