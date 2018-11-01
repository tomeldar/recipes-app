import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import React, {Component} from 'react';
import '../css/Login.css';
import TextField from '@material-ui/core/TextField';

const API = "http://localhost:8080/api/";

const styles = {
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class Login extends Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        this.state = {
            username: "",
            password: ""
        };
    }

    handleLogin() { //TODO: Call API to check if login info is correct
        console.log("Attempting login");
        this.props.loginStatus(true);
    }

    handleRegister() { //TODO: Call API to create a user
        console.log("Attempting register");
    }

    render() {
        return (
            <div>
                <div className="container">
                    <Card className="Login">
                        <TextField
                            id="standard-username"
                            label="Username"
                            type="username"
                            margin="normal"
                            onChange={(e) => this.setState({username: e.target.value})}
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={(e) => this.setState({password: e.target.value})}
                        />
                        <br/>
                        <div style={{flexDirection: 'row'}}>
                            <Button onClick={() => this.handleLogin()} variant="contained"
                                    color="primary">Login</Button>
                            <Button onClick={() => this.handleRegister()} variant="contained"
                                    color="secondary" style={{marginLeft: '1em'}}>Register</Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);