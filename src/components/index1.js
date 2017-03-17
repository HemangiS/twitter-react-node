import React, { Component } from 'react';
var path = require('../../public/images/cover.jpg');

class Index1 extends Component {
  render(){
    return(
      <div>
        <img src={path} width="100%" height="300px" alt="cover" />
        <div className="page-canvas">
          <div style={{marginTop: 30 + "px"}}>
            <div className="rows">
              <div className="col-lg-6">
                <a href="/login">
                  <button style={{float :"right"}} className="btn btn-info btn-lg"> Log&nbsp;in </button>
                </a>
              </div>
              <div className="col-lg-6">
                <p style={{float : "left"}}>you already have an account??</p>
              </div>
            </div>
          </div>
          <div style={{margin: 30+"px "+ 0+"px "+ 30+"px "+ 0+"px"}} className="container">
            <div className="rows">
              <div className="col-lg-6"><a href="/register">
                  <button style={{float :"right"}} className="btn btn-info btn-lg">sign Up</button></a></div>
              <div className="col-lg-6">
                <p style={{float : 'left'}}>Create you account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index1;
