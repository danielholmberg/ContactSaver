import React, { Component } from 'react';
import logo from './../logo.svg';
import './App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ContactList from './../components/ContactList/ContactList.js';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Contact Saver</h1>
          </header>
          <ContactList/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
