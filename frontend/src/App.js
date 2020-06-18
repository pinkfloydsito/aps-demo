import React from 'react';
import logo from './logo.svg';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './redux/configureStore'

import Routes from './Routes';

import { ApolloProvider } from '@apollo/react-hooks';
import client from './apolloClient';
import './App.css';

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    useNextVariants: true,
  },
});


const store = configureStore({})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <div className="App">
              <Routes />
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
