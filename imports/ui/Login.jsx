import React from "react"
import { Meteor } from 'meteor/meteor'
import FlipMove from 'react-flip-move';
import { Link } from 'react-router-dom';

import { useHistory } from 'react-router-dom';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    handleChange(e) {
        if (e.target.name === 'email') {
            const email = e.target.value.trim();
            this.setState({ email });
        } else {
            const password = e.target.value.trim();
            this.setState({ password });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        Meteor.loginWithPassword(this.state.email, this.state.password, (error) => {
            if (error) {
                this.setState({ error: "Something is terribly wrong" })
            }
        })
    }

    onLogin(){
        let history = useHistory();
        history.push('/temp');
        history.goBack();
        console.log("walla lalala");
    }

    render() {
        console.log(Meteor.userId())
        return (
            <div className="wrapper">
                <div className="info-abt-page">
                    <h1>Login</h1>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
                <div className="wrapper login-container">
                    <form onSubmit={this.onSubmit.bind(this)} className="login-container--form" >
                        <input type="email"
                            className="button"
                            value={this.state.email}
                            name="email"
                            placeholder="Email"
                            className="login-container--input"
                            onChange={this.handleChange} 
                        />
                        <input type="password"
                            className="button"
                            value={this.state.password}
                            placeholder="Password"
                            className="login-container--input"
                            onChange={this.handleChange} 
                        />
                        <div className="login-container--input">
                            <Link className="msg" to="/signup">Do not have an account? Signup</Link>
                        </div>

                        <div className="login-container--btn">
                            <button 
                                type="submit" 
                                className="button login-container--button" 
                                onClick={this.onLogin}
                            >
                                Login
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}