import React, { Component } from "react";
import axios from "axios";

export default class UpdatePanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      panelGroupID: "",
      panelHead: "",
      panel_researchArea: "",
    };
  }

  componentDidMount() {
    console.log("Hi", window.location.pathname);
    const myArray = window.location.pathname.split("/", 3);
    const id = myArray[2];

    axios.get(`http://localhost:5001/panel/view/${id}`).then((res) => {
      console.log(res);
      if (res.data.success) {
        console.log(res.data.Panel);
        this.setState({
          panelGroupID: res.data.Panel.panelGroupID,
          panelHead: res.data.Panel.panelHead,
          panel_researchArea: res.data.Panel.panel_researchArea,
        });

        console.log(this.state.userId);
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

    const { panelGroupID, panelHead, panel_researchArea } = this.state;

    const data = {
      panelGroupID: panelGroupID,
      panelHead: panelHead,
      panel_researchArea: panel_researchArea,
    };

    console.log(data);

    axios.post(`/panel/update/${id}`, data).then((res) => {
      if (res.data.success) {
        alert("Data updated successfully !!!");
        this.setState({
          panelGroupID: "",
          panelHead: "",
          panel_researchArea: "",
        });
      }
    });
  };

  render() {
    return (
      <div className="panel-container">
        <div className="col-md-8 mt-4 mx-auto">
          <center>
            <h2 className="h3 mb-3 font-weight-normal">UPDATE PANEL </h2>
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

            {/* Panel Head */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}> Panel Head </label>
              <input
                type="text"
                className="form-control"
                name="panelHead"
                placeholder="Enter Panel Head"
                value={this.state.panelHead}
                onChange={this.handleInputChange}
              />
            </div>

            {/* Panel Research Area */}
            <div className="form-group" style={{ marginBottom: "15px" }}>
              <label style={{ marginBottom: "5px" }}>
                {" "}
                Panel Research Area{" "}
              </label>
              <input
                type="text"
                className="form-control"
                name="panel_researchArea"
                placeholder="Enter Panel Research Area "
                value={this.state.panel_researchArea}
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
