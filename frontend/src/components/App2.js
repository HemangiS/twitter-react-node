import React, { Component } from 'react';
import Header2 from './headers/header2';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class App2 extends Component {
  componentWillMount() {
    var coki =  cookie.load('user_id');
    if(coki) {
    } else {
      browserHistory.push("/");
    }
  }

  render(){
    return(
      <div className="container fb-profile col-sm-12">
        <div className="page-canvas">
          <Header2 />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App2;
