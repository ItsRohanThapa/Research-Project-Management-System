import React, { Component } from "react";
import axios from "axios";

export default class NewNoticeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noticeHeader: "",
      roleID: "",
      noticeCategory: "",
      description: "",
      document: null,
      enoticeHeader: "",
      eroleID: "",
      enoticeCategory: "",
      edescription: "",
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
    let enoticeHeader = "";
    let eroleID = "";
    let enoticeCategory = "";
    let edescription = "";
    let edocument = "";

    if (!this.state.noticeHeader) {
      enoticeHeader = "Notice Header is required !!!";
    }
    if (
      !(
        this.state.roleID.match("student") ||
        this.state.roleID.match("staff") ||
        this.state.roleID.match("all")
      )
    ) {
      eroleID = "Broadcast Type Should Be (student/staff/all) !!!";
    }
    if (!this.state.roleID) {
      eroleID = "Broadcast Type is required !!!";
    }
    if (
      !(
        this.state.noticeCategory.match("topic") ||
        this.state.noticeCategory.match("document") ||
        this.state.noticeCategory.match("presentation") ||
        this.state.noticeCategory.match("notice")
      )
    ) {
      enoticeCategory =
        "Notice Category Should Be (topic/notice/presentation/document) !!!";
    }
    if (!this.state.noticeCategory) {
      enoticeCategory = "Notice Category is required !!!";
    }
    if (!this.state.description) {
      edescription = "Message is required !!!";
    }
    if (!this.state.document) {
      edocument = "Document is required !!!";
    }
    if (
      enoticeHeader ||
      eroleID ||
      enoticeCategory ||
      edescription ||
      edocument
    ) {
      this.setState({
        enoticeHeader,
        eroleID,
        enoticeCategory,
        edescription,
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
      const { noticeHeader, roleID, noticeCategory, description, document } =
        this.state;
      let data = new FormData();
      data.append("file", document);
      data.append("noticeHeader", noticeHeader);
      data.append("roleID", roleID);
      data.append("noticeCategory", noticeCategory);
      data.append("description", description);

      axios.post("http://localhost:5001/notices/add", data).then((res) => {
        if (res.data.success) {
          alert("Notice Published Successfully");
          this.empty();
        }
      });
    }
  };

  empty = (e) => {
    this.setState({
      noticeHeader: "",
      roleID: "",
      noticeCategory: "",
      description: "",
      document: null,
      enoticeHeader: "",
      eroleID: "",
      enoticeCategory: "",
      edescription: "",
    });
    document.getElementById("file").value = "";
  };

  selectFile = (event) => {
    this.state.document = event.target.files[0];
  };

  render() {
    return (
      <div className="admin-container">
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <h2>Create Notice</h2>
          <form>
            <div className="form-group">
              <label>
                Notice Category (topic/notice/presentation/document)
              </label>
              <input
                type="text"
                className="form-control"
                id="noticeCategory"
                placeholder="Enter Notice Category"
                name="noticeCategory"
                value={this.state.noticeCategory}
                onChange={this.handleInputChange}
              />

              <small className="text-danger">
                {this.state.enoticeCategory}
              </small>
            </div>

            <div className="form-group">
              <label>Notice Header</label>
              <input
                type="text"
                className="form-control"
                id="noticeHeader"
                placeholder="Enter Notice Header"
                name="noticeHeader"
                value={this.state.noticeHeader}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.enoticeHeader}</small>
            </div>

            <div className="form-group">
              <label>Message</label>
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="Enter Message"
                name="description"
                value={this.state.description}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.edescription}</small>
            </div>

            <div className="form-group">
              <label>Broadcast Type (all/supervisor/co-supervisor/panel)</label>
              <input
                type="text"
                className="form-control"
                id="roleID"
                placeholder="Enter Broadcast Type"
                name="roleID"
                value={this.state.roleID}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.eroleID}</small>
            </div>

            <label>Upload Template / Material</label>
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
            Publish
          </button>
          &nbsp;
        </div>
      </div>
    );
  }
}
