import React from 'react';
import { Tracker } from 'meteor/tracker'
import { Accounts } from 'meteor/accounts-base'

import TitleBar from './TitleBar'

export default class EditProfie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            city: "",
            state: "",
            address: "",
            email: ""
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            this.setState({
                name: Accounts.user() ? Accounts.user().profile.name : "",
                email: Accounts.user() ? Accounts.user().emails[0].address : "",
                state: Accounts.user() ? Accounts.user().profile.state : "",
                city: Accounts.user() ? Accounts.user().profile.city : "",
                address: Accounts.user() ? Accounts.user().profile.address : ""
            })
        })
    }
    componentWillUnmount() {
        this.tracker.stop();
    }

    onSubmit(e) {
        e.preventDefault();
        let city = this.state.city;
        let state = this.state.state;
        let address = this.state.address;
        let name = this.state.name;
        if (Accounts.user()) {
            Meteor.call("user.update", name, state, city, address);
        }
    }

    updateUser() {
        let city = this.state.city;
        let state = this.state.state;
        let address = this.state.address;
        console.log("username", Accounts.user())
    }

    handleChange(e) {
        if (e.target.name === "city") {
            let city = e.target.value.trim()
            this.setState({ city })
        } else if (e.target.name === "state") {
            let state = e.target.value.trim()
            this.setState({ state })
        } else if (e.target.name === "address") {
            let address = e.target.value.trim()
            this.setState({ address })
        }
    }




    render() {
        return (
            <div>
                <TitleBar title={"bK"} />
                <div className="wrapper">
                    <div className="info-abt-page">
                        <h1>{this.state.name}'s Profile</h1>
                    </div>
                    <form onSubmit={this.onSubmit.bind(this)} className="profile-container">
                        
                        <div className="profile-container-element__left"><p>Name</p></div>
                        <input type="text"
                            required={true}
                            className="button"
                            name="name"
                            value={this.state.name} 
                            //placeholder="Name"
                            readOnly
                            className="profile-container-element__right for-form"
                        />

                        <div className="profile-container-element__left"><p>Email</p></div>
                        <input type="email"
                            className="button"
                            value={this.state.email} 
                            name="email"
                            readOnly
                            //placeholder="Email"
                            className="profile-container-element__right for-form"
                            readOnly
                        />

                        <div className="profile-container-element__left"><p>City</p></div>
                        <input type="text"
                            className="button"
                            name="city"
                            value={this.state.city} 
                            placeholder={ this.state.city || "City Name"}
                            onChange={this.handleChange}
                            className="profile-container-element__right for-form"
                        />

                        <div className="profile-container-element__left"><p>State</p></div>
                        <input type="text"
                            className="button"
                            name="state"
                            // value={this.state.city} 
                            placeholder="State"
                            onChange={this.handleChange}
                            className="profile-container-element__right for-form"
                        />


                        <div className="profile-container-element__left"><p>Address</p></div>
                        <input type="text"
                            className="button"
                            name="addess"
                            // value={this.state.city} 
                            placeholder="Mailing Address"
                            onChange={this.handleChange}
                            className="profile-container-element__right for-form"
                        />
                        <button type="submit" className="item-button-purple button save-btn" >Save Changes</button>
                    </form>
                </div>

            </div>
        );
    }
} 