import React, { Component } from 'react';

class EditProfile extends Component {
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
                  <div className="col-md-4"><img src="./images/" alt="profilepic" width="200px" height="200px" className="thumbnail" />
                    <form method="post" enctype="multipart/form-data" action="/profilepictureupload">
                      <input type="file" name="thumbnail" className='clr' style={style3} required />
                      <input type="submit" name="submit" className="btn btn-info" />
                    </form>
                  </div>
                  <div className="col-md-8">
                    <form method="post" action="/editprofile" className="form-horizontal">
                      <div text-align="center" className="form-content"></div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <input type="text" name="username" value="data.username" required className="form-control form-control-inline" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <input type="number" name="mobileno" value="data.mobilenumber" required className="form-control form-control-inline" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <input type="text" name="email" value="data.email" required className="form-control form-control-inline" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <input type="password" name="password" value="data.password" required className="form-control form-control-inline" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <input type="password" name="confirmpassword" placeholder="new password" className="form-control form-control-inline" />
                        </div>
                      </div>
                      <div className="form-group">
                        <div className="col-sm-8">
                          <button type="submit" className="btn btn-info">change profile</button>
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
