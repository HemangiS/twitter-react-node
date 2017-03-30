import React, { Component } from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
// import Link from 'react-router';

class Register extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username :'',
      email :'',
      mobilenumber:'',
      password:'',
      confirmpassword:'',
      errors: {},
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  isValidate() {
    var username = document.registrationform.username.value.trim();
    var password = document.registrationform.password.value.trim();
    var confirmpassword = document.registrationform.confirmpassword.value.trim();
    var mobilenumber = document.registrationform.mobilenumber.value.trim();

    if(username.length < 1) {
      document.getElementById("usernameerr").innerHTML = "Please enter your name";
    } else {
      document.getElementById("usernameerr").innerHTML = "";
    }

    if(mobilenumber.length < 1) {
      document.getElementById("mobileerr").innerHTML = "Please enter your mobile number";
    } else if(mobilenumber.length !== 10) {
      document.getElementById("mobileerr").innerHTML = "Plaese enter valid mobile no";
    } else {
      document.getElementById("mobileerr").innerHTML = "";
    }

    if(password.length < 1) {
      document.getElementById("passworderr").innerHTML = "This field is required";
    }
    // else if(password.length<6){
    //   document.getElementById("passworderr").innerHTML=
    //   "Password must be at least 6 char long";
    // }
    else {
      document.getElementById("passworderr").innerHTML = "";
    }

    if(confirmpassword.length < 1) {
      document.getElementById("cpassworderr").innerHTML = "This field is required";
    } else if(confirmpassword !== password){
      document.getElementById("cpassworderr").innerHTML=
      "Password must be match";
    } else {
      document.getElementById("cpassworderr").innerHTML = "";
    }

  }

  handleSubmit(e){
    e.preventDefault();
    axios.post('http://localhost:8000/register', {
      userdata: this.state,
    })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    browserHistory.push('/login');


    // this.isValidate();
  }

  onFieldChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
    console.log("state---->", this.state, name);

  }

  render() {

    const errstyle = {
      color: 'red'
    };

    console.log("from component:", this.state);
    return (
      <div className="container">
        <h2 className="clr">Join twitter Today!!</h2>
        <form name="registrationform" action="/register" method="post" encType="multipart/form-data" className="form-horizontal">

          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <label htmlFor="username">Name<span style={errstyle}>*</span></label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <input
                onChange={this.onFieldChange}
                value={this.state.username}
                type="text"
                id="name"
                name="username"
                placeholder="Jone Doe"
                className="form-control form-control-inline"
                required="required"
              />
              <span style={errstyle} id="usernameerr"></span>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <label htmlFor="mobilenumber">Mobile Number<span style={errstyle}>*</span></label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <input
                onChange={this.onFieldChange}
                value={this.state.mobilenumber}
                type="number"
                name="mobilenumber"
                minLength="10"
                maxLength="10"
                placeholder="Please enter a ten digit phone number"
                className="form-control form-control-inline"
                required="required"
              />
              <span style={errstyle} id="mobileerr"></span>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <label htmlFor="email">Email<span style={errstyle}>*</span></label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <input
                onChange={this.onFieldChange}
                value={this.state.email}
                type="email"
                name="email"
                placeholder="foobar@inc.com"
                className="form-control form-control-inline"
                required="required"
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <label htmlFor="password">Password<span style={errstyle}>*</span></label>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
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
              <span style={errstyle} id="passworderr"></span>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <label htmlFor="confirmpassword">Confirm your password<span style={errstyle}>*</span></label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <input
                onChange={this.onFieldChange}
                value={this.state.confirmpassword}
                type="password"
                id="confirmPassword"
                name="confirmpassword"
                placeholder="Confirm password"
                required
                className="form-control form-control-inline"
              />
              <span style={errstyle} id="cpassworderr"></span>
            </div>
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <h4 className="clr">Choose your profile picture</h4>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <input type="file" name="profile" className="clr" required/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <div className="regcheck">
                <input className="formcheckbox" type="checkbox" name="agreement" /> &nbsp;Tailor Twitter based on my recent website visits &nbsp;<a href="https://support.twitter.com/articles/20169421" className="clr">Learn more.</a>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">

              <input type="submit" name="Submit" value="Sign In" className="submit form-control button btn-info"
                onClick={this.handleSubmit}/>
            </div>
          </div>

        </form>

        <div><hr /></div>

        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
            <p style={{color: 'blue', fontSize: '20px', marginTop: '10px', float : 'right'}}>Already have Account! </p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6"><a href="/login">
            <button style={{marginBottom: '20px', float :"left"}} className="btn btn-info btn-lg">Log&nbsp;in</button></a>
          </div>

        </div>
      </div>

    );
  }
}

export default Register;
