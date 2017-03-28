import React from 'react';
// import request from 'superagent';
import axios from 'axios';
import cookie from 'react-cookie';
// import { browserHistory } from 'react-router';

class UnFollow extends React.Component {

  constructor(props) {
    super(props);
    this.state={

    }

  }
  componentWillMount() {
    let unfollowuserid = this.props.params.id;
    // console.log('followuserid---->',followuserid);
    // console.log('props---->',this.props.params);

    axios.post(`http://localhost:8000/unfollow/${unfollowuserid}`,{
      followerId: unfollowuserid,
    })
    .then(res => {
      // const data= res.data;
      // console.log("-->", res.data)

      // this.setState({
      //   data: data,
      // })
      // browserHistory.push(`/yourprofile/${this.state.user_id}`);
    });
    // browserHistory.push(`/yourprofile/${cookie.load('user_id')}`);
    window.location.href = `/yourprofile/${cookie.load('user_id')}`;
  }
  render() {


    return (
      <div></div>
      )
  }
}
export default UnFollow;
