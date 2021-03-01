import React from "react";
import { Meteor } from 'meteor/meteor'
import {
    BrowserRouter as Router,
    Redirect,
    Switch,
    Route,
    Link
} from "react-router-dom";

import App from '../ui/App'
import Signup from '../ui/Signup';
import Login from '../ui/Login';
import Users from '../ui/Users';
import Profile from '../ui/Profile';
import EditProfie from "../ui/EditProfile";
import AddBooks from "../ui/AddBooks";

export const routes = (

    <Router>
        <Switch>
            <Route path="/login" render={() => (
                Meteor.userId() ? (<Redirect to="/" />) : (<Login />)
            )}/>
            <Route path="/signup" render={() => (
                Meteor.userId() ? (<Redirect to="/" />) : (<Signup />)
            )}/>

            <Route path="/books/my"
                render={()=>(!Meteor.userId() ? (<Redirect to="/"/>) : (<AddBooks/>) )}
            />

            <Route path="/users/edit" 
                render={()=>(!Meteor.userId() ? (<Redirect to="/"/>) : (<EditProfie/>) )}
            />

            <Route path="/users/profile" 
              render={()=>(!Meteor.userId() ? (<Redirect to ="/"/>) : (<Profile/>))}
            />

            <Route path="/users" component={Users}></Route>

            <Route path="/" component={App} />
        </Switch>
    </Router>

)