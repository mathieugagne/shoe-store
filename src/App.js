import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { Provider as ReduxProvider } from 'react-redux';
import history from './libs/history';
import GlobalStyle from './GlobalStyle';
import Routes from './Routes';
import { getStore } from './store';
import theme from './theme';

function App() {
  return (
    <ReduxProvider store={getStore()}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Router history={history}>
            <Routes />
          </Router>
        </>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
