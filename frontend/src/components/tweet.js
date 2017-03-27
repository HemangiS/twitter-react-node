import React from 'react';
// import request from 'superagent';
import axios from 'axios';
import cookie from 'react-cookie';
import { browserHistory } from 'react-router';

class Tweet extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      userdata: '',

    }

  }
  componentWillMount() {
    let id = this.props.params.id;
    // console.log('deletetweetid---->',deletetweetid);
    // console.log('props---->',this.props.params);

    axios.post(`http://localhost:8000/tweet/${id}`, {

    })
    .then(res => {
      // const data= res.data;
      // console.log("-->", res.data)

      // this.setState({
      //   userdata: data,
      // })
      // browserHistory.push(`/yourprofile/${this.state.user_id}`);
    });
    browserHistory.push(`/welcome/${cookie.load('user_id')}`);
  }
  render() {


    return (
      <div></div>
      )
  }
}
export default Tweet;
