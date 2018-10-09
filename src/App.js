import React from 'react';
import { Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import { Provider as ReduxProvider } from 'react-redux';
import history from './libs/history';
import GlobalStyle from './GlobalStyle';
import InitialLoading from './InitialLoading';
import Routes from './Routes';
import { getStore } from './store';
import theme from './theme';

function App() {
  return (
    <ReduxProvider store={getStore()}>
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <InitialLoading />
          <Router history={history}>
            <Routes />
          </Router>
        </>
      </ThemeProvider>
    </ReduxProvider>
  );
}

export default App;
