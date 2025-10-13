import React, { Component } from "react";
import axios from "axios";

export default class EvaluateDocs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: "",
      marks: "",
      ecomments: "",
      emarks: "",
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
    let ecomments = "";
    let emarks = "";

    if (!this.state.comments) {
      ecomments = "Comment is required !!!";
    }
    if (!this.state.marks) {
      emarks = "Mark is required!!!";
    }

    if (ecomments || emarks) {
      this.setState({ ecomments, emarks });
      return false;
    }
    return true;
  };

  onSubmit = async (e) => {
    e.preventDefault();
    var isValid = await this.validate();
    console.log(isValid);
    if (isValid == false) {
      return;
    }

    const { comments, marks } = this.state;

    const data = {
      marks: marks,
      comments: comments,
    };

    console.log(data);

    const myArray = window.location.pathname.split("/", 4);
    console.log(myArray[3]);
    let id = myArray[3];

    axios
      .put(`http://localhost:5001/documents/update/${id}`, data)
      .then((res, err) => {
        if (res.data.success) {
          alert("Data Updated successfully !!!");
          this.navigate("/supHome");
        } else {
          console.log(err);
        }
      });
  };

  navigate = () => {
    location.href = "/staff/documents";
  };

  render() {
    return (
      <div className="SupEvaluateDoc-container">
        <br></br>
        <br></br>
        <div className="col-md-8 mt-4 mx-auto">
          <br />
          <center>
            <b>
              <h1>Evaluate Document </h1>
            </b>
            <br></br>
          </center>
          <form className="needs-validation" noValidate>
            {/* Presentation Type */}
            {
              <div className="form-group" style={{ marginBottom: "15px" }}>
                <b>
                  <label style={{ marginBottom: "5px" }}>
                    {" "}
                    Presentation Type (PP_01 (Online)/ PP_02 (Offline))
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
              </div>
            }

            {/* Panel Presentation Comment */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}>
                  {" "}
                  Document Comment{" "}
                </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="comments"
                placeholder="Enter Document Comment"
                value={this.state.comments}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.ecomments}</small>
            </div>

            {/* Presentation Mark */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}>
                  {" "}
                  Document Evaluation %{" "}
                </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="marks"
                placeholder="Enter Percentage of Evaluation"
                value={this.state.marks}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.emarks}</small>
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
