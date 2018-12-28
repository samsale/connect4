import React, { Component } from 'react';
import './App.css';
import Header from './header.js'
import Board from './board.js'

class App extends Component {

  render() {
    return (
      <div className="app">
      <>
      <Header/>
      </>
      <>
      <Board/>
      </>
      </div>
    );
  }
}

export default App;
