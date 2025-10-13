import React, { Component } from "react";
import axios from "axios";
import { isAuthenticated, logout } from "../../helpers/auth";

export default class DocumentsStudent extends Component {
  componentDidMount() {
    const USER = isAuthenticated();
    if (USER.userType !== "Student") {
      window.location.replace("/login");
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      documentList: [],
      gid: "",
      selectedFile: null,
    };
  }

  retrieveDocuments = (id) => {
    console.log("id", id);
    axios
      .get(`http://localhost:5001/documents/viewByGroup/${id}`)
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

  handleFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  uploadDocument = () => {
    const { selectedFile, gid } = this.state;

    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("groupId", gid);

    axios
      .post("http://localhost:5001/documents/upload", formData)
      .then((res) => {
        if (res.data.success) {
          alert("File uploaded successfully.");
          this.retrieveDocuments(gid);
        } else {
          alert("File upload failed.");
        }
      })
      .catch((err) => {
        console.error("Error uploading file:", err);
        alert("An error occurred while uploading the file.");
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
                  <input
                    type="file"
                    className="form-control-file"
                    onChange={this.handleFileChange}
                  />
                </div>
                <div className="col-lg-3 mt-2 mb-2">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.uploadDocument}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h2>Documents List</h2>
            </div>
          </div>

          <table className="table" id="table">
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Document Description</th>
                <th scope="col">Supervisor ID</th>
                <th scope="col">Group ID</th>
                <th scope="col">Document</th>
                <th scope="col">Comments</th>
                <th scope="col"></th>
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
