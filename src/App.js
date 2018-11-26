import React, { Component } from 'react';
import './App.css';
import Todo from './containers/Todo';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import baseTheme from "./baseTheme";

class App extends Component {
  render() {
    return (
        <MuiThemeProvider theme={baseTheme}>
            <Todo />
        </MuiThemeProvider>
    );
  }
}

export default App;
