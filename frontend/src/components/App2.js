import React, { Component } from 'react';
import Header2 from './headers/header2';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class App2 extends Component {
  componentWillMount() {
    console.log("set cookie is:",cookie.load('user_id'));
    var coki =  cookie.load('user_id');
    if(coki) {
    } else {
      browserHistory.push("/");
    }
  }

  render(){
    return(
      <div><Header2 />
      <div style={{marginTop: '60px'}} className="container fb-profile">
        <div style={{padding: '20px 0px 20px 0px', marginRight: '20px'}} className="page-canvas">

          {this.props.children}
        </div>
      </div>
      </div>
    );
  }
}

export default App2;
