import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { shoeSelector } from '../state/shoeSelectors';

function ShoeLink(props) {
  const { shoe } = props;

  if (!shoe) {
    return null;
  }

  return <Link to={shoe.readUrl}>{shoe.name}</Link>;
}

ShoeLink.defaultProps = {
  shoe: null,
};

ShoeLink.propTypes = {
  shoe: PropTypes.object,
};

const mapState = (state, { shoeId }) => ({
  shoe: shoeId ? shoeSelector(state, { shoeId }) : null,
});

export default connect(mapState)(ShoeLink);
