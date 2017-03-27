import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',
      username :'',
      email :'',
      mobilenumber:'',

      // password:'',

    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }
  componentWillMount() {
    let user_id = this.props.params.id;
    axios.get('http://localhost:8000/editprofile/' + user_id)
    .then(res => {
      const data= res.data;
      console.log("-->", res.data)
      console.log("-->", data.results.username)

      this.setState({
        data: data,
        username : data.results.username,
        email : data.results.email,
        mobilenumber: data.results.mobilenumber,
        // password: data.results.password,
      })

    });

  }

  handleSubmit(e){
    e.preventDefault();
    axios.post(`http://localhost:8000/editprofile/${cookie.load('user_id')}`, {
      userdata: this.state,
      user_id: this.state.user_id,
    })
    .then(function (response) {
      console.log(response);
      browserHistory.push(`/welcome/${cookie.load('user_id')}`)
    })
    .catch(function (error) {
      console.log(error);
    });



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

  render () {
    const style1 = {
      textAlign : 'center'
    };
    const style2 = {
      margin : '20px 20px 20px 0px'
    };
    const style3 = {
      margin : '-5px 0px 10px 0px'
    };

    let username;
    let email;
    let mobilenumber;
    let userpic = [];
    if(this.state.data.results){
       username = this.state.data.results.username;
       let loginuserimgsrc = `http://localhost:8000/images/${this.state.data.results.image}`;
       userpic.push(
          <img style={{width:'200px', height:'200px'}} key={this.state.data.results.image.length} src={loginuserimgsrc} alt="userpic" height="200px" width="200px" className="thumbnail" />
       )
       email = this.state.data.results.email;
       mobilenumber = this.state.data.results.mobilenumber;
    }

    return (
      <div>
        <div className="page-canvas">

          <div className="signin-wrapper">
            <div className="row">
              <div style={style1} className="col-md-12">
                <h3 className='clr'>Edit your profile here !!!</h3>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="form-horizontal">
              <div className="signin-wrapper">
                <div style={style2} className="row">
                  <div className="col-md-4">{userpic}
                    <form method="post" enctype="multipart/form-data" action="/profilepictureupload">
                      <input type="file" name="thumbnail" className='clr' style={style3} required />
                      <input type="submit" name="submit" className="btn btn-info" />
                    </form>
                  </div>
                  <div className="col-md-8">
                    <form method="post" action="/editprofile" className="form-horizontal">
                      <div text-align="center" className="form-content"></div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <input
                            onChange={this.onFieldChange}
                            value={this.state.username}
                            type="text"
                            name="username"
                            required
                            className="form-control form-control-inline"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <input
                            onChange={this.onFieldChange}
                            value={this.state.mobilenumber}
                            type="number"
                            name="mobileno"
                            required
                            className="form-control form-control-inline"
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <input
                            onChange={this.onFieldChange}
                            value={this.state.email}
                            type="text"
                            name="email"
                            required
                            className="form-control form-control-inline" />
                        </div>
                      </div>

                      <div className="form-group">
                        <div className="col-sm-8">
                          <input type="password" name="confirmpassword" placeholder="new password" className="form-control form-control-inline" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <input type="submit" value="change profile" className="btn btn-info" onClick={this.handleSubmit}/>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default EditProfile;
