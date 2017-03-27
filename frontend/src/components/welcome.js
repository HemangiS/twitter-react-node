import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',
      tweet: '',

    }
    this.onFieldChange = this.onFieldChange.bind(this);
    this.tweetSubmit = this.tweetSubmit.bind(this);
  }
  componentWillMount() {

    var coki =  cookie.load('user_id');
    if(coki) {
    } else {
      browserHistory.push("/");
    }

    axios.get(`http://localhost:8000/welcome/${cookie.load('user_id')}`)
      .then(res => {
        const data= res.data;
        console.log("-->", res.data)

        this.setState({
          data: data,
        })

      });

  }

  tweetSubmit(e) {
    e.preventDefault();
    // let user_id = this.props.params.id;
    axios.post(`http://localhost:8000/tweet/${cookie.load('user_id')}`, {
      userdata: this.state,
    })
    .then(function (response) {
      // console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    window.location.href = `/welcome/${cookie.load('user_id')}`;
  }

  onFieldChange(event){

    this.setState({
      [event.target.name]: event.target.value
    });
    console.log("state---->", this.state, name);

  }

  render(){

    let id = cookie.load('user_id');

    let welcome = `/welcome/${id}`;
    let yourprofile = `/yourprofile/${id}`;
    let followers = `/followers/${id}`;
    let editprofile = `/editprofile/${id}`;

    console.log("[[[[[",this.state.data);

    let username;
    let userpic = [];
    if(this.state.data.results){
       username = this.state.data.results.username;
       let loginuserimgsrc = `http://localhost:8000/images/${this.state.data.results.image}`;
       userpic.push(
          <img key={this.state.data.results.image.length} src={loginuserimgsrc} alt="userpic" height="200px" width="200px" className="img-circle img-responsive" />
       )
    }

    let followercount = this.state.data.count;;

    let tweetItem = [];
    if(this.state.data.tweets) {
      for (var i = 0; i < this.state.data.tweets.length; i++) {
        var a = this.state.data.tweets[i].time;
        let t = new Date(a);
        var tweettime = t.getDate() + "/" + (t.getMonth() + 1) +"/"+ t.getFullYear() + ' ' + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
        console.log(tweettime)
        // let tf = `${t}.getDate()&nbsp;`;
        let tweetuserimgsrc = `http://localhost:8000/images/${this.state.data.tweets[i].image}`;
        let tweetimg = '';
        if(this.state.data.tweets[i].imagetweet) {
          tweetimg = `http://localhost:8000/images/${this.state.data.tweets[i].imagetweet}`;
          tweetItem.push(
            <div key={i} className="row">
              <p></p>
              <div style={{padding:'5px'}} className="page-canvas">
                <div><img className="chip img-circle" src={tweetuserimgsrc} alt="Person" />&nbsp;&nbsp;<font className='clr'>{this.state.data.tweets[i].username}<div className='right'>{tweettime}</div></font></div>
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
              <div style={{padding:'5px'}} className="page-canvas">
                <div><img  className="chip img-circle" src={tweetuserimgsrc} alt="Person" />&nbsp;&nbsp;<font className='clr'>{this.state.data.tweets[i].username}<div className='right clr'>{tweettime}</div></font></div>
                <div style={{paddingLeft: '20%'}} className="media-body update-card-body">
                  {this.state.data.tweets[i].tweet}
                </div>
              </div>
            </div>
          )
        }
      }
    }

    let users = [];
    if(this.state.data.follow) {

      for (var j = 0; j < this.state.data.follow.length; j++) {
        console.log('------>',this.state.data.follow[j].user_id);
        let followerId = this.state.data.follow[j].user_id;
        let followsrc = `/follow/${followerId}`;
        let followuserimgsrc = `http://localhost:8000/images/${this.state.data.follow[j].image}`;
        users.push(
          <div key={j} className="row">
            <hr />
            <div className="aligncenter media block-update-card"><img src={followuserimgsrc} alt='followerpic' height="140" width="140" className="img-circle img-responsive" />
              <h6 className="clr">{this.state.data.follow[j].username}</h6>
              <form>
                <input type="hidden" name="followerId" value={followerId} />
                <a href={followsrc} className="clr btn btn-sm waves-effect waves-light">Follow</a>
              </form>
            </div>
          </div>
        )
      }
    }

    const style = {
      color:'#fff',
      fontSize : '15px'
    };
    const style2 = {
      color:'#fff'
    };
    const style3 = {
      padding:'5px'
    };

    return(
      <div className="container">

        <div className="col-sm-3">
          <div style={style3} className="page-canvas">
            <div className="profile-sidebar">
              <div className="profile-userpic">{userpic}</div>
              <div className="profile-usertitle">
                <div className="clr profile-usertitle-name">{username}</div>
              </div>
            </div>
            <div className="profile-usermenu">
              <ul className="nav">
                <li className="active"><a href={welcome}><i className="clr glyphicon glyphicon-home"></i>   home</a></li>
                <li><a href={yourprofile}><i className="clr glyphicon glyphicon-user"></i>   Profile</a></li>
                <li><a href={editprofile}><i className="clr glyphicon glyphicon-pencil"></i>   Edit Profile</a></li>
                <li><a href={followers}><i className="clr glyphicon glyphicon-ok"></i>   followers<span style={style} className="right clr badge">{followercount}</span></a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="profile-content">

            <div className="row">
              <p className='clr'><i className="glyphicon glyphicon-pencil">&nbsp;</i>What's in your mind ??</p>
            </div>

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
                            className="clr btn-sm waves-effect waves-light" />
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


            <div className='row tweetsinwelcome'>
            {tweetItem}
            </div>

          </div>
        </div>

        <div className="col-sm-3">
          <div className="profile-content">
            <div className="sidebar-menu">
              <p className="clr"><i className="glyphicon glyphicon-user">&nbsp;</i>People you may know</p>
              {users}
            </div>
          </div>
        </div>

      </div>
    );
}
}

export default Welcome;


