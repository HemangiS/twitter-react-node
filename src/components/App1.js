import React, { Component } from 'react';
import Header1 from './headers/header1';

class App1 extends Component {
  render(){
    return(
      <div className="container">
        <div className="page-canvas">
          <Header1 />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App1;
