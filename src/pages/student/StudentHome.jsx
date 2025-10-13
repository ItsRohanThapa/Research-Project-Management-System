import React, { Component } from "react";
import axios from "axios";
import { isAuthenticated, logout } from "../../helpers/auth";

export default class StaffHome extends Component {
  componentDidMount() {
    const USER = isAuthenticated();
    if (USER.userType !== "Student") {
      window.location.replace("/login");
    }
  }

  handleMouseEnter = (e) => {
    e.target.style.transform = "translateY(-5px)";
    e.target.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
  };

  handleMouseLeave = (e) => {
    e.target.style.transform = "translateY(0)";
    e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
  };

  render() {
    return (
      <div style={styles.container}>
        <div style={styles.buttonGrid}>
          <div
            style={styles.buttonBox}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <a href="/student/creategroup" style={styles.buttonLink}>
              Register User Groups
            </a>
          </div>
          <div
            style={styles.buttonBox}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <a href="/student/requestSupervisor" style={styles.buttonLink}>
              Request Supervisor
            </a>
          </div>

          <div
            style={styles.buttonBox}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <a href="/chatroom" style={styles.buttonLink}>
              Chat with Supervisor
            </a>
          </div>
          <div
            style={styles.buttonBox}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <a href="/student/documents" style={styles.buttonLink}>
              Submit Documents
            </a>
          </div>
          <div
            style={styles.buttonBox}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <a href="/student/topics" style={styles.buttonLink}>
              Topic Status
            </a>
          </div>
          <div
            style={styles.buttonBox}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <a href="/student/presentations" style={styles.buttonLink}>
              Panel Assigned
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage:
      'url("https://www.aitrec.org/wp-content/uploads/2022/08/project-management.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  buttonGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
    width: "80%",
    maxWidth: "800px",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    color: "white",
    height: "100px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  buttonLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
};
