import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import  App  from '/imports/ui/App';
import {routes} from '../imports/routes/routes'
import { Tracker } from 'meteor/tracker';


//using router 
Tracker.autorun(()=>{
  const isAuthenticated = !!Meteor.userId();
  console.log(isAuthenticated, "is auth")
})

Meteor.startup(() => {
  render(routes, document.getElementById('react-target'));
});