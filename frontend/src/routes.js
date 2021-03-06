import React from 'react';
import {Route} from 'react-router';

import App1 from './components/App1';
import App2 from './components/App2';

import Login from './components/login';
import Logout from './components/logout';
import Register from './components/register';
import About from './components/about';

import Welcome from './components/welcome';
import Profile from './components/profile';
import YourProfile from './components/yourprofile';
import Followers from './components/followers';
import EditProfile from './components/editprofile';

const routes = (
  <div>
    <Route component={App1}>
      <Route path="/" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/about" component={About}/>

    </Route>

    <Route component={App2}>
      <Route path="/welcome/:id" component={Welcome}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/yourprofile/:id" component={YourProfile}/>
      <Route path="/followers/:id" component={Followers}/>
      <Route path="/editprofile/:id" component={EditProfile}/>
    </Route>
  </div>

);

export default routes;
