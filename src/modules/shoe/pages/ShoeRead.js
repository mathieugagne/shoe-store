import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';
import ShoeCard from '../components/ShoeCard';
import { shoeSelector } from '../state/shoeSelectors';

function ShoeRead(props) {
  const { isLoading, shoe } = props;

  if (isLoading) {
    return 'Loading...';
  }

  if (!shoe) {
    return 'Shoe not found';
  }

  return <ShoeCard shoeId={shoe.id} />;
}

ShoeRead.defaultProps = {
  shoe: null,
};

ShoeRead.propTypes = {
  shoe: PropTypes.object,
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

const mapState = (state, { match }) => ({
  isLoading: state.store.isLoading,
  shoe: shoeSelector(state, { shoeId: match.params.shoeId }),
});

export default compose(
  connect(mapState),
  injectBreadcrumb(breadcrumb),
)(ShoeRead);
