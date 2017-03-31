import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class Login extends Component {

  constructor(props) {
    super(props);
    this.state={
      email :'',
      password:'',
      errors: {},
      user_id: '',
    };
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    axios.post('http://localhost:8000/login', {
      userdata: this.state,
    })
    .then(function (response) {
      console.log('response--->',response);

      // alert(response);
      // return false;
      if (response.data) {
        let user_id = response.data.user_id;
        cookie.save('user_id', user_id, {path: '/'});
         // return false;
        browserHistory.push(`/welcome/${cookie.load('user_id')}`)
      } else {
        browserHistory.push("/login")
      }
    })
    .catch(function (error) {
      console.log(error);
    });

    e.preventDefault();
  }

  onFieldChange(event){
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });
    console.log("state---->", this.state, name);

  }

  render(){
    console.log("from component:", this.state);
    return(
      <div className="container">
        <form action="/login" method="post" className="form-horizontal">
          <div className="signin-wrapper">
            <div className="form-group">
              <div className="col-sm-7 col-xs-10 col-lg-3 col-md-4">
                <h2 className="clr">Log in to Twitter</h2>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-7 col-xs-8 col-lg-3 col-md-4">
                <label htmlFor="email">Email</label>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
                <input
                  onChange={this.onFieldChange}
                  value={this.state.email}
                  id="inputEmail3"
                  type="text"
                  name="email"
                  placeholder="foobar@inc.com"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-7 col-xs-8 col-lg-3 col-md-4">
                <label htmlFor="password">Password</label>
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">
                <input
                  onChange={this.onFieldChange}
                  value={this.state.password}
                  id="inputPassword3"
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                />
              </div>
            </div>
            <div className="form-group">
              <div className="col-sm-7 col-xs-10 col-lg-3 col-md-4">
                <div className="regcheck">
                <form action="/retrive_password" method="post">
                <input className="formcheckbox" type="checkbox" name="agreement" />&nbsp;Remember me&nbsp;<span className="separator">&middot;&nbsp;</span>
                  <a type="submit" className="clr button">Forgot password?</a></form>
                  </div>


              </div>
            </div>

            <div className="form-group">
              <div className="col-sm-6 col-xs-10 col-lg-4 col-md-4">

                <input type="submit" name="Submit" value="Log In" className="submit form-control button btn-info"
                  onClick={this.handleSubmit}/>
              </div>


            </div>

            <div className="form-group"><div className="col-sm-6 col-xs-12 col-lg-4 col-md-4"><hr /></div></div>



          </div>
        </form>

        <div className="form-group">
          <div className="col-sm-6 col-xs-12 col-lg-4 col-md-4">
            <p style={{color: 'blue', fontSize: '20px', marginTop: '10px', float : 'left'}}>Don't yet registered! </p>

         <a href="/register">
            <button style={{marginBottom: '20px', float :"right"}} className="btn btn-info btn-lg">Sign&nbsp;Up</button></a>
          </div>

        </div>


      </div>
    );
  }
}

export default Login;
