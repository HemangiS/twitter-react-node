// active working

import React, { Component } from 'react';
import NavLink from '../link/nav_link';

class Header1 extends Component {
  render(){
    return(
      <div>
        <ul className="nav nav-tabs">
          <li>
            <NavLink to="/">
              <i className="clr glyphicon glyphicon-home">
                &nbsp;Home
              </i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/register">
              <i className="clr gliyphicon glyphicon-pencil">
                &nbsp;SignUp
              </i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">
              <i className="clr glyphicon glyphicon-user">
                &nbsp;LogIn
              </i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/twitter.com/about">
              <i className="clr glyphicon glyphicon-search">
                &nbsp;About us
              </i>
            </NavLink>
          </li>
        </ul>
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
