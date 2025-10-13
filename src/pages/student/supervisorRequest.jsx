import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { isAuthenticated, logout } from "../../helpers/auth";
class SupervisorRequest extends React.Component {
  componentDidMount() {
    this.renderData();
    const USER = isAuthenticated();
    if (USER.userType !== "Student") {
      window.location.replace("/login");
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      dropDownOpt: [],
      id: "",
      name: "",
      groupID: "",
      supervisorID: "",
      topic: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
      id: e.value,
      name: e.label,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    console.log(this.state);
    const data = {
      groupID: JSON.parse(localStorage.getItem("groupID")),
      supervisorID: this.state.id,
      topic: this.state.topic,
    };

    axios.post("http://localhost:5001/topic/create", data).then((res) => {
      if (res.data.success) {
        alert("Supervisor requested Successfully");
        // this.empty();
      }
    });
  };

  async renderData() {
    axios.get("http://localhost:5001/staff/view").then((res) => {
      if (res.data.success) {
        const serverResponse = res.data.existingStaff.filter(
          (d) => d.userSubType === "Supervisor"
        );
        const dropDownValue = serverResponse?.map((response) => ({
          value: response.userID,
          label: response.username,
        }));
        console.log(dropDownValue);
        this.setState({
          dropDownOpt: dropDownValue,
        });
      }
    });
  }
  onChange(event) {
    this.setState({
      id: event.value,
      name: event.label,
    });
    console.log(this.state.id);
  }

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <h2>Request Supervisor</h2>
        <form>
          <div className="form-group">
            <label>Group ID</label>
            <input
              type="text"
              className="form-control"
              id="groupID"
              placeholder="Enter Notice Category"
              name="groupID"
              value={JSON.parse(localStorage.getItem("groupID"))}
              onChange={this.handleInputChange}
            />

            <small className="text-danger">{this.state.enoticeCategory}</small>
          </div>

          <div className="form-group">
            <label>Your Topic Area</label>
            <input
              type="text"
              className="form-control"
              id="topic"
              placeholder="Enter Notice Header"
              name="topic"
              value={this.state.topic}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Supervisor Name</label>
            <div className="custom-dropdown">
              <Select
                class="dropdown-menu"
                defaultValue={""}
                options={this.state.dropDownOpt}
                onChange={this.onChange.bind(this)}
              />
            </div>
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.onSubmit}
          style={{ marginTop: "10px" }}
        >
          Request
        </button>
        &nbsp;
      </div>
    );
  }
}
export default SupervisorRequest;
