import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { Link } from 'react-router';
// import { browserHistory } from 'react-router';

// const Trash = ({onClick}) => {
//   return (
//     <a name="deletetweetid" onClick={onClick}>
//         <span className="clr glyphicon glyphicon-trash"></span>
//     </a>
//   );
// };

class YourProfile extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',

    }
     // this.unfollowClick = this.unfollowClick.bind(this);
  }
  componentWillMount() {
    // let user_id = this.props.params.id;
    axios.get(`http://localhost:8000/yourprofile/${cookie.load('user_id')}`)
    .then(res => {
      const data= res.data;
      console.log("-->", res.data)

      this.setState({
        data: data,
        // user_id: this.state.user_id
      })

    });

  }

  // componentWillReceiveProps() {
  //   let deletetweetid = this.props.params.id;
  //   axios.get(`http://localhost:8000/deletetweet/${deletetweetid}`)
  //   .then(res => {
  //     const data= res.data;
  //     console.log("-->", res.data)

  //     this.setState({
  //       data: data,
  //     })
  //     // browserHistory.push(`/yourprofile/${this.state.user_id}`);
  //   });
  // }

  // unfollowClick(followerId) {

  //   axios.post('http://localhost:8000/unfollow', {
  //     data: this.state,
  //     user_id: this.state.user_id,
  //     followerId: followerId,
  //   })
  //   .then(function (response) {
  //     // alert("abcd");
  //     // console.log(response);
  //     // if (response.data.user_id) {
  //       // cookie.save('user_id', response.data.user_id);

  //     // } else {
  //     //   browserHistory.push("/welcome/" + response.data.user_id)
  //     // }
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  //    browserHistory.push("/welcome/" + this.state.user_id)
  //   // browserHistory.push('/welcome');
  // }


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
          <img style={{align:'left'}} key={this.state.data.results.image.length} src={loginuserimgsrc} alt="userpic" height="200px" width="200px" className="fb-image-profile thumbnail img-responsive" />
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
        let deletetweet = `/deletetweet/${deletetweetid}`;
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


                      <a href={deletetweet} name="deletetweetid">
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

                    <a href={deletetweet} name="deletetweetid">
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
        let unfollowsrc = `/unfollow/${followerId}`;
        let followinguserimgsrc = `http://localhost:8000/images/${this.state.data.users[j].image}`;
        following.push(
          <div key={j} className="row">
            <p></p>
            <div className="aligncenter media block-update-card"><img src={followinguserimgsrc} alt='followerpic' height="140" width="140" className="img-circle img-responsive" />
              <h6 className="clr">{this.state.data.users[j].username}</h6>
              <form method="post" action="/follower">
                <input type="hidden" name="followerId" value={followerId} />
                <a href={unfollowsrc} className="clrbtn btn btn-info btn-sm waves-effect waves-light">UnFollow</a>

              </form>
            </div>
          </div>
        )
      }
    }

    return(
      <div className="container">

        <div className="navbar navbar-default container-fluid mynav">


          <img src="/images/cover.jpg" alt="cover" width="100%" className="fb-image-lg"/>



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

              <li>
                <Link to={welcome} className='usernamestyle'>

                    Welcome&nbsp;{username}

                </Link>
              </li>

            </ul>



          {userpic}

          <p></p>
          <div style={style1} className="row page-canvas">

              <div className="col-sm-3 col-xs-4">
                <div className="profile-usermenu">
                  <ul className="nav nav1">
                    <li><i className="clr glyphicon glyphicon-user"></i>   {username}</li>
                    <li><i className="clr glyphicon glyphicon-envelope"></i>   {email}</li>
                    <li><i className="clr glyphicon glyphicon-phone"></i>   {phone}</li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-6 col-xs-7">
                <div className="profile-content">
                    <h5 className="clr">{username}'s tweets are here !!!!</h5>
                    <div className="row tweetsinyourprofile">
                      {tweetItem}
                    </div>
                </div>
              </div>

              <div className="col-sm-3 col-xs-4">
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
