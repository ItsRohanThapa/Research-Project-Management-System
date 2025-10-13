import React, { Component } from "react";
import axios from "axios";
import { isAuthenticated, logout } from "../../helpers/auth";

export default class PresentationsStudent extends Component {
  componentDidMount() {
    const USER = isAuthenticated();
    if (USER.userType !== "Student") {
      window.location.replace("/login");
    }
  }
  constructor(props) {
    super(props);

    this.state = {
      presentationList: [],
      gid: "",
    };
  }

  retrievePresentations = (id) => {
    console.log("id", id);
    axios
      .get(`http://localhost:5001/presentations/viewByGroup/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            presentationList: res.data.presentationList,
          });
          console.log(this.state.presentationList);
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
                    onClick={() => this.retrievePresentations(this.state.gid)}
                  >
                    Load
                  </a>
                </div>
              </div>
            </div>
          </form>

          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h2>Presentations List</h2>
            </div>
          </div>

          <table class="table" id="table">
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Presentation Type</th>
                <th scope="col">Panel ID</th>
                <th scope="col">Group ID</th>
                <th scope="col">Presentation Date</th>
                <th scope="col">Comments</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {this.state.presentationList.map((presentationList, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{presentationList.presentationType}</td>
                  <td>{presentationList.panelID}</td>
                  <td>{presentationList.groupID}</td>
                  <td>
                    <a
                      className="btn btn-secondary"
                      onClick={() => (location.href = presentationList.docURL)}
                    >
                      Download
                    </a>
                  </td>
                  <td>{presentationList.comments}</td>
                  <td>{presentationList.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
