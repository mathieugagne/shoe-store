import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { Row, Col as RawCol } from 'react-flexbox-grid';
import styled from 'styled-components/macro';
import injectBreadcrumb from '../../app/hocs/injectBreadcrumb';
import { storeListSelector } from '../state/storeSelectors';
import StoreCard from '../components/StoreCard';

const Col = styled(RawCol)`
  margin-bottom: ${props => props.theme.gutter}px;
  :last-child {
    margin-bottom: 0;
  }
`;

function StoreBrowse(props) {
  const { isLoading, storeList } = props;

  if (isLoading) {
    return 'Loading...';
  }

  if (!storeList.length) {
    return 'No store found';
  }

  return (
    <Row>
      {storeList.map(({ id }) => (
        <Col key={id} sm={6} lg={4}>
          <StoreCard storeId={id} />
        </Col>
      ))}
    </Row>
  );
}

StoreBrowse.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  storeList: PropTypes.array.isRequired,
};

const breadcrumb = [
  {
    label: 'Flash Sale Dashboard',
    to: '/',
  },
  {
    label: 'Stores',
  },
];

const mapState = state => ({
  isLoading: state.store.isLoading,
  storeList: storeListSelector(state),
});

export default compose(
  injectBreadcrumb(breadcrumb),
  connect(mapState),
)(StoreBrowse);
