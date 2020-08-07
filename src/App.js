import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { GlobalProvider } from './context/GlobalState';
import Header from './components/Header';
import Photo from "./components/Photo";
import PhotoList from "./components/PhotoList";
import './App.css';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#FF5722',
      dark: '#d50000',
      contrastText: '#fff',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <GlobalProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={PhotoList} />
            <Route path="/photo" exact component={Photo} />
          </Switch>
        </BrowserRouter>
      </GlobalProvider>
    </MuiThemeProvider>
  );
}

export default App;
