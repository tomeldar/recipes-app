import React, {Component} from 'react';
import './App.css';
import Main from "./components/Main";
import Login from "./components/Login";

class App extends Component {
    constructor(){
        super();

        this.loginCallback = this.loginCallback.bind(this);
        this.LoginOrMain = this.LoginOrMain.bind(this);

        this.state = {
            loginStatus: false
        }
    }

    loginCallback(status){
        if (status)
            this.setState({loginStatus: status});
    }

    LoginOrMain(){
        if(this.state.loginStatus)
            return <Main/>;
        else
            return <Login loginStatus={this.loginCallback}/>;
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
