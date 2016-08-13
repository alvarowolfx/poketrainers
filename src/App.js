import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';

import './App.css';

import CalculatorPage from './CalculatorPage';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="app">
        <AppBar title="Pokemon Trainers" showMenuIconButton/>
        <div className="app-container">
          <CalculatorPage/>
        </div>
      </div>
    );
  }
}

export default App;
