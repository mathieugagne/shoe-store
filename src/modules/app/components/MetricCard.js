import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';
import { Row, Col } from 'react-flexbox-grid';

const Root = styled.div`
  background-color: ${props => props.theme.backgroundContrast};
  padding: ${props => props.theme.gutter}px;
  font-size: ${props => props.theme.text.fontSize}px;
`;

const Title = styled.div`
  display: block;
  padding-bottom: ${props =>
    props.hasMetrics ? `${props.theme.gutter / 2}px` : 0};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const MetricTitle = styled.div`
  font-size: ${props => props.theme.text.fontSize - 4}px;
  padding-bottom: ${props => props.theme.gutter / 4}px;
`;

const MetricContent = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

function MetricCard(props) {
  const { metrics, title } = props;

  const hasMetrics = metrics && metrics.length;
  const colSize = hasMetrics ? Math.floor(12 / metrics.length) : 12;

  return (
    <Root>
      <Title hasMetrics={hasMetrics}>{title}</Title>
      {hasMetrics && (
        <Row>
          {metrics.map(({ title: metricTitle, content, popup }, index) => (
            /* eslint-disable react/no-array-index-key */
            <Col key={index} title={popup} xs={colSize}>
              <MetricTitle>{metricTitle}</MetricTitle>
              <MetricContent>{content}</MetricContent>
            </Col>
            /* eslint-enable react/no-array-index-key */
          ))}
        </Row>
      )}
    </Root>
  );
}

MetricCard.defaultProps = {
  title: null,
  metrics: null,
};

MetricCard.propTypes = {
  title: PropTypes.node,
  metrics: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.node,
      content: PropTypes.node,
      popup: PropTypes.string,
    }),
  ),
};

export default MetricCard;
