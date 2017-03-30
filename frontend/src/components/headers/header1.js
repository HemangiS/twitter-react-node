// active working

import React, { Component } from 'react';
var path = require('../../../public/images/logo.png');

class Header1 extends Component {
  render(){
    let imgLogo = {
      width: '30px',
      height: '30px',
      paddingBottom: '3px'
    }
    return(
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/"><img style={imgLogo} src={path} alt="logo" /></a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="/">
                    <font className='clr'>
                      <i className=" glyphicon glyphicon-home">
                        &nbsp;Home
                      </i>
                    </font>
                  </a>
                </li>
                <li>
                  <a href="/register">
                    <font className='clr'>
                      <i className=" glyphicon glyphicon-edit">
                        &nbsp;Register
                      </i>
                    </font>
                  </a>
                </li>

                <li>
                  <a href="/login">
                    <font className='clr'>
                      <i className=" glyphicon glyphicon-user">
                        &nbsp;LogIn
                      </i>
                    </font>
                  </a>
                </li>
                <li>
                  <a href="/about">
                    <font className='clr'>
                      <i className=" glyphicon glyphicon-search">
                        &nbsp;About us
                      </i>
                    </font>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </nav>
      </div>
    );
  }
}

export default Header1;

// without active

// import React, { Component } from 'react';

// class Header1 extends Component {

//   render(){
//     console.log(this.context);
//     return(
//       <div>
//         <ul className="nav nav-tabs">
//           <li>
//             <a href="/">
//               <i className="clr glyphicon glyphicon-home">
//                 &nbsp;Home
//               </i>
//             </a>
//           </li>
//           <li>
//             <a href="/register">
//               <i className="clr glyphicon glyphicon-pencil">
//                 &nbsp;SignUp
//               </i>
//             </a>
//           </li>
//           <li>
//             <a href="/login">
//               <i className="clr glyphicon glyphicon-user">
//                 &nbsp;LogIn
//               </i>
//             </a>
//           </li>
//           <li>
//             <a href="https://twitter.com/about">
//               <i className="clr glyphicon glyphicon-search">
//                 &nbsp;About us
//               </i>
//             </a>
//           </li>
//         </ul>
//       </div>
//     );
//   }
// }

// export default Header1;
