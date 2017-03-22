// active working

import React, { Component } from 'react';
var path = require('../../../public/images/logo.png');

class Header2 extends Component {

  render(){

  let imgLogo = {
    width: '30px',
    height: '30px',
    paddingBottom: '3px'
  }

    return(
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/"><img style={imgLogo} src={path} alt="logo" /></a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="/welcome">
                    <i className="clr glyphicon glyphicon-home">
                      &nbsp;Home
                    </i>
                  </a>
                </li>
                <li>
                  <a href="/yourprofile">
                    <i className="clr glyphicon glyphicon-edit">
                      &nbsp;Profile
                    </i>
                  </a>
                </li>

                <li>
                  <a href="/followers">
                    <i className="clr glyphicon glyphicon-user">
                      &nbsp;Followers
                    </i>
                  </a>
                </li>
                <li>
                  <a href="/editprofile">
                    <i className="clr glyphicon glyphicon-pencil">
                      &nbsp;EditProfile
                    </i>
                  </a>
                </li>

                <li>
                  <a href="/logout">
                    <i className="clr glyphicon glyphicon-off">
                      &nbsp;Logout
                    </i>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </nav>
      </div>
    );
  }
}

export default Header2;
