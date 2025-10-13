import React, { Component } from "react";
import axios from "axios";
import Select from "react-select";
import { isAuthenticated, logout } from "../../helpers/auth";

class CreateStudentGroups extends React.Component {
  componentDidMount() {
    const USER = isAuthenticated();
    if (USER.userType !== "Student") {
      window.location.replace("/login");
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      groupID: "",
      leaderID: "",
      member1: "",
      member2: "",
      member3: "",
      members: [],
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const data = {
      groupID: "GRP" + (Math.floor(Math.random() * 1000) + 1),
      leaderID: this.state.leaderID,
      member1: this.state.member1,
      member1: this.state.member1,
      member1: this.state.member1,
      members: [
        {
          member1: this.state.member1,
          member2: this.state.member2,
          member3: this.state.member3,
        },
      ],
    };
    localStorage.setItem("groupID", JSON.stringify(data.groupID));

    console.log("STD GRUP", data);

    axios
      .post("http://localhost:5001/studentgroup/create", data)
      .then((res) => {
        if (res.data.success) {
          alert("Student group successfully created");
          // this.empty();
        }
      });
  };

  render() {
    return (
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <h2>Create Groups</h2>
        <form>
          <div className="form-group">
            <label>Leader ID</label>
            <input
              type="text"
              className="form-control"
              id="leaderID"
              placeholder="Enter Leader ID"
              name="leaderID"
              value={this.state.leaderID}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Group Member 1</label>
            <input
              type="text"
              className="form-control"
              id="member1"
              placeholder="Enter Member 1 ID"
              name="member1"
              value={this.state.member1}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label>Group Member 2</label>
            <input
              type="text"
              className="form-control"
              id="member2"
              placeholder="Enter Member 2 ID"
              name="member2"
              value={this.state.member2}
              onChange={this.handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Group Member 3</label>
            <input
              type="text"
              className="form-control"
              id="member3"
              placeholder="Enter Member 3 ID"
              name="member3"
              value={this.state.member3}
              onChange={this.handleInputChange}
            />
          </div>
        </form>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.onSubmit}
          style={{ marginTop: "10px" }}
        >
          Submit Group
        </button>
        &nbsp;
      </div>
    );
  }
}
export default CreateStudentGroups;
