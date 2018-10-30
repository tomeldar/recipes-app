import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main";
import Login from "./components/Login";

class App extends Component {
  render() {
    return (
      <div className="container">
        <header className="App-header">
            <Login/>
        </header>
      </div>
    );
  }
}

export default App;
