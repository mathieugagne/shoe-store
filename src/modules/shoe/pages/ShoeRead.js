import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';
import { appSetQuery } from '../../app/state/appActions';
import ShoeCard from '../components/ShoeCard';
import { shoeSelector } from '../state/shoeSelectors';

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
    const { isLoading, shoe } = this.props;

    if (isLoading) {
      return 'Loading...';
    }

    if (!shoe) {
      return 'Shoe not found';
    }

    return <ShoeCard shoeId={shoe.id} />;
  }
}
ShoeRead.defaultProps = {
  shoe: null,
};

ShoeRead.propTypes = {
  clearQuery: PropTypes.func.isRequired,
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
