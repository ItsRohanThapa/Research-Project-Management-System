import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class AddPanelMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffID: "",
      panelmemberID: "",
      panelmemberName: "",
      p_researchArea: "",
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
    let taffID = "";
    let anelmemberID = "";
    let anelmemberName = "";
    let researchArea = "";

    if (!this.state.staffID) {
      taffID = "Staff ID is required !!!";
    }
    if (!this.state.panelmemberID) {
      anelmemberID = "Panel Member ID is required !!!";
    }
    if (!this.state.panelmemberName) {
      anelmemberName = "Panel Member Name is required !!!";
    }
    if (!this.state.p_researchArea) {
      researchArea = "Research Area ID is required !!!";
    }
    if (taffID || anelmemberID || anelmemberName || researchArea) {
      this.setState({ taffID, anelmemberID, anelmemberName, researchArea });
      return false;
    }
    return true;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      const { staffID, panelmemberID, panelmemberName, p_researchArea } =
        this.state;

      const data = {
        staffID: staffID,
        panelmemberID: panelmemberID,
        panelmemberName: panelmemberName,
        p_researchArea: p_researchArea,
      };

      console.log(data);

      axios
        .post("http://localhost:5001/panelMembers/save", data)
        .then((res) => {
          if (res.data.success) {
            alert("Data saved successfully !!!");
            this.navigate("/panelmember/viewall");
            // this.setState({
            //   staffID: "",
            //   panelmemberID: "",
            //   panelmemberName: "",
            //   p_researchArea: "",
            // });
          }
        });
    }
  };
  navigate = (link) => {
    location.href = link;
  };

  render() {
    return (
      <div className="panelmember-container">
        <br></br>
        <br></br>
        <br></br>
        <div className="col-md-8 mt-4 mx-auto">
          <center>
            <h1>
              <b>ADD PANEL MEMBER </b>
            </h1>
            <br></br>
            <br></br>
          </center>
          <form className="needs-validation" noValidate>
            {/* Staff ID */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}> Panel ID </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="staffID"
                placeholder="Enter Panel Group ID"
                value={this.state.staffID}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.taffID}</small>
            </div>
            {/* Panel Member ID */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}>
                  {" "}
                  Panel Member IDs{" "}
                </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="panelmemberID"
                placeholder="Enter Panel Member IDs"
                value={this.state.panelmemberID}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.anelmemberID}</small>
            </div>
            {/* Panel Member Name */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}>
                  {" "}
                  Panel Member Names{" "}
                </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="panelmemberName"
                placeholder="Enter Panel Member Names "
                value={this.state.panelmemberName}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.anelmemberName}</small>
            </div>
            {/* Research Area */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <b>
                <label style={{ marginBottom: "5px" }}> Research Area </label>
              </b>
              <input
                type="text"
                className="form-control"
                name="p_researchArea"
                placeholder="Enter Research Area "
                value={this.state.p_researchArea}
                onChange={this.handleInputChange}
              />
              <small className="text-danger">{this.state.researchArea}</small>
            </div>
            {/* <a className="btn btn-secondary btn-sm btn-block" href={`/edit/${panelmembers._id}`}>
                          <i className="fas fa-edit"></i>&nbsp;UPDATE   
                        </a>  */}
            <center>
              <button
                type="submit"
                className="btn btn-secondary btn-lg active"
                onClick={this.onSubmit}
                style={{ marginTop: "10px" }}
              >
                <a href="" style={{ textDecoration: "none", color: "white" }}>
                  {" "}
                  Save{" "}
                </a>
              </button>
            </center>{" "}
            <br></br>
          </form>
        </div>
      </div>
    );
  }
}
