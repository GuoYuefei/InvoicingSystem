import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Win} from './Initialization/init.js'
import {Test} from './Initialization/test'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Win/>
        <Test />
      </div>
    );
  }
}

export default App;
