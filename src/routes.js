import React from 'react';
import {Route} from 'react-router';

import App1 from './components/App1';
import App2 from './components/App2';

import Index1 from './components/index1';
import Login from './components/login';
import Register from './components/register';

import Welcome from './components/welcome';
import Profile from './components/profile';
import YourProfile from './components/yourprofile';
import Followers from './components/followers';
import EditProfile from './components/editprofile';

import DeleteTweet from './components/deletetweet';
// import Header1 from './components/headers/header1';

const routes = (
  <div>
    <Route component={App1}>
      <Route path="/" component={Index1}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>

    </Route>

    <Route component={App2}>
      <Route path="/welcome/:id" component={Welcome}/>
      <Route path="/profile" component={Profile}/>
      <Route path="/yourprofile/:id" component={YourProfile}/>
      <Route path="/followers/:id" component={Followers}/>
      <Route path="/editprofile/:id" component={EditProfile}/>
      <Route path="/follow" component={Welcome}/>
      <Route path="/unfollow" component={Welcome}/>
      <Route path="/deletetweet/:id" component={DeleteTweet}/>
    </Route>
  </div>

);

export default routes;
