import React, { Component } from 'react';
import axios from 'axios';
// import Link from 'react-router';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state={
      username :'',
      email :'',
      mobilenumber:'',
      password:'',
      errors: {},
      data:'' ,
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    axios.post('http://localhost:8000/register', {
      userdata: this.state,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    e.preventDefault(e);
  }

  onFieldChange(event){
    // const target = event.target;
    // const name = target.name;
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log("state---->", this.state, name);
  }

  render() {
    console.log("from component:", this.state.data);
    return (
      <div className="container">
        <div className="col-md-12">
          <div className="signin-wrapper">
            <h2 className="clr">Join twitter Today!!</h2>
            <form action="/register" method="post" encType="multipart/form-data" className="form-horizontal">
              <div className="form-content">
                <div className="form-group">
                  <div className="col-sm-4">
                    <input
                      onChange={this.onFieldChange}
                      value={this.state.username}
                      type="text"
                      id="name"
                      name="username"
                      placeholder="username"
                      className="form-control form-control-inline"
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-4">
                    <input
                      onChange={this.onFieldChange}
                      value={this.state.mobilenumber}
                      type="text"
                      name="mobilenumber"
                      maxLength="10"
                      placeholder="Mobile Number"
                      className="form-control form-control-inline"
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-4">
                    <input
                      onChange={this.onFieldChange}
                      value={this.state.email}
                      type="email"
                      name="email"
                      placeholder="email"
                      className="form-control form-control-inline"
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-4">
                    <input
                      onChange={this.onFieldChange}
                      value={this.state.password}
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                      className="form-control form-control-inline"
                      required="required"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-4">
                    <input
                      type="password" id="confirmPassword" name="confirmpassword" placeholder="Confirm password" required className="form-control form-control-inline"/>
                  </div>
                  <div className="col-sm-4">
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-4">
                    <h4 className="clr">choose your profile picture</h4>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-4">
                    <input type="file" name="profile" className="clr" required/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-4">
                    <input onChange={this.onFieldChange} type="checkbox" checked="checked" required className="filled-in"/>
                    <label>Tailor Twitter based on my recent website visits &nbsp;<a href="https://support.twitter.com/articles/20169421" className="clr">Learn more.</a></label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-4">

                    <input type="button" name="Submit" value="Sign In" className="form-control button btn-info"
                      onClick={this.handleSubmit}/>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default Register;
