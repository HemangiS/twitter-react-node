import React, { Component } from 'react';

class Followers extends Component {

  render(){

    const style = {
      color:'#fff',
      fontSize : '15px'
    };
    const style1 = {
      padding :'5px'
    };
    const style2 = {
      color : '#fff'
    };
    const style3 = {
      fontSize: '15px'
    };
    const style4 = {
      paddingBottom: '25px'
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
                    <li><a href="/yourprofile"><i className="clr glyphicon glyphicon-user"></i>   Profile</a></li>
                    <li><a href="/editprofile"><i className="clr glyphicon glyphicon-pencil"></i>   Edit Profile</a></li>
                    <li><a href="/welcome"><i className="clr glyphicon glyphicon-home"></i>   home</a></li>
                    <li className="active"><a href="/followers"><i className="clr glyphicon glyphicon-ok"></i>   followers<span style={style} className="clr badge">count</span></a></li>
                  </ul>
                </div>
              </div>

              <div className="col-sm-9">
                <div className="profile-content">
                  <div className="sidebar-menu">
                    <h4 className='clr'>Your followers!!!!</h4>
                    <div className="row">
                      <div className="col-sm-12">
                        <div align="center" style={style4} className="col-xl-2 col-lg-3 col-md-6 col-sm-6 col-12"><img src="./images/" alt="followerpic" height="140" width="140" className="img-circle" /><a href="/profile/">
                            <h2 style={style3} className="clr">rows.username</h2></a>
                          <form method="post" action="/unfollow">
                            <input type="hidden" name="followerId" value="rows.id" />
                            <input style={style2} type="submit" value="Unfollow" className="clr btn-sm waves-effect waves-light" />
                          </form>
                        </div>
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
