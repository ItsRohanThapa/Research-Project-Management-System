import React, { Component } from "react";

export default class AdminHome extends Component {
  render() {
    return (
      <div className="admin-container">
        <center>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h1>ADMIN DASHBOARD</h1>
          <br></br>
          <form>
            <button className="btn btn-secondary btn-lg">
              <a
                href="/admin/manageNotices"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                Notice Management{" "}
              </a>
            </button>{" "}
            <button className="btn btn-secondary btn-lg">
              <a
                href="/admin/allTopics"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                Topic Management{" "}
              </a>
            </button>{" "}
            <button className="btn btn-secondary btn-lg">
              <a
                href="/admin/panels"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                Panel Management{" "}
              </a>
            </button>{" "}
          </form>
        </center>
      </div>
    );
  }
}
