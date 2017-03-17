import React from 'react';
import {Route} from 'react-router';

import App1 from './components/App1';
// import App2 from './components/App2';
import Index1 from './components/index1';
import Login from './components/login';
import Register from './components/register';
// import Header1 from './components/headers/header1';

const routes = (
  <Route component={App1}>
    <Route path="/" component={Index1}/>
    <Route path="/register" component={Register}/>
    <Route path="/login" component={Login}/>

  </Route>


);

export default routes;
