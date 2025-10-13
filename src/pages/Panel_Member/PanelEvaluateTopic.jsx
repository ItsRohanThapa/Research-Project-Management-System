import React, { Component } from "react";
import axios from "axios";

export default class PanelEvaluateTopic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "",
      comment: "",
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

    const { status, comment } = this.state;

    const data = {
      status: status,
      comment: comment,
    };

    console.log(data);

    const myArray = window.location.pathname.split("/", 3);
    console.log(myArray[2]);
    let id = myArray[2];

    axios.put(`http://localhost:5001/topics/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Data saved successfully !!!");
        this.navigate();
      }
    });
  };

  navigate = () => {
    location.href = "/panel/topics";
  };

  render() {
    return (
      <div className="PanelEvaluateTopic-container">
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <div className="col-md-8 mt-4 mx-auto">
          <center>
            <b>
              <h1>Evaluate Topics </h1>
            </b>
          </center>
          <form className="needs-validation" noValidate>
            {/* Panel Status */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}> Panel Status </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="status"
                placeholder="Enter Panel Status"
                value={this.state.status}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Panel Comment */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}> Panel Comment </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="comment"
                placeholder="Enter Panel Comment"
                value={this.state.comment}
                onChange={this.handleInputChange}
              />
            </div>
            <center>
              <button
                className="btn btn-secondary"
                type="submit"
                style={{ marginTop: "20px" }}
                onClick={this.onSubmit}
              >
                &nbsp;SUBMIT
              </button>
            </center>
          </form>
        </div>
      </div>
    );
  }
}
