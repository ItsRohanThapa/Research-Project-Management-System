import React, { Component } from "react";
import axios from "axios";

export default class ViewAllTopics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topicList: [],
    };
  }

  componentDidMount() {
    this.retrievetopics();
  }

  retrievetopics() {
    axios.get("http://localhost:5001/topic/getTopicsAdmin").then((res) => {
      if (res.data.success) {
        this.setState({
          topicList: res.data.statsTopics,
        });
        console.log(this.state.topicList);
        console.log(window.location.pathname);
        const myArray = window.location.pathname.split("/", 3);
        console.log(myArray[2]);
      }
    });
  }

  navigate = (id) => {
    location.href = `/admin/topics/${id}`;
  };

  render() {
    return (
      <div className="admin-container">
        <div className="container">
          <br />
          <br />
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h2>All Topics</h2>
            </div>
          </div>
          <br />
          <table class="table" id="table">
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Topic</th>
                <th scope="col">Group ID</th>
                <th scope="col">Supervisor ID</th>
                <th scope="col">Co-Supervisor ID</th>
                <th scope="col">Status</th>
                <th scope="col">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {this.state.topicList.map((topicList, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{topicList.topic}</td>
                  <td>{topicList.groupID}</td>
                  <td>{topicList.supervisorID}</td>
                  <td>{topicList.co_supervisorID}</td>
                  <td>{topicList.status}</td>
                  <td>{topicList.remarks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
