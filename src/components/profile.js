import React, { Component } from 'react';

class Profile extends Component {

  render(){

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
                    <li className="active"><a href="/profile/"><i className="glyphicon glyphicon-user clr">Profile</i></a></li>
                  </ul>
                  <ul className="nav">
                    <li>
                      <h6 className="clr"><i className="material-icons">info</i>    Details</h6>
                    </li>
                    <li><i className="material-icons clr">perm_identity&nbsp;profile.username</i></li>
                    <li><i className="material-icons clr">email&nbsp;profile.email</i></li>
                    <li><i className="material-icons clr">phone&nbsp;profile.mobilenumber</i></li>
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
                          <p>row.tweet</p><img src="/images/" alt="tweetimage" height="400px" width="400px" className="img-responsive media-object update-card-MDimentions" />
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

export default Profile;
