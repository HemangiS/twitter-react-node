import React, { Component } from 'react';
import Header2 from './headers/header2';

class App2 extends Component {
  render(){
    return(
      <div className="container col-sm-12">
        <div className="page-canvas">
          <Header2 />
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App2;
