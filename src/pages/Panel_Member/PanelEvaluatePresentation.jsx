import React, { Component } from "react";
import axios from "axios";

export default class PanelEvaluatePresentation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pp_Type: "",
      panel_ppmarks: "",
      panel_ppComment: "",
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
    const myArray = window.location.pathname.split("/", 3);
    console.log(myArray[2]);
    let id = myArray[2];
    axios.get(`http://localhost:5001/presentations/view/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          pp_Type: res.data.Presentation.presentationType,
        });
      }
    });
  }

  navigate = () => {
    location.href = "/panel/presentations";
  };

  onSubmit = (e) => {
    e.preventDefault();

    const { panel_ppmarks, panel_ppComment } = this.state;

    const data = {
      marks: panel_ppmarks,
      comments: panel_ppComment,
    };

    console.log(data);

    const myArray = window.location.pathname.split("/", 3);
    console.log(myArray[2]);
    let id = myArray[2];

    axios
      .put(`http://localhost:5001/presentations/update/${id}`, data)
      .then((res, err) => {
        if (res.data.success) {
          alert("Data Updated successfully !!!");
          this.navigate();
        } else {
          console.log(err);
        }
      });
  };

  render() {
    return (
      <div className="PanelEvaluatePresentation-container">
        <br></br>
        <br></br>
        <div className="col-md-8 mt-4 mx-auto">
          <center>
            <b>
              <h1>Evaluate Presentations </h1>
            </b>
            <br></br>
          </center>
          <form className="needs-validation" noValidate>
            {/* Presentation Type */}
            {/* <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}>
                  {" "}
                  Presentation Type (PP_01 / PP_02)
                </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="pp_Type"
                placeholder="Enter Presentation Type"
                value={this.state.pp_Type}
                onChange={this.handleInputChange}
              />
            </div> */}

            {/* Panel Presentation Comment */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}>
                  {" "}
                  Panel Presentation Comment{" "}
                </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="panel_ppComment"
                placeholder="Enter Presentation Comment"
                value={this.state.panel_ppComment}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Presentation Mark */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}>
                  {" "}
                  Presentation Mark{" "}
                </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="panel_ppmarks"
                placeholder="Enter Presentation Marks"
                value={this.state.panel_ppmarks}
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
