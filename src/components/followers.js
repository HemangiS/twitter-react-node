import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookie';

class Followers extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',
      user_id: cookie.load('user_id')
    }

  }
  componentWillMount() {
    let user_id = this.props.params.id;
    axios.get('http://localhost:8000/followers/' + user_id)
    .then(res => {
      const data= res.data;
      console.log("-->", res.data)

      this.setState({
        data: data,
      })

    });

  }

  render(){

    let id = this.state.user_id;

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

    let username;
    let userpic = [];
    if(this.state.data.results){
       username = this.state.data.results.username;
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

    // console.log(this.state.data.users.length);
    // if(this.state.data.users == null) {console.log('null null null');} else { console.log('not null');}


    let followerItem = [];
    if(this.state.data.users) {
      for (var i = 0; i < this.state.data.users.length; i++) {
        let followinguserimgsrc = `http://localhost:8000/images/${this.state.data.users[i].image}`;
        followerItem.push(
          <div key={i} style={{paddingBottom: '25px'}} className="aligncenter col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12"><img src={followinguserimgsrc} alt="followerpic" height="140" width="140" className="img-circle" /><a href="/profile/">
              <h2 style={{fontSize: '15px'}} className="clr">{this.state.data.users[i].username}</h2></a>
            <form method="post" action="/unfollow">
              <input type="hidden" name="followerId" value={this.state.data.users[i].user_id} />
              <input style={{color : '#fff'}} type="submit" value="Unfollow" className="clr btn-sm waves-effect waves-light" />
            </form>
          </div>
        )
      }
    } else {
      followerItem.push(
        <div style={style4} className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12">
            <p>You have no followers</p>
        </div>
      )
    }

    return(
      <div className="container">

        <div className="fb-profile">

          <img align="left" src="/images/cover.jpg" alt="cover" width="100%" className="fb-image-lg"/>
          {userpic}
          <div className="fb-profile-text">
            <h1 className="clr">{username}</h1>
          </div>


          <div style={style1} className="page-canvas">
            <div className="row">

              <div className="col-sm-3">
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li><a href={yourprofile}><i className="clr glyphicon glyphicon-user"></i>   Profile</a></li>
                    <li><a href={editprofile}><i className="clr glyphicon glyphicon-pencil"></i>   Edit Profile</a></li>
                    <li><a href={welcome}><i className="clr glyphicon glyphicon-home"></i>   home</a></li>
                    <li className="active"><a href={followers}><i className="clr glyphicon glyphicon-ok"></i>   followers<span style={style} className="right clr badge">{followercount}</span></a></li>
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
