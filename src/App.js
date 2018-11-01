import React, { Component } from 'react';
import './App.css';
import Main from "./components/Main";
import Login from "./components/Login";

class App extends Component {
    constructor() {
        super();

        this.LoginOrMain = this.LoginOrMain.bind(this);

        this.state = {
            loginStatus: false
        }
    }

    LoginOrMain() {
        if (this.state.loginStatus)
            return <Main/>;
        else
            return <Login loginStatus={(status) => this.setState({ loginStatus: status })}/>;
    }

    render() {
        return (
            <div className="container">
                <header className="App-header">
                    {this.LoginOrMain()}
                </header>
            </div>
        );
    }
}

export default App;
