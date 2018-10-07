import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { storeSelector } from '../state/storeSelectors';

function StoreLink(props) {
  const { store } = props;

  if (!store) {
    return null;
  }

  return <Link to={store.readUrl}>{store.name}</Link>;
}

StoreLink.defaultProps = {
  store: null,
};

StoreLink.propTypes = {
  store: PropTypes.object,
};

const mapState = (state, { storeId }) => ({
  store: storeId ? storeSelector(state, { storeId }) : null,
});

export default connect(mapState)(StoreLink);
