import React from 'react';
// import request from 'superagent';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class Followuser extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      user_id: cookie.load('user_id')
    }

  }
  componentWillMount() {
    let followuserid = this.props.params.id;
    // console.log('followuserid---->',followuserid);
    // console.log('props---->',this.props.params);

    axios.get(`http://localhost:8000/deletetweet/${followuserid}`)
    .then(res => {
      const data= res.data;
      console.log("-->", res.data)

      this.setState({
        data: data,
      })
      // browserHistory.push(`/yourprofile/${this.state.user_id}`);
    });
    browserHistory.push(`/yourprofile/${this.state.user_id}`);
  }
  render() {


    return (
      <div></div>
      )
  }
}
export default Followuser;

// import React from 'react';
// import request from 'superagent';
// import cookie from 'react-cookie';
// import { browserHistory } from 'react-router';



// class Followuser extends React.Component {
//   componentWillMount() {
//     let id = this.props.params.id;
//     let url = `http://localhost:5000/follow`;
//     let userLoginDetail = {follower : id, follow : cookie.load('userId'), };
//     var a = JSON.stringify(userLoginDetail);

//     request
//       .post(url)
//       .set('Content-Type', 'application/json')
//       .send(a)
//       .end(function(err, response){
//         console.log(response.text);
//         var a = JSON.parse(response.text);

//         if(a.status === 0) {
//           alert(a.data);
//         } else {

//         }

//         browserHistory.push('/follow');


//      });
//   }
//   render() {


//     return (
//       <div></div>
//       )
//   }
// }
// export default Followuser;
