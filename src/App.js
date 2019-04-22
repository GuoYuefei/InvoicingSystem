import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import {Win} from './Initialization/init.js'
import {Test} from './Initialization/test'
import {NavMain} from './mainWin/nav'


class App extends Component {
  render() {
    return (
      <div className="App">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <Win/>
        <Test />
        <NavMain />
      </div>
    );
  }
}

export default App;
