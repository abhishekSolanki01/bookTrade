import React from 'react';
import TitleBar from './TitleBar';
import { Accounts } from 'meteor/accounts-base'
import { Tracker } from 'meteor/tracker';
import { Link } from 'react-router-dom'

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            city: "",
            state: "",
            email: "",
            address: ""
        }
    }
    componentDidMount() {
        this.tracker = Tracker.autorun(() => {
            let name = null;
            let email = "";
            let city = "";
            let state = "";
            let address = "";
            if (Accounts.user()) {
                let user = Accounts.user({}, { fields: { 'emails': 1, 'profile': 1 } })
                name = user.profile.name
                city = user.profile.city
                state = user.profile.state
                email = user.emails[0].address;
                address = user.profile.address
            }
            this.setState({ name, city, state, email,address })
        })
    }
    componentWillUnmount() {
        this.tracker.stop()
    }

    render() {
        return (
            <div>
                <TitleBar title={"bK"} />
                <div className="wrapper">
                    <div className="info-abt-page">
                        <h1>{this.state.name}'s Profile</h1>
                    </div>

                    <div className="profile-container">
                        {/* <h1>city: {this.state.city}, state:  {this.state.state}, email: {this.state.email}</h1> */}
                            <div className="profile-container-element__left"><p>Name</p></div>
                            <div className="profile-container-element__right"><p>{this.state.name}</p></div>
                    
                            <div className="profile-container-element__left"><p>Email</p></div>
                            <div className="profile-container-element__right"><p>{this.state.email || "No city updated"}</p></div>


                            <div className="profile-container-element__left"><p>City</p></div>
                            <div className="profile-container-element__right"><p>{this.state.city || "No city updated"}</p></div>

                            <div className="profile-container-element__left"><p>State</p></div>
                            <div className="profile-container-element__right"><p>{this.state.state || "No State updated"}</p></div>

                            <div className="profile-container-element__left"><p>Address</p></div>
                            <div className="profile-container-element__right"><p>{this.state.address || "No address updataed"}</p></div>
                    
                            <Link to="/users/edit" className="profile-container-element__left__btn">
                                <p> <span>Edit profile</span> </p>
                            </Link>
                            <Link to="/books/my" className="profile-container-element__right__btn">
                                <p><span>{this.state.name}'s books</span> </p>
                            </Link>
                    
                    </div>


                </div>

            </div>
        )
    }
}