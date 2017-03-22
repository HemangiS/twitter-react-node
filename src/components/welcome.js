import React, { Component } from 'react';
import axios from 'axios';
// import { browserHistory } from 'react-router';

class Welcome extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',

    }

  }
  componentWillMount() {
    let user_id = this.props.params.id;
    axios.get('http://localhost:8000/welcome/' + user_id)
    .then(res => {
      const data= res.data;
      console.log("-->", res.data)

      this.setState({
        data: data,
      })

    });

  }

  render(){

    let username;
    let userpic = [];
    if(this.state.data.results){
       username = this.state.data.results.username;
       userpic.push(
          <img src={require('../../public/images/'+this.state.data.results.image)} alt="" height="200px" width="200px" className="img-circle img-responsive" />
       )
    }

    let followercount;
    if(this.state.data.count){
      followercount = this.state.data.count;
    }

    let tweetItem = [];
    if(this.state.data.tweets) {
      for (var i = 0; i < this.state.data.tweets.length; i++) {
        var a = this.state.data.tweets[i].time;
        if(this.state.data.tweets[i].imagetweet) {
          tweetItem.push(
            <div key={i} className="row">
              <div className="media">
                <div className="media-left">
                  <a href="#">
                    <img className="media-object" src={require('../../public/images/'+this.state.data.tweets[i].image)} alt="Person" />
                  </a>
                </div>
                <div className="media-body">
                  <h4 className="media-heading">{this.state.data.tweets[i].username}</h4>
                  {this.state.data.tweets[i].tweet}<img src={require('../../public/images/'+this.state.data.tweets[i].imagetweet)} alt='tweetimage' height="400px" width="400px" className="img-responsive media-object update-card-MDimentions" />
                </div>
              </div>

            </div>
          )
        } else {
          tweetItem.push(
            <div key={i} className="row">
              <div style={{padding:'5px'}} className="page-canvas">
                <div className="chip"><img src={require('../../public/images/'+this.state.data.tweets[i].image)} alt="Person" /><a href="/pro" className="clr media-heading">{this.state.data.tweets[i].username}</a></div><font className='clr'>time</font>
                <div style={{paddingLeft: '20%'}} className="media-body update-card-body">
                  {this.state.data.tweets[i].tweet}
                </div>
              </div>
            </div>
          )
        }
      }
    }

    // let users = [];
    // if(this.state.data.follow) {
    //   for (var j = 0; j < this.state.data.follow.length; i++) {
    //     users.push(
    //       <div key={j} className="row">
    //         <hr />
    //         <div className="media block-update-card"><img src={require('../../public/images/cd3c903a5a7d738980ef8961f408b8aa')} alt='followerpic' height="140" width="140" className="img-circle img-responsive" />
    //           <h6 className="clr">{this.state.data.follow[j].username}</h6>
    //           <form method="post" action="/follower">
    //             <input type="hidden" name="followerId" value={this.state.data.follow[j].user_id} />
    //             <input style={{color:'#fff'}} type="submit" value="Follow" className="clr btn-sm waves-effect waves-light" />
    //           </form>
    //         </div>
    //       </div>
    //     )
    //   }
    // }

    console.log("username:", username)

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
                <li><a href="/yourprofile"><i className="clr glyphicon glyphicon-user"></i>   Profile</a></li>
                <li className="active"><a href="/welcome"><i className="clr glyphicon glyphicon-home"></i>   home</a></li>
                <li><a href="/followers"><i className="clr glyphicon glyphicon-ok"></i>   followers<span style={style} className="clr badge">{followercount}</span></a></li>
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
                    <form action="/tweet" encType="multipart/form-data" method="post">
                      <textarea name="tweet" placeholder="What are you doing right now?" maxLength="140" required></textarea>
                      <div className="form-group">
                        <div className="col-sm-5">
                          <input style={style2} type="submit" value="Tweet" name="Tweet" className="clr btn-sm waves-effect waves-light" />
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

            <div className="row">
              <p></p>
            </div>

            {tweetItem}

          </div>
        </div>

        <div className="col-sm-3">
          <div className="profile-content">
            <div className="sidebar-menu">
              <p className="clr"><i className="glyphicon glyphicon-user">&nbsp;</i>People you may know</p>

            </div>
          </div>
        </div>

      </div>
    );
}
}

export default Welcome;


