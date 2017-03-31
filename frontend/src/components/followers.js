import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';

class Followers extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',

    }
    this.unfollowSubmit = this.unfollowSubmit.bind(this);
    this.followersapicall = this.followersapicall.bind(this);
  }

  followersapicall() {
    // let user_id = this.props.params.id;
    axios.get(`http://localhost:8000/followers/${cookie.load('user_id')}`)
    .then(res => {
      const data= res.data;
      console.log("-->", res.data)

      this.setState({
        data: data,
      })

    });
  }
  componentWillMount() {
    this.followersapicall();
  }

  unfollowSubmit(id) {

    let self = this;
    console.log('id----->', id);
    axios.post(`http://localhost:8000/unfollow`, {
      followerId: id,
    })
    .then(res => {
      console.log("+++++++", res);
      self.followersapicall();
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render(){

    let id = cookie.load('user_id');

    let welcome = `/welcome/${id}`;
    let yourprofile = `/yourprofile/${id}`;
    let followers = `/followers/${id}`;
    let editprofile = `/editprofile/${id}`;

    const style = {
      color:'#fff',
      fontSize : '15px'
    };
    const style1 = {
      padding :'5px'
    };

    const style4 = {
      paddingBottom: '25px'
    };

    let username = '';
    let email = '';
    let phone = '';
    let userpic = [];
    if(this.state.data.results){
       username = this.state.data.results.username;
       email = this.state.data.results.email;
       phone = this.state.data.results.mobilenumber;
       let loginuserimgsrc = `http://localhost:8000/images/${this.state.data.results.image}`;
       userpic.push(
          <img style={{align:'left'}} key={this.state.data.results.image.length} src={loginuserimgsrc} alt="userpic" height="200px" width="200px" className="thumbnail img-responsive" />
       )
    }

    let followercount;
    if(this.state.data.count){
      followercount = this.state.data.count;
    } else {
      followercount = 0;
    }

    let tweetcount = 0;
    if(this.state.data.tweets) {
      tweetcount = this.state.data.tweets.length;
    }
    // console.log(this.state.data.users.length);
    // if(this.state.data.users == null) {console.log('null null null');} else { console.log('not null');}


    let followerItem = [];
    if(followercount !== 0) {
      for (var i = 0; i < this.state.data.users.length; i++) {
        let followerId = this.state.data.users[i].user_id;
        // let unfollowsrc = `/unfollow/${followerId}`;
        let followinguserimgsrc = `http://localhost:8000/images/${this.state.data.users[i].image}`;
        followerItem.push(
          <div key={i} style={{paddingBottom: '25px'}} className="aligncenter col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12"><img src={followinguserimgsrc} alt="followerpic" height="140" width="140" className="img-circle" /><a href="/profile/">
              <h2 style={{fontSize: '15px'}} className="clr">{this.state.data.users[i].username}</h2></a>


              <input
                onClick={ (e) => {
                  this.unfollowSubmit(followerId);
                  e.preventDefault();
                }}
              type='submit' value='UnFollow' className="clrbtn btn-info btn btn-sm waves-effect waves-light" />


          </div>
        )
      }
    } else {
      followerItem.push(
        <div key={followercount} style={style4} className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12">
            <p></p>
            <p></p>
            <p>You have no followers</p>
        </div>
      )
    }

    return(
      <div className="container">

        <div className="navbar navbar-default container-fluid mynav">

          <img src="/images/cover.jpg" alt="cover" width="100%" className="fb-image-lg"/>

          <div>

            <div className='fb-image-profile'>

              {userpic}

            </div>

            <div className='myprofilenav'>

              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>

              <ul className="myul collapse navbar-collapse nav navbar-nav navbar-right" id="bs-example-navbar-collapse-2">

                <li>
                  <Link to={yourprofile}>

                      &nbsp;Tweets&nbsp;<span className="badge">{tweetcount}</span>

                  </Link>
                </li>

                <li>
                  <Link to={followers} className='myactive'>

                      &nbsp;Followers&nbsp;<span className="badge">{followercount}</span>

                  </Link>
                </li>

                <li className='usernamestyle1'>

                      <span className="usernamestyle">{username}</span>

                </li>

              </ul>

            </div>

          </div>

          <p></p>

          <div style={style1} className="page-canvas">
            <div className="row">

              <div className="col-sm-3">
                <div className="profile-usermenu">
                  <ul className="nav nav1">
                    <li><i className="clr glyphicon glyphicon-user"></i>   {username}</li>
                    <li><i className="clr glyphicon glyphicon-envelope"></i>   {email}</li>
                    <li><i className="clr glyphicon glyphicon-phone"></i>   {phone}</li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-9">
                <div className="profile-content">
                  <div className="sidebar-menu">
                    <h4 className='clr'>Your followers!!!!</h4>
                    <div className="row">
                      <div className="col-sm-12">
                        {followerItem}
                      </div>
                    </div>
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

export default Followers;
