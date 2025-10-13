import React, { Component } from "react";
import axios from "axios";
import { isAuthenticated, logout } from "../../helpers/auth";

export default class NoticeDocumentForm extends Component {
  componentDidMount() {
    const USER = isAuthenticated();
    if (USER.userType !== "Student") {
      window.location.replace("/login");
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      noticeHeader: "",
      description: "",
      downdocument: "",
      documentDescription: "",
      supervisorID: "",
      groupID: "",
      document: null,
      edocumentDescription: "",
      esupervisorID: "",
      egroupID: "",
      edocument: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  validate = () => {
    let edocumentDescription = "";
    let esupervisorID = "";
    let egroupID = "";
    let edocument = "";

    if (!this.state.documentDescription) {
      edocumentDescription = "Document Description is required !!!";
    }
    if (!this.state.supervisorID.match(/SD/)) {
      esupervisorID = "Panel ID Prefix should be (SD)!!!";
    }
    if (!this.state.supervisorID) {
      esupervisorID = "Supervisor ID is required !!!";
    }
    if (!this.state.groupID.match(/GRP/g)) {
      egroupID = "Group ID Prefix should be (GRP) !!!";
    }
    if (!this.state.groupID) {
      egroupID = "Group ID is required !!!";
    }
    if (!this.state.document) {
      edocument = "Document is required !!!";
    }
    if (edocumentDescription || esupervisorID || egroupID || edocument) {
      this.setState({
        edocumentDescription,
        esupervisorID,
        egroupID,
        edocument,
      });
      return false;
    }
    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      const { documentDescription, supervisorID, groupID, document } =
        this.state;

      let data = new FormData();
      data.append("file", document);
      data.append("supervisorID", supervisorID);
      data.append("groupID", groupID);
      data.append("documentDescription", documentDescription);

      axios.post("http://localhost:5001/documents/add", data).then((res) => {
        if (res.data.success) {
          alert("Document submitted Successfully");
          this.empty();
        }
      });
    }
  };

  componentDidMount() {
    const myArray = window.location.pathname.split("/", 4);
    console.log(myArray[3]);
    let id = myArray[3];
    axios.get(`http://localhost:5001/notices/view/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          noticeHeader: res.data.Notice.noticeHeader,
          description: res.data.Notice.description,
          downdocument: res.data.Notice.docURL,
        });
      }
    });
  }

  selectFile = (event) => {
    this.state.document = event.target.files[0];
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  empty = (e) => {
    this.setState({
      documentDescription: "",
      supervisorID: "",
      groupID: "",
      document: null,
      edocumentDescription: "",
      esupervisorID: "",
      egroupID: "",
      edocument: "",
    });
    document.getElementById("file").value = "";
  };

  render() {
    return (
      <div className="admin-container">
        <div className="container">
          <br />
          <br />
          <br />
          <h2>{this.state.noticeHeader}</h2>
          <br />
          <h4>{this.state.description}</h4>
          <br />
          <a
            className="btn btn-danger"
            onClick={() => (location.href = this.state.downdocument)}
          >
            Download Document
          </a>
          <br />
          <br />
          <form>
            <div className="form-group">
              <label>Document Description</label>
              <input
                type="text"
                className="form-control"
                id="documentDescription"
                placeholder="Enter Document Description Type"
                name="documentDescription"
                value={this.state.documentDescription}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">
                {this.state.edocumentDescription}
              </small>
            </div>

            <div className="form-group">
              <label>Group ID</label>
              <input
                type="text"
                className="form-control"
                id="groupID"
                placeholder="Enter Group ID"
                name="groupID"
                value={this.state.groupID}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.egroupID}</small>
            </div>

            <div className="form-group">
              <label>Supervisor ID</label>
              <input
                type="text"
                className="form-control"
                id="supervisorID"
                placeholder="Enter Supervisor ID"
                name="supervisorID"
                value={this.state.supervisorID}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.esupervisorID}</small>
            </div>

            <label>Upload Document</label>
            <br />
            <input type="file" id="file" onChange={this.selectFile} />
            <br />
            <small className="text-danger">{this.state.edocument}</small>
          </form>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={this.onSubmit}
            style={{ marginTop: "10px" }}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}
