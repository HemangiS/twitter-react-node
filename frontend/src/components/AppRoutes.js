import React, {Component} from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';

// Import routing components
import {Router, browserHistory} from 'react-router';
import routes from '../routes';


// import Profile from './profile.component.jsx';
// import Followers from './followers.component.jsx';
// import Welcome from './welcome.component.jsx';
// import Profilechange from './profilechange.component.jsx';
// import ProfilePictureUpload from './profilepictureupload.component.jsx';

// import  from './.component.jsx';
// import  from './.component.jsx';
// import  from './.component.jsx';
// import  from './.component.jsx';
// import  from './.component.jsx';

// ReactDOM.render(
//   <Index1 />,
//   document.getElementById('root')
// );
export default class AppRoutes extends Component {
  render() {
    return (
      <Router history={browserHistory} routes={routes} />
    );
  }
}
