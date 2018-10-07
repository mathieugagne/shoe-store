import styled from 'styled-components';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { appToggleOrderQuery } from '../state/appActions';
import { orderDirectionSelector } from '../state/appSelectors';

const Root = styled('th')`
  text-align: left;
  padding: ${props => props.theme.gutter}px;
  font-weight: 700;
  white-space: nowrap;
  color: ${props =>
    props.isActive ? props.theme.primary : props.theme.text.color};
  :hover {
    cursor: ${props => (props.onClick ? 'pointer' : 'inherit')};
  }
`;

const Arrow = styled('div')`
  display: inline-block;
  visibility: ${props => (props.direction ? 'visible' : 'hidden')};
  width: 0;
  height: 0;
  margin-bottom: 3px;
  margin-left: 8px;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: ${props =>
    props.direction === 'desc' ? `5px solid ${props.theme.primary}` : '0'};
  border-top: ${props =>
    props.direction === 'asc' ? `5px solid ${props.theme.primary}` : '0'};
`;

function TableHeader(props) {
  const { children, direction, onClick } = props;

  return (
    <Root isActive={['asc', 'desc'].includes(direction)} onClick={onClick}>
      {children}
      {'      ' /* add space for the arrow */}
      <Arrow direction={direction} />
    </Root>
  );
}

TableHeader.defaultProps = {
  children: null,
  direction: null,
  onClick: null,
};

TableHeader.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
  onClick: PropTypes.func,
};

const mapState = (state, { orderKey }) => ({
  direction: orderKey ? orderDirectionSelector(state, { orderKey }) : undefined,
});

const mapDispatch = (dispatch, { orderKey }) => ({
  onClick: orderKey ? () => dispatch(appToggleOrderQuery(orderKey)) : undefined,
});

export default connect(
  mapState,
  mapDispatch,
)(TableHeader);
