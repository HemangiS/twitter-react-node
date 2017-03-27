import React from 'react';
// import request from 'superagent';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class DeleteTweet extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      user_id: cookie.load('user_id')
    }

  }
  componentWillMount() {
    let deletetweetid = this.props.params.id;
    // console.log('deletetweetid---->',deletetweetid);
    // console.log('props---->',this.props.params);

    axios.get(`http://localhost:8000/deletetweet/${deletetweetid}`)
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
export default DeleteTweet;
