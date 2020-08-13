import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
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

const App = () => {

  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <Router>
        <Switch>
          <Route path="/" exact children={<PhotoList />} />
          <Route path="/photo/:id" exact children={<Photo />} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
