import React from 'react';
import styled from 'styled-components';
import { Row, Col as RawCol } from 'react-flexbox-grid';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';
import ShoeCard from '../components/ShoeCard';
import { shoeListSelector } from '../state/shoeSelectors';

const Col = styled(RawCol)`
  margin-bottom: ${props => props.theme.gutter}px;
  :last-child {
    margin-bottom: 0;
  }
`;

function ShoeBrowse(props) {
  const { isLoading, shoeList } = props;

  if (isLoading) {
    return 'Loading...';
  }

  if (!shoeList.length) {
    return 'No shoe found';
  }

  return (
    <Row>
      {shoeList.map(({ id }) => (
        <Col key={id} xs={6} sm={3} lg={2}>
          <ShoeCard shoeId={id} />
        </Col>
      ))}
    </Row>
  );
}

ShoeBrowse.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  shoeList: PropTypes.array.isRequired,
};

const breadcrumb = [
  {
    label: 'Flash Sale Dashboard',
    to: '/',
  },
  {
    label: 'Shoes',
  },
];

const mapState = state => ({
  isLoading: state.shoe.isLoading,
  shoeList: shoeListSelector(state),
});

export default compose(
  injectBreadcrumb(breadcrumb),
  connect(mapState),
)(ShoeBrowse);
