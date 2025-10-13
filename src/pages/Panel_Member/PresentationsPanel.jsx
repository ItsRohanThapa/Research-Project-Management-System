import React, { Component } from "react";
import axios from "axios";

export default class PresentationsPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      presentationList: [],
      pid: "",
    };
  }

  retrievePresentations = (id) => {
    console.log("id", id);
    axios
      .get(`http://localhost:5001/presentations/viewByPanel/${id}`)
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
          <h3>Enter Panel ID Here</h3>

          <form>
            <div className="form-group">
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Panel ID"
                  id="pid"
                  name="pid"
                  onChange={this.handleInputChange}
                  value={this.state.pid}
                />
                <div className="col-lg-3 mt-2 mb-2">
                  <a
                    className="btn btn-success"
                    onClick={() => this.retrievePresentations(this.state.pid)}
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
                <th scope="col">Evaluation Status</th>
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
                  <td>
                    <a
                      className="btn btn-primary"
                      onClick={() => this.navigate(presentationList._id)}
                    >
                      Evaluate
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
