import React from 'react';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import axios from 'axios';

class Logout extends React.Component {
  render() {
    var a = cookie.load('user_id');
    if(a > 0 ) {
      cookie.remove('user_id', { path: '/' });
      axios.get('http://localhost:8000/logout')
      .then(function (response) {
        console.log('response--->',response);
        browserHistory.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });

    } else {
      browserHistory.push('/');
    }

    return (
      <div>a</div>

    );
  }
}

export default Logout;
