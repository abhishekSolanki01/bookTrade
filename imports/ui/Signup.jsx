import React from 'react';

import { Accounts } from 'meteor/accounts-base'
import { Link } from 'react-router-dom'

import { BooksInfo } from '../api/booksInfo'
import { Tracker } from 'meteor/tracker'


export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: "",
            email: "",
            password: "",
            name: ""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        if (e.target.name === 'email') {
            const email = e.target.value.trim();
            this.setState({ email });
        } else if (e.target.name === 'password') {
            const password = e.target.value.trim();
            let length = e.target.value.length;
            if (length <= 8) {
                this.setState({ error: `password length must be grater than ${length}` })
            } else {
                this.setState({ error: "" })
            }

            this.setState({ password });
        } else if (e.target.name === 'name') {
            const name = e.target.value.trim();
            this.setState({ name });
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        let name = this.state.name;
        var options = {
            email,
            password,
            profile: {
                name
            }
        };
        if (this.state.password.length <= 8) {
            this.setState({ error: `password must be greater than 8 character` })
            return;
        }
        Accounts.createUser(options, (error) => {
            console.log("logging user", error)
            if (error) {
                this.setState({ error: error.reason })
            } else {
                this.setState({ error: "" })
            }
        });

    }

    render() {
        console.log(Accounts.userId());
        console.log("-->", Accounts.user())
        return (
            <div className="wrapper">
                <div className="info-abt-page">
                    <h1>Signup</h1>
                </div>
                {this.state.error && <p>{this.state.error}</p>}
                <div className="wrapper login-container">
                    <form onSubmit={this.onSubmit.bind(this)} noValidate className="login-container--form">
                        <input type="text"
                            required={true}
                            className="login-container--input"
                            name="name"
                            placeholder="Name"
                            onChange={this.handleChange} 
                        />
                        <input type="email"
                            className="login-container--input"
                            name="email"
                            placeholder="Email"
                            onChange={this.handleChange} 
                        />
                        <input type="password"
                            className="login-container--input"
                            name="password"
                            placeholder="Password"
                            onChange={this.handleChange} 
                        />
                        <div className="login-container--input">
                            <Link className="msg" to="/login">Having Account? Login</Link>
                        </div>
                        <div className="login-container--btn">
                            <button type="submit" className="button login-container--button" >Create Accounts</button>

                        </div>
                    </form>
                </div>

            </div>
        );
    }
}
