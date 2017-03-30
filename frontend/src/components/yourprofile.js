import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';

class YourProfile extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',
      tweet: '',
    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.yourprofileapicall = this.yourprofileapicall.bind(this);
    this.unfollowSubmit = this.unfollowSubmit.bind(this);
    this.tweetSubmit = this.tweetSubmit.bind(this);
    this.tweetDelete = this.tweetDelete.bind(this);
  }

  onFieldChange(event){

    this.setState({
      [event.target.name]: event.target.value
    });

  }

  yourprofileapicall() {
    axios.get(`http://localhost:8000/yourprofile/${cookie.load('user_id')}`)
    .then(res => {
      const data= res.data;
      this.setState({
        data: data,
      })

    });
  }
  componentWillMount() {
    this.yourprofileapicall();
  }

  unfollowSubmit(id) {

    let self = this;
    console.log('unfollowid----->', id);
    axios.post(`http://localhost:8000/unfollow`, {
      followerId: id,
    })
    .then(res => {
      console.log("+++++++", res);
      self.yourprofileapicall();
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  tweetSubmit(e) {
    let self = this;
    console.log("eeeeeee");
    axios.post(`http://localhost:8000/tweet`, {
      userdata: this.state,
      user_id: cookie.load('user_id'),
    })
    .then(function (response) {
      console.log("+++++++", response);
      self.yourprofileapicall();
      self.setState({
        tweet: '',
      })
    })
    .catch(function (error) {
      console.log(error);
    });
    // this.welcomeapicall();
     e.preventDefault();
  }

  tweetDelete(id) {
    let self = this;
    console.log('deletetweetid----->', id);
    let deletetweetid = id;
    axios.get(`http://localhost:8000/deletetweet/${deletetweetid}`)
    .then(res => {
      const data= res.data;
      console.log("+++++++", res);
      self.yourprofileapicall();
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
    const style2 = {
      color:'#fff'
    };


    let username;
    let email;
    let phone;
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

    let tweetItem = [];
    if(this.state.data.tweets) {
      for (var i = 0; i < this.state.data.tweets.length; i++) {
        var a = this.state.data.tweets[i].time;
        let t = new Date(a);
        var tweettime = t.getDate() + "/" + (t.getMonth() + 1) +"/"+ t.getFullYear() + ' ' + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
        console.log(tweettime);
        let tweetuserimgsrc = `http://localhost:8000/images/${this.state.data.tweets[i].image}`;
        let tweetimg = '';
        // let profilesrc = `/profile/${this.state.data.tweets[i].user_id}`;
        let deletetweetid = this.state.data.tweets[i].id;
        // let deletetweet = `/deletetweet/${deletetweetid}`;
        if(this.state.data.tweets[i].imagetweet) {
          tweetimg = `http://localhost:8000/images/${this.state.data.tweets[i].imagetweet}`;
          tweetItem.push(
            <div key={i} className="row">
              <p></p>
              <div style={style1} className="page-canvas">
                <div>

                    <img className="chip img-circle" src={tweetuserimgsrc} alt="Person" />&nbsp;&nbsp;
                    <font className="clr media-heading">{this.state.data.tweets[i].username}</font>
                    <div className='right clr'>{tweettime}&nbsp;&nbsp;

                      <a href=''
                        onClick={ (e) => {
                          this.tweetDelete(deletetweetid);
                          e.preventDefault();
                        }}
                        name="deletetweetid">
                        <span className="clr glyphicon glyphicon-trash"></span>
                      </a>

                    </div>

                </div>

                <div style={{paddingLeft: '20%'}} className="media-body update-card-body">
                  {this.state.data.tweets[i].tweet}<img src={tweetimg} alt='tweetimage' height="400px" width="400px" className="img-responsive media-object update-card-MDimentions" />
                </div>
              </div>
            </div>
          )
        } else {
          tweetItem.push(
            <div key={i} className="row">
              <p></p>
              <div style={style1} className="page-canvas">
                <div>
                    <img  className="chip img-circle" src={tweetuserimgsrc} alt="Person" />&nbsp;&nbsp;
                    <font className="clr media-heading">{this.state.data.tweets[i].username}</font>
                    <div className='right clr'>{tweettime}&nbsp;&nbsp;

                      <a href=''
                        onClick={ (e) => {
                          this.tweetDelete(deletetweetid);
                          e.preventDefault();
                        }}
                       name="deletetweetid">
                        <span className="clr glyphicon glyphicon-trash"></span>
                      </a>

                    </div>

                </div>
                <div style={{paddingLeft: '20%'}} className="media-body update-card-body">
                  {this.state.data.tweets[i].tweet}
                </div>
              </div>
            </div>
          )
        }
      }
    }

    let following = [];
    if(this.state.data.users) {
      for (var j = 0; j < this.state.data.users.length; j++) {
        let followerId = this.state.data.users[j].user_id;
        // let unfollowsrc = `/unfollow/${followerId}`;
        let followinguserimgsrc = `http://localhost:8000/images/${this.state.data.users[j].image}`;
        following.push(
          <div key={j} className="row">
            <p></p>
            <div className="aligncenter media block-update-card"><img src={followinguserimgsrc} alt='followerpic' height="140" width="140" className="img-circle img-responsive" />
              <h6 className="clr">{this.state.data.users[j].username}</h6>
              <input
                onClick={ (e) => {
                  this.unfollowSubmit(followerId);
                  e.preventDefault();
                }}
              type='submit' value='UnFollow' className="clrbtn btn-info btn btn-sm waves-effect waves-light" />
            </div>
          </div>
        )
      }
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
                  <Link to={yourprofile} className='myactive'>

                      &nbsp;Tweets&nbsp;<span className="badge">{tweetcount}</span>

                  </Link>
                </li>

                <li>
                  <Link to={followers}>

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

          <div style={style1} className="row page-canvas">

              <div className="col-sm-3 col-xs-12 col-md-3">
                <div className="profile-usermenu">
                  <ul className="nav nav1">
                    <li><i className="clr glyphicon glyphicon-user"></i>   {username}</li>
                    <li><i className="clr glyphicon glyphicon-envelope"></i>   {email}</li>
                    <li><i className="clr glyphicon glyphicon-phone"></i>   {phone}</li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-6 col-xs-12 col-md-6">
                <div className="profile-content">
                    <h5 className="clr">{username}'s tweets are here !!!!</h5>

                    <div className="row">
                      <div className="no-padding blank">
                        <div className="status-upload">
                          <div className="page-canvas">
                            <form encType="multipart/form-data" >
                              <textarea
                                onChange={this.onFieldChange}
                                value={this.state.tweet}
                                name="tweet"
                                placeholder="What are you doing right now?"
                                maxLength="140" required></textarea>
                              <div className="form-group">
                                <div className="col-sm-5">
                                  <input
                                    onClick={this.tweetSubmit}
                                    style={style2}
                                    type="submit"
                                    value="Tweet"
                                    name="Tweet"
                                    className="clrbtn btn-info btn btn-sm waves-effect waves-light" />
                                </div>
                                <div className="col-sm-7">
                                  <input type="file" name="imagetweet" className="btn-sm waves-effect waves-light" />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row tweetsinyourprofile">
                      {tweetItem}
                    </div>
                </div>
              </div>

              <div className="col-sm-3 col-xs-12 col-md-3">
                <div className="profile-content">
                  <div className="sidebar-menu">
                    <h5 className="clr"><i className="clr glyphicon glyphicon-user"></i> Your followers!!!!</h5>
                    {following}
                  </div>
                </div>
              </div>

          </div>

        </div>

      </div>
    );
  }
}

export default YourProfile;
