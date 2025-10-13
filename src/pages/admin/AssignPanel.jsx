import React, { Component } from "react";
import axios from "axios";

export default class AssignPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      topic: "",
      panelID: "",
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  };

  componentDidMount() {
    const myArray = window.location.pathname.split("/", 4);
    console.log(myArray[3]);
    let id = myArray[3];
    axios.get(`http://localhost:5001/topics/view/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          topic: res.data.Topic.topic,
        });
      }
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { panelID } = this.state;

    const data = {
      panelID: panelID,
    };

    console.log(data);

    const myArray = window.location.pathname.split("/", 4);
    console.log(myArray[3]);
    let id = myArray[3];

    axios
      .put(`http://localhost:5001/topics/update/${id}`, data)
      .then((res, err) => {
        if (res.data.success) {
          alert("Panel Assigned successfully !!!");
          this.navigate();
        } else {
          console.log(err);
        }
      });
  };

  navigate = () => {
    location.href = "/admin/topics";
  };

  render() {
    return (
      <div className="admin-container">
        <div className="container">
          <br />
          <br />
          <br />
          <h1>Panel Assign</h1>
          <br />
          <h2>Selected Group Topic</h2>
          <h4>{this.state.topic}</h4>
          <br />
          <form>
            <div className="form-group">
              <label>Panel ID</label>
              <input
                type="text"
                className="form-control"
                id="panelID"
                placeholder="Enter Panel ID"
                name="panelID"
                value={this.state.panelID}
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
            Submit
          </button>
        </div>
      </div>
    );
  }
}
