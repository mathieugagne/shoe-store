import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import RealtimeLineChart from '../../app/components/RealtimeLineChart';
import { numberOfSalesChartDataSelector } from '../state/inventorySelectors';

const Root = styled.div`
  height: ${props => props.height};
  width: 100%;
`;

function RealtimeNumberOfSalesChart(props) {
  const { data, height } = props;

  return (
    <Root height={height}>
      <RealtimeLineChart data={data} label="sales" />
    </Root>
  );
}

RealtimeNumberOfSalesChart.defaultProps = {
  height: '150px',
};

RealtimeNumberOfSalesChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      y: PropTypes.number.isRequired,
      x: PropTypes.number.isRequired,
    }),
  ).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

const mapState = state => ({
  data: numberOfSalesChartDataSelector(state, { take: 10 }),
});

export default connect(mapState)(RealtimeNumberOfSalesChart);
