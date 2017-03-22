import React, { Component } from 'react';

class YourProfile extends Component {

  render(){

    const style = {
      color:'#fff',
      fontSize : '15px'
    };
    const style1 = {
      padding :'5px'
    };
    const style2 = {
      color : '#A9A9A9'
    };
    const style3 = {
      paddingLeft: '20%'
    };

    return(
      <div className="container">

        <div className="fb-profile">

          <img align="left" src="/images/cover.jpg" alt="cover" width="100%" className="fb-image-lg"/>
          <img align="left" src="/images/" alt="profilepic" className="fb-image-profile thumbnail"/>
          <div className="fb-profile-text">
            <h1 className="clr">profile.username</h1>
          </div>


          <div style={style1} className="page-canvas">
            <div className="row">

              <div className="col-sm-3">
                <div className="profile-usermenu">
                  <ul className="nav">
                    <li className="active"><a href="/yourprofile"><i className="clr glyphicon glyphicon-user"></i>   Profile</a></li>
                    <li><a href="/editprofile"><i className="clr glyphicon glyphicon-pencil"></i>   Edit Profile</a></li>
                    <li><a href="/welcome"><i className="clr glyphicon glyphicon-home"></i>   home</a></li>
                    <li><a href="/followers"><i className="clr glyphicon glyphicon-ok"></i>   followers<span style={style} className="clr badge">count</span></a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-6">
                <div className="profile-content">
                  <div className="row">
                    <h5 className="clr">profile.username+'\'s tweets are here !!!!'</h5>
                      <div style={style1} className="media block-update-card page-canvas">
                        <div className="chip">
                          <img src="/images/" alt="Person" />
                          <a href="/profile/" className="media-heading clr">row.username</a>
                        </div>
                        <font style={style2}>time</font>
                        <div style={style3} className="media-body update-card-body">
                          <p>row.tweet</p><img src="/images/" alt='imagetweet' height="400px" width="400px" className="img-responsive media-object update-card-MDimentions" />
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

export default YourProfile;
