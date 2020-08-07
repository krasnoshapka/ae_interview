import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Header from './components/Header';
import Photo from "./components/Photo";
import PhotoList from "./components/PhotoList";
import './App.css';
import {connect} from "react-redux";

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

const App = ({selected, ...props}) => {
  // Very simple routing for now
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      {
        !selected ? (<PhotoList />) : (<Photo picture={selected}/>)
      }
    </MuiThemeProvider>
  );
}

export default connect(
  state => ({
    selected: state.selected,
  }),
  {},
)(App);
