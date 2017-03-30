import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';
import Dropzone from 'react-dropzone';
import { post } from 'axios';

class EditProfile extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',
      username :'',
      email :'',
      mobilenumber:'',
      files: '',
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onOpenClick = this.onOpenClick.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.editprofileapicall = this.editprofileapicall.bind(this);

  }

  editprofileapicall() {
    let coki = cookie.load('user_id');
    if(coki) {
    axios.get(`http://localhost:8000/editprofile/${coki}`)
    .then(res => {
      const data= res.data;
      console.log("-->", res.data)
      console.log("-->", data.results.username)

      this.setState({
        data: data,
        username : data.results.username,
        email : data.results.email,
        mobilenumber: data.results.mobilenumber,
      })

    });
  }
  else {
    browserHistory.push('/');
  }
  }

  onDrop(acceptedFiles) {
    this.setState({
      files: acceptedFiles
    });
    // console.log('acceptedFiles-----',acceptedFiles);
  }

  onSubmit(e) {
    e.preventDefault();
    let acceptedFiles = this.state.files;
    // console.log('files-----',this.state.files);
    let photo = new FormData();
    photo.append('photo', acceptedFiles[0]);
    const config = {
      headers: { 'content-type': 'multipart/form-data' }
    }
    const url = `http://localhost:8000/profilepictureupload/${cookie.load('user_id')}`;
    post(url, photo, config)
    .then(function(response) {
      console.log('response-->', response);
      browserHistory.push(`/welcome/${cookie.load('user_id')}`);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onOpenClick () {
    this.dropzone.open();
  }

  componentWillMount() {
    this.editprofileapicall();
  }

  handleSubmit(e){
    e.preventDefault();
    axios.post(`http://localhost:8000/editprofile/${cookie.load('user_id')}`, {
      userdata: this.state,
      user_id: cookie.load('user_id'),
    })
    .then(function (response) {
      console.log('Response message---->',response);
      browserHistory.push(`/welcome/${cookie.load('user_id')}`);
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

    let userpic = [];
    if(this.state.data.results){
       let username = this.state.data.results.username;
       let loginuserimgsrc = `http://localhost:8000/images/${this.state.data.results.image}`;

       userpic.push(
          <div key={this.state.files.length}>
            <Dropzone style={{width:'200px', height:'200px'}} multiple={false} accept={'image/*'} ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop}>
                {this.state.files.length > 0 ? <div>
            <div>{this.state.files.map((file) => <img style={{width:'200px', height:'200px'}} className="thumbnail" src={file.preview} /> )}</div>
            </div> : <img style={{width:'200px', height:'200px'}} key={this.state.data.results.image.length} src={loginuserimgsrc} alt="userpic" className="thumbnail" />}
            </Dropzone>
            <p></p>
            <button className="btn btn-sm waves-effect waves-light" type="button" onClick={this.onOpenClick}>
                Select Picture
            </button>&nbsp;

            <a onClick={this.onSubmit} className="clrbtn btn-info btn btn-sm waves-effect waves-light">Set New Photo</a>

          </div>
          // <img style={{width:'200px', height:'200px'}} key={this.state.data.results.image.length} src={loginuserimgsrc} alt="userpic" height="200px" width="200px" className="thumbnail" />
       )
       let email = this.state.data.results.email;
       let mobilenumber = this.state.data.results.mobilenumber;
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
                  <div className="col-md-4">{userpic}</div>
                  <div className="col-md-8">
                    <form method="post" action="/editprofile" className="form-horizontal">
                      <div className="form-content"></div>
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
