import React, { Component } from 'react';
// var path = require('../../public/images/cover.jpg');
// var path = require('../../public/images/logo.png');

class Index1 extends Component {
  render(){
    return(
      <div>

        <div className="container">
          <div style={{marginTop: 30 + "px"}}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <a href="/login">
                  <button style={{float :"right"}} className="btn btn-info btn-lg"> &nbsp;Log&nbsp;&nbsp;in&nbsp; </button>
                </a>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <p style={{float : "left"}}>Already have an account??</p>
              </div>
            </div>
          </div>
          <div style={{margin: 30+"px "+ 0+"px "+ 30+"px "+ 0+"px"}}>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><a href="/register">
                  <button style={{float :"right"}} className="btn btn-info btn-lg">Sign&nbsp;Up</button></a></div>
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <p style={{float : 'left'}}>Create your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Index1;
