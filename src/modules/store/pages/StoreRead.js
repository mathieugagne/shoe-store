import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';
import StoreCard from '../components/StoreCard';
import StoreInventoryTable from '../../inventory/components/StoreInventoryTable';
import { appSetQuery } from '../../app/state/appActions';

class StoreRead extends Component {
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
        <StoreCard storeId={match.params.storeId} />
        <StoreInventoryTable storeId={match.params.storeId} />
      </>
    );
  }
}

StoreRead.propTypes = {
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
    label: 'Stores',
    to: '/stores',
  },
  {
    label: match.params.storeId,
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
)(StoreRead);
