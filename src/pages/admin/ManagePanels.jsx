import React, { Component } from "react";

export default class ManagePanels extends Component {
  render() {
    return (
      <div className="admin-container">
        <div>
          <center>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1>MANAGE PANELS</h1>
            <br />
            <br />
            <br />

            <form>
              <button className="btn btn-secondary btn-lg">
                <a
                  href="/panelmember/add"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {" "}
                  Add Panel Members{" "}
                </a>
              </button>{" "}
              <button className="btn btn-secondary btn-lg">
                <a
                  href="/panel/add"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {" "}
                  Create Panel Groups{" "}
                </a>
              </button>{" "}
              <button className="btn btn-secondary btn-lg">
                <a
                  href="/panel/viewall"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {" "}
                  View All Panels{" "}
                </a>
              </button>{" "}
            </form>
          </center>
        </div>
      </div>
    );
  }
}
