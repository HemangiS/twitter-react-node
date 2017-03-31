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
      flagusername: 0,
      flagemail: 0,
      flagmobilenumber: 0,
      flagpassword: 0,
      flagconfirmpassword: 0,
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.isValidate = this.isValidate.bind(this);
    this.usernameValidate = this.usernameValidate.bind(this);
    this.mobilenumberValidate = this.mobilenumberValidate.bind(this);
    this.emailValidate = this.emailValidate.bind(this);
    this.passwordValidate = this.passwordValidate.bind(this);
    this.confirmpasswordValidate = this.confirmpasswordValidate.bind(this);
  }

  onFieldChange(event){
    this.setState({
      [event.target.name]: event.target.value.trim()
    });
  }

  usernameValidate(e) {
    this.onFieldChange(e);
    let username = document.registrationform.username.value.trim();
    if(username.length < 1) {
      this.setState({
        flagusername: 0,
      });
      document.getElementById("usernameerr").innerHTML = "Please enter your name";
    } else {
      this.setState({
        flagusername: 1,
      });
      document.getElementById("usernameerr").innerHTML = "";
      // document.getElementById("usernamehidden").innerHTML = "usersuccess";
    }
  }

  emailValidate(e) {
    this.onFieldChange(e);
    let email = document.registrationform.email.value.trim();
    let atpos = email.indexOf('@');
    let dotpos = email.lastIndexOf('.');
    if (email.length < 1) {
      this.setState({
        flagemail: 0,
      });
      document.getElementById("emailerr").innerHTML = "Please enter your email";
    } else if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
      this.setState({
        flagemail: 0,
      });
      document.getElementById("emailerr").innerHTML = "Please enter valid email";
    } else {
      this.setState({
        flagemail: 1,
      });
      document.getElementById("emailerr").innerHTML = "";
    }
  }

  mobilenumberValidate(e) {
    this.onFieldChange(e);
    let mobilenumber = document.registrationform.mobilenumber.value.trim();
    if(mobilenumber.length < 1) {
      this.setState({
        flagmobilenumber: 0,
      });
      document.getElementById("mobileerr").innerHTML = "Please enter your mobile number";
    } else if(mobilenumber.length !== 10) {
      this.setState({
        flagmobilenumber: 0,
      });
      document.getElementById("mobileerr").innerHTML = "Plaese enter valid mobile no";
    } else {
      this.setState({
        flagmobilenumber: 1,
      });
      document.getElementById("mobileerr").innerHTML = "";
    }
  }

  passwordValidate(e) {
    this.onFieldChange(e);
    let password = document.registrationform.password.value.trim();
    if(password.length < 1) {
      this.setState({
        flagpassword: 0,
      });
      document.getElementById("passworderr").innerHTML = "This field is required";
    } else {
      this.setState({
        flagpassword: 1,
      });
      document.getElementById("passworderr").innerHTML = "";
    }
    // else if(password.length<6){
    //   document.getElementById("passworderr").innerHTML=
    //   "Password must be at least 6 char long";
    // }
  }

  confirmpasswordValidate(e) {
    this.onFieldChange(e);
    let password = document.registrationform.password.value.trim();
    let cpassword = document.registrationform.confirmpassword.value.trim();
    if(cpassword.length < 1) {
      this.setState({
        flagconfirmpassword: 0,
      });
      document.getElementById("cpassworderr").innerHTML = "This field is required";
    } else if(cpassword !== password){
      this.setState({
        flagconfirmpassword: 0,
      });
      document.getElementById("cpassworderr").innerHTML="Password must be match";
    } else {
      this.setState({
        flagconfirmpassword: 1,
      });
      document.getElementById("cpassworderr").innerHTML = "";
    }
  }

  handleSubmit(e){
    e.preventDefault();
    let fu= this.state.flagusername;
    console.log('fu-----', fu);
    let fm= this.state.flagmobilenumber;
    console.log('fm-----', fm);
    let fe= this.state.flagemail;
    console.log('fe-----', fe);
    let fp= this.state.flagpassword;
    console.log('fp-----', fp);
    let fcp= this.state.flagconfirmpassword;
    console.log('fcp-----', fcp);
    if((fu && fm && fe && fp && fcp) !== 0) {
      console.log('success');
      axios.post('http://localhost:8000/register', {
        userdata: this.state,
      })
      .then(function (response) {
        console.log(response);
        browserHistory.push('/login');
      })
      .catch(function (error) {
        console.log(error);
      });
    } else {
      console.log('failure');
    }
  }



  render() {

    const errstyle = {
      color: 'red'
    };

    // console.log("this state flag---->", this.state.flag);

    console.log("from component:", this.state);
    return (
      <div className="container">
        <h2 className="clr">Join twitter Today!!</h2>
        <form name="registrationform" encType="multipart/form-data" className="form-horizontal">

          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <label htmlFor="username">Name<span style={errstyle}>*</span></label>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
              <input
                onChange={this.usernameValidate}
                value={this.state.username}
                type="text"
                id="name"
                name="username"
                placeholder="Jone Doe"
                className="form-control form-control-inline"
                required
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
                onChange={this.mobilenumberValidate}
                value={this.state.mobilenumber}
                type="number"
                name="mobilenumber"
                minLength="10"
                maxLength="10"
                placeholder="Please enter a ten digit phone number"
                className="form-control form-control-inline"
                required
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
                onChange={this.emailValidate}
                value={this.state.email}
                type="email"
                name="email"
                placeholder="foobar@inc.com"
                className="form-control form-control-inline"
                required
              />
              <span style={errstyle} id="emailerr"></span>
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
                onChange={this.passwordValidate}
                value={this.state.password}
                type="password"
                id="password"
                name="password"
                placeholder="password"
                className="form-control form-control-inline"
                required
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
                onChange={this.confirmpasswordValidate}
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

          <div className="form-group"><div className="col-sm-6 col-xs-11 col-lg-4 col-md-4"><hr /></div></div>



        </form>

        <div className="form-group">
         <div className="col-sm-6 col-xs-11 col-lg-4 col-md-4">

            <p style={{color: 'blue', fontSize: '20px', marginTop: '10px', float : 'left'}}>Already have Account! </p>

          <a href="/login">
            <button style={{marginBottom: '20px', float :"right"}} className="btn btn-info btn-lg">Log&nbsp;in</button></a>

          </div>

        </div>




      </div>

    );
  }
}

export default Register;
