import React from "react";
import {
    BrowserRouter as Router,
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
                <Route path="/login" component={Login}/>
                <Route path="/signup" component={Signup}/>
                {/* <Route path="/books/my" component={AddBooks} /> */}
                <Route path="/books" component={App}/>
                <Route path="/users/edit" component={EditProfie}/>
                <Route path="/users/profile" component={Profile}/>
                <Route path="/users" component={Users}></Route>
            </Switch>
        </Router>
            
)