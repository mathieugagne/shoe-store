import React from 'react';
import logo from '../aldo_group_logo.svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderStyled = styled.div`
    width: 100%;
    height: 7.5 rem;
    text-align:center;
    padding: 20px;
    border-bottom:1px solid #dcdcdc;
    margin-bottom:5px;

    /* layout */
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;

    /* layout vertical */
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
`;

const StyledLink = styled(Link)`
    margin-left: 15px;
    font-size: 20px;  
    text-decoration:none;
    font-family: Helvetica, Arial, sans-serif;
    color: #36304a;

    &:hover{
        opacity:0.5;
    }
`;

const MenuDiv = styled.div`
    margin:auto;
    padding-top:20px;
`;

const LogoStyled = styled.img`
    margin:auto;
    width:130px;
    height: 20px;
`;

export default class Header extends React.Component {
    render() {
        return (
            <HeaderStyled>
                <LogoStyled src={logo} alt={"Aldo logo"} />
                <MenuDiv>
                    <StyledLink to='/'>Dashboard</StyledLink>
                    <StyledLink  to='/transfer'>Transfer</StyledLink>
                </MenuDiv>
            </HeaderStyled>
        );
    }
}