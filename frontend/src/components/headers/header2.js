// active working

import React, { Component } from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';
var path = require('../../../public/images/logo.png');

class Header2 extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',
      user_id: ''
    }

  }

  // componentWillMount() {
  //   this.setState({user_id: cookie.load('user_id')});
  // }

  render(){

    let imgLogo = {
      width: '30px',
      height: '30px',
      paddingBottom: '3px'
    }

    let id = cookie.load('user_id');

    let welcome = `/welcome/${id}`;

    let editprofile = `/editprofile/${id}`;
    let logout = `/logout`;

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
              <a className="navbar-brand" href="#"><img style={imgLogo} src={path} alt="logo" /></a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

              <ul className="nav navbar-nav navbar-right">

                <li>

                  <Link to={welcome}>
                    <font className='clr'>
                      <i className="glyphicon glyphicon-home">
                        &nbsp;
                      </i>
                      Home
                    </font>
                  </Link>
                </li>

                <li>
                  <Link to={editprofile}>
                    <font className='clr'>
                      <i className="clr glyphicon glyphicon-pencil">
                        &nbsp;
                      </i>
                      EditProfile
                    </font>
                  </Link>
                </li>

                <li>
                  <Link to={logout}>
                    <font className='clr'>
                      <i className="clr glyphicon glyphicon-off">
                        &nbsp;
                      </i>
                      Logout
                    </font>
                  </Link>
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
