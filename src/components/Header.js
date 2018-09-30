import React from 'react';
import logo from '../aldo_group_logo.svg';
import styled from 'styled-components';

const HeaderStyled = styled.div`
    width: 100%;
    height: 7.5 rem;
    text-align:center;
    padding: 20px;
`;

const LogoStyled = styled.img`
    width:130px;
    height: 24px;
`;

export default class Header extends React.Component {
    render() {
        return (
            <HeaderStyled>
                <LogoStyled src={logo} alt={"Aldo logo"}/>
            </HeaderStyled>
        );
    }
}