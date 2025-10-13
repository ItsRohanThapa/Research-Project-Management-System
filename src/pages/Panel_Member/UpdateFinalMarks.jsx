import React, { Component } from "react";
import axios from "axios";

export default class UpdateFinalMarks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelGroupID: "",
      studentGroupID: "",
      pp_01: "",
      pp_02: "",
      final_report: "",
      finalmark: "",
      finalgrade: "",
    };
  }

  componentDidMount() {
    console.log("Hi", window.location.pathname);
    const myArray = window.location.pathname.split("/", 3);
    const id = myArray[2];

    axios.get(`http://localhost:5001/finalMarks/view/${id}`).then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log(res.data.PanelMember);
        this.setState({
          panelGroupID: res.data.PanelMember.panelGroupID,
          studentGroupID: res.data.PanelMember.studentGroupID,
          pp_01: res.data.PanelMember.pp_01,
          pp_02: res.data.PanelMember.p_researchArea,
          final_report: res.data.PanelMember.final_report,
          finalmark: res.data.PanelMember.finalmark,
          finalgrade: res.data.PanelMember.finalgrade,
        });

        console.log(this.state.staffID);
      }
    });
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

    const {
      panelGroupID,
      studentGroupID,
      charter,
      pro_proposal,
      pp_01,
      pp_02,
      final_report,
      App_Banner,
      finalmark,
      finalgrade,
    } = this.state;

    const data = {
      panelGroupID: panelGroupID,
      studentGroupID: studentGroupID,
      charter: charter,
      pro_proposal: pro_proposal,
      pp_01: pp_01,
      pp_02: pp_02,
      final_report: final_report,
      App_Banner: App_Banner,
      finalmark: finalmark,
      finalgrade: finalgrade,
    };

    console.log(data);

    axios.put(`/finalMarks/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Data Updated successfully !!!");
        this.setState({
          panelGroupID: "",
          studentGroupID: "",
          pp_01: "",
          pp_02: "",
          final_report: "",
          finalmark: "",
          finalgrade: "",
        });
      }
    });
  };

  render() {
    return (
      <div className="finalMarks-container">
        <div className="col-md-8 mt-4 mx-auto">
          <center>
            <h2 className="h3 mb-3 font-weight-normal">
              <UPDATE></UPDATE> FINAL MARKS{" "}
            </h2>
          </center>
          <form className="needs-validation" noValidate>
            {/* Panel Group ID */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> Panel Group ID </label>
              <input
                type="text"
                className="form-control"
                name="panelGroupID"
                placeholder="Enter Panel Group ID"
                value={this.state.panelGroupID}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Student Group ID */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> Student Group ID </label>
              <input
                type="text"
                className="form-control"
                name="studentGroupID"
                placeholder="Enter Student Group ID"
                value={this.state.studentGroupID}
                onChange={this.handleInputChange}
              />
            </div>

            {/* charter */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> Charter </label>
              <input
                type="text"
                className="form-control"
                name="charter"
                placeholder="Enter Charter Marks"
                value={this.state.charter}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Project Proposal */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> Project Proposal </label>
              <input
                type="text"
                className="form-control"
                name="pro_proposal"
                placeholder="Enter Project Proposal Marks"
                value={this.state.pro_proposal}
                onChange={this.handleInputChange}
              />
            </div>

            {/* pp_01 */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> pp_01 </label>
              <input
                type="text"
                className="form-control"
                name="pp_01"
                placeholder="Enter pp_01 Marks"
                value={this.state.pp_01}
                onChange={this.handleInputChange}
              />
            </div>

            {/* pp_02 */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> pp_02 </label>
              <input
                type="text"
                className="form-control"
                name="pp_02"
                placeholder="Enter pp_02 Marks"
                value={this.state.pp_02}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Final Report */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> Final Report </label>
              <input
                type="text"
                className="form-control"
                name="final_report"
                placeholder="Enter Final Report Marks"
                value={this.state.final_report}
                onChange={this.handleInputChange}
              />
            </div>

            {/* App Banner */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> App Banner </label>
              <input
                type="text"
                className="form-control"
                name="App_Banner"
                placeholder="Enter App_Banner Marks"
                value={this.state.App_Banner}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Final Mark */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> Final Mark </label>
              <input
                type="text"
                className="form-control"
                name="finalmark"
                placeholder="Enter Final Mark Marks"
                value={this.state.finalmark}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Final Grade */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> Final Grade </label>
              <input
                type="text"
                className="form-control"
                name="finalgrade"
                placeholder="Enter Final Grade Marks"
                value={this.state.finalgrade}
                onChange={this.handleInputChange}
              />
            </div>

            <button
              className="btn btn-secondary"
              type="submit"
              style={{ marginTop: "20px" }}
              onClick={this.onSubmit}
            >
              <i className="far fa-check-square"></i>
              &nbsp; UPDATE
            </button>
          </form>
        </div>
      </div>
    );
  }
}
