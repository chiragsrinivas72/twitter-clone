import React from 'react';
import ReactDOM from 'react-dom';

import HomePage from './HomePage';
import People from './components/People.js';
import CreateAccount from './components/CreateAccount.js'
import Login from './components/Login.js'

import { Route,BrowserRouter as Router } from 'react-router-dom';


ReactDOM.render(
  <Router>
    <Route exact path="/" component={Login} />
    <Route path='/CreateAccount' component={CreateAccount} />
    <Route path='/Home' component={HomePage} />
    <Route path="/people" component={People} />
  </Router>,
  document.getElementById('root')
);
