import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';
import StoreCard from '../components/StoreCard';
import StoreInventoryTable from '../../inventory/components/StoreInventoryTable';
import { appSetQuery } from '../../app/state/appActions';
import { storeSelector } from '../state/storeSelectors';

export class StoreRead extends Component {
  componentDidMount() {
    const { clearQuery } = this.props;

    clearQuery();
  }

  componentWillUnmount() {
    const { clearQuery } = this.props;

    clearQuery();
  }

  render() {
    const { isLoading, store } = this.props;

    if (isLoading) {
      return 'Loading...';
    }

    if (!store) {
      return 'Store not found';
    }

    return (
      <>
        <StoreCard storeId={store.id} />
        <StoreInventoryTable storeId={store.id} />
      </>
    );
  }
}

StoreRead.defaultProps = {
  store: null,
};

StoreRead.propTypes = {
  clearQuery: PropTypes.func.isRequired,
  store: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};

const breadcrumb = ({ match }) => [
  {
    label: 'Flash Sale Dashboard',
    to: '/',
  },
  {
    label: 'Stores',
    to: '/stores',
  },
  {
    label: match.params.storeId,
    showBack: true,
  },
];

const mapState = (state, { match }) => ({
  isLoading: state.store.isLoading,
  store: storeSelector(state, { storeId: match.params.storeId }),
});

const mapDispatch = dispatch => ({
  clearQuery: () => dispatch(appSetQuery({})),
});

export default compose(
  injectBreadcrumb(breadcrumb),
  connect(
    mapState,
    mapDispatch,
  ),
)(StoreRead);
