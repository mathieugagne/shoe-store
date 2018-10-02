import React, { Component } from 'react';
import styled from 'styled-components';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom'

import Header from './components/Header';
import Dashboard from './containers/Dashboard';
import Transfer from './containers/transfer/Transfer';

import './App.css';


const AppStyled = styled.div `
`;

const AppBody = styled.div `
    padding: 0 50px;
`;

class App extends Component {
    render() {
        return (
            <AppStyled>
                <Router>
                    <div>
                        <Header/>  
                        <AppBody>
                            <Switch>
                                <Route exact path='/' component={Dashboard}/>
                                <Route path='/transfer' component={Transfer} />
                            </Switch>
                        </AppBody>
                    </div>
                </Router>
            </AppStyled>
        );
    }
}

export default App;
