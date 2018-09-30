import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './components/Header';
import CardContainers from './containers/CardContainers';
import ShopsTableContainer from './containers/ShopsTableContainer';
import ShopTableContainer from './containers/ShopTableContainer';
import Filters from './containers/Filters';

import './App.css';

const AppStyled = styled.div`
    padding: 0 50px;
`;

class App extends Component {
    render() {
        return (
            <AppStyled>
                <Header />
                <CardContainers />
                <Filters />
                <ShopsTableContainer />
                <ShopTableContainer />
            </AppStyled>
        );
    }
}

export default App;
