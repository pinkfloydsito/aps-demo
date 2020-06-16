import React from 'react';
import logo from './logo.svg';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { ApolloProvider } from '@apollo/react-hooks';
import client from './apolloClient';
import APSDropZone from './components/APSDropZone'
import Nav from './components/Nav'
import './App.css';

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 10,
    useNextVariants: true,
  },
});

const App = () => {
  return (
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Nav/>
        <APSDropZone />
      </div>
    </MuiThemeProvider>
  </ApolloProvider>
  );
}

export default App;
