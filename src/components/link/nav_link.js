import {Link} from 'react-router';
// import React, { Component } from 'react';

// class NavLink extends Component {


//   render() {
//     contextTypes: {
//         router: React.PropTypes.object
//     }
//     let isActive = this.context.router.isActive(this.props.to, true),
//         className = isActive ? "active" : "";

//     return (
//         <li className={className}>
//             <Link {...this.props}>
//                 {this.props.children}
//             </Link>
//         </li>
//     );
//     }
// }

// export default App1;
import React from 'react';

export default React.createClass({
  render() {
    // return (
    //     <li activeClassName="active">
    //         <Link {...this.props}/>
    //     </li>
    // );
    return <Link {...this.props} activeClassName="active"/>
  }
})

// export default React.createClass({
//     contextTypes: {
//         router: React.PropTypes.object
//     },

//     render: function () {
//         let isActive = this.context.router.isActive(this.props.to, true),
//             className = isActive ? "active1" : "";

//         return (
//             <li className={className}>
//                 <a {...this.props}>
//                     {this.props.children}
//                 </a>
//             </li>
//         );
//     }
// });
