import React, { Component } from 'react';
import Header1 from './headers/header1';

class App1 extends Component {
  render(){
    return(
      <div>
      <Header1 />
      <div style={{marginTop: '60px'}} className="container">
        <div className='main'>
        <div className="page-canvas">

          {this.props.children}
        </div>
        </div>
      </div>
      </div>
    );
  }
}

export default App1;
