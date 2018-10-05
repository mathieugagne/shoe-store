import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';
import StoreCard from '../components/StoreCard';

function StoreRead(props) {
  const { match, isLoading } = props;

  if (isLoading) {
    return 'Loading...';
  }

  return <StoreCard storeId={match.params.storeId} />;
}

StoreRead.propTypes = {
  match: PropTypes.object.isRequired, // from router
  isLoading: PropTypes.bool.isRequired, // from router
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
  },
];

const mapState = state => ({
  isLoading: state.store.isLoading,
});

export default compose(
  connect(mapState),
  injectBreadcrumb(breadcrumb),
)(StoreRead);
