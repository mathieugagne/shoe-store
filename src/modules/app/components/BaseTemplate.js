import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'react-flexbox-grid';
import Breadcrumb from './Breadcrumb';
import Navigation from './Navigation/Navigation';
import TopBar from './TopBar';
import NotificationStack from '../../notification/components/NotificationStack';

const Root = styled.div`
  margin: ${props => props.theme.gutter}px;
  margin-top: ${props =>
    props.theme.dimensions.topBar.height + props.theme.gutter}px;
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: 1120px;
`;

function BaseTemplate(props) {
  const { children } = props;

  return (
    <Root>
      <TopBar />
      <NotificationStack />
      <Container>
        <Breadcrumb />
        <Row>
          <Col sm={2}>
            <Navigation />
          </Col>
          <Col sm={10}>{children}</Col>
        </Row>
      </Container>
    </Root>
  );
}

BaseTemplate.defaultProps = {
  children: null,
};

BaseTemplate.propTypes = {
  children: PropTypes.node,
};

export default BaseTemplate;
