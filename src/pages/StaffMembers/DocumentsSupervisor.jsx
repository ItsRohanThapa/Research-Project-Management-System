import React, { Component } from "react";
import axios from "axios";

export default class DocumentsSupervisor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      documentList: [],
      sid: "",
    };
  }

  retrieveDocuments = (id) => {
    console.log("id", id);
    axios
      .get(`http://localhost:5001/documents/viewBySupervisor/${id}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            documentList: res.data.documentList,
          });
          console.log(this.state.documentList);
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
    location.href = `/staff/document/${id}`;
  };

  render() {
    return (
      <div className="admin-container">
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <h3>Enter Supervisor ID Here</h3>

          <form>
            <div className="form-group">
              <div className="col-lg-3 mt-2 mb-2">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Enter Supervisor ID"
                  id="sid"
                  name="sid"
                  onChange={this.handleInputChange}
                  value={this.state.sid}
                />
                <div className="col-lg-3 mt-2 mb-2">
                  <a
                    className="btn btn-success"
                    onClick={() => this.retrieveDocuments(this.state.sid)}
                  >
                    Load
                  </a>
                </div>
              </div>
            </div>
          </form>

          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h2>Documents List</h2>
            </div>
          </div>

          <table class="table" id="table">
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Document Description</th>
                <th scope="col">Supervisor ID</th>
                <th scope="col">Group ID</th>
                <th scope="col">Document</th>
                <th scope="col">Evaluate</th>
                <th scope="col">Comments</th>
                <th scope="col">Doc %</th>
              </tr>
            </thead>
            <tbody>
              {this.state.documentList.map((documentList, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{documentList.documentDescription}</td>
                  <td>{documentList.supervisorID}</td>
                  <td>{documentList.groupID}</td>
                  <td>
                    <a
                      className="btn btn-secondary"
                      onClick={() => (location.href = documentList.docURL)}
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <a
                      className="btn btn-primary"
                      onClick={() => this.navigate(documentList._id)}
                    >
                      Evaluate
                    </a>
                  </td>
                  <td>{documentList.comments}</td>
                  <td>{documentList.marks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
