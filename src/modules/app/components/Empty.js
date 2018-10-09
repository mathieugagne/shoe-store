import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components/macro';

const Root = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
`;

function Empty(props) {
  const { children } = props;

  return (
    <Root>
      <div>{children}</div>
    </Root>
  );
}

Empty.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Empty;
