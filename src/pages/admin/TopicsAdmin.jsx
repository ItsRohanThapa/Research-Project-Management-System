import React, { Component } from "react";
import axios from "axios";

export default class TopicsAdmin extends Component {
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
    axios.get("http://localhost:5001/topics/view").then((res) => {
      if (res.data.success) {
        this.setState({
          topicList: res.data.topicList,
        });
        console.log(this.state.topicList);
        console.log(window.location.pathname);
        const myArray = window.location.pathname.split("/", 3);
        console.log(myArray[2]);
      }
    });
  }

  download = (link) => {
    location.href = link;
  };

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
              <h2>All Accepted Topics</h2>
            </div>
          </div>

          <table class="table" id="table">
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Topic</th>
                <th scope="col">Group ID</th>
                <th scope="col">Supervisor ID</th>
                <th scope="col">Co-Supervisor ID</th>
                <th scope="col">Documents</th>
                <th scope="col">Assign Panel</th>
                <th scope="col">Panel ID</th>
                <th scope="col">Status</th>
                <th scope="col">Comment</th>
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
                  <td>
                    <a
                      className="btn btn-secondary"
                      onClick={() => (location.href = topicList.docURL)}
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <a
                      className="btn btn-primary"
                      onClick={() => this.navigate(topicList._id)}
                    >
                      Assign Panel
                    </a>
                  </td>
                  <td>{topicList.panelID}</td>
                  <td>{topicList.status}</td>
                  <td>{topicList.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
