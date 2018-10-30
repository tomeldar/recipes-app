import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import React, {Component} from 'react';
import '../css/Login.css';
import TextField from '@material-ui/core/TextField';

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
    constructor() {
        super();

        this.state = {
            username: "",
            password: ""
        };
    }

    handleLogin(e) {
        console.log("Attempting login");
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
                        <Button onClick={(e) => this.handleLogin(e)} variant="contained" color="primary">Login</Button>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);