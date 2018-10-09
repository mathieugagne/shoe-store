import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const Responsive = styled('div')`
  width: 100%;
  overflow-y: auto;
`;

const Root = styled('table')`
  width: 100%;
  border-spacing: 0;
  border: 0;
`;

const Inner = styled('tbody')`
  border: 0;
`;

function Table(props) {
  const { children } = props;

  return (
    <Responsive>
      <Root>
        <Inner>{children}</Inner>
      </Root>
    </Responsive>
  );
}

Table.defaultProps = {
  children: null,
};

Table.propTypes = {
  children: PropTypes.node,
};

export default Table;
