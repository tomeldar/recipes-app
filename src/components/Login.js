import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import '../css/Login.css';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios'
import QS from 'qs'

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
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            username: "",
            password: "",
            open: false,
            registerUsername: "",
            registerEmail: "",
            registerPassword: "",
            registerConfirmPassword: ""
        };
    }

    handleLogin() { //TODO: Call API to check if login info is correct
        console.log("Attempting login");
        this.props.loginStatus(true);
    }

    handleRegister() {
        if (this.state.registerPassword === this.state.registerConfirmPassword) {
            Axios.get(`${API}users/${this.state.registerUsername}`)
                .then((e) => {
                    if (e.data === undefined || e.data.length === 0) {
                        Axios.post(`${API}users`, {
                            username: this.state.registerUsername,
                            email: this.state.registerEmail,
                            password: this.state.registerPassword
                        })
                            .then(() => {
                                console.log(`Successfully made user: ${this.state.registerUsername}`);
                                this.props.loginStatus(true);
                            })
                            .catch((e) => {
                                console.log(e)
                            })
                    } else {
                        console.log("User already exists")
                    }
                })
                .catch((e) => {
                    console.log(e);
                })
        } else {
            console.log("Passwords do not match")
        }
    }

    handleOpen() {
        this.setState({ open: true })
    }

    handleClose() {
        this.setState({ open: false })
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
                            onChange={(e) => this.setState({ username: e.target.value })}
                        />
                        <TextField
                            id="standard-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <br/>
                        <div style={{ flexDirection: 'row' }}>
                            <Button onClick={this.handleLogin} variant="contained"
                                    color="primary">Login</Button>
                            <Button onClick={this.handleOpen} variant="contained"
                                    color="secondary" style={{ marginLeft: '1em' }}>Register</Button>
                            <Dialog
                                open={this.state.open}
                                onClose={this.handleClose}
                                aria-labelledby="form-dialog-title"
                            >
                                <DialogTitle id="form-dialog-title">Register</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="username"
                                        label="Username..."
                                        text
                                        fullWidth
                                        required
                                        onChange={(e) => this.setState({ registerUsername: e.target.value })}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="email"
                                        label="Email Address..."
                                        type="email"
                                        fullWidth
                                        required
                                        onChange={(e) => this.setState({ registerEmail: e.target.value })}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="password"
                                        label="Password..."
                                        type="password"
                                        fullWidth
                                        required
                                        onChange={(e) => this.setState({ registerPassword: e.target.value })}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="confirmPassword"
                                        label="Confirm Password..."
                                        type="password"
                                        fullWidth
                                        required
                                        onChange={(e) => this.setState({ registerConfirmPassword: e.target.value })}
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleClose} color="primary">
                                        Cancel
                                    </Button>
                                    <Button onClick={this.handleRegister} color="primary">
                                        Register
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);