import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo-white.svg';

const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.primary};
  width: 100%;
  height: ${props => props.theme.dimensions.topBar.height}px;
  z-index: 9999;
`;

const LogoLink = styled(Link)`
  display: block;
  background-image: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  height: 22px;
  width: 120px;
`;

function TopBar() {
  return (
    <Root>
      <LogoLink to="/" />
    </Root>
  );
}

export default TopBar;
