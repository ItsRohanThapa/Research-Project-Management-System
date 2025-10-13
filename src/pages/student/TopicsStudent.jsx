import React, { Component } from "react";
import axios from "axios";

export default class TopicsStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topicList: [],
      gid: "",
    };
  }

  retrieveTopics = (id) => {
    console.log("id", id);
    axios.get(`http://localhost:5001/topics/viewByGroup/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          topicList: res.data.topicList,
        });
        console.log(this.state.topicList);
      }
    });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  download = (link) => {
    location.href = link;
  };

  navigate = (id) => {
    location.href = `/panelEPresentation/${id}`;
  };

  render() {
    return (
      <div className="admin-container">
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <h3>Enter Group ID Here</h3>

          <form>
            <div className="form-group">
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Group ID"
                  id="gid"
                  name="gid"
                  onChange={this.handleInputChange}
                  value={this.state.gid}
                />
                <div className="col-lg-3 mt-2 mb-2">
                  <a
                    className="btn btn-success"
                    onClick={() => this.retrieveTopics(this.state.gid)}
                  >
                    Load
                  </a>
                </div>
              </div>
            </div>
          </form>

          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h2>All Topics</h2>
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
