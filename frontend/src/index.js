import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from './HomePage';
import People from './components/People.js';
import CreateAccount from './components/CreateAccount.js'
import Login from './components/Login.js'
import Profile from './components/Profile.js'

import { Route,BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <Route exact path="/" component={Login} />
    <Route path='/CreateAccount' component={CreateAccount} />
    <Route path='/Home' component={HomePage} />
    <Route path="/people" component={People} />
    <Route path="/profile" component={Profile}/>
  </Router>,
  document.getElementById('root')
);
