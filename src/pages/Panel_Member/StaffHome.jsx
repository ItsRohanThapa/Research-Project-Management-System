import React, { Component } from "react";
import axios from "axios";
import { isAuthenticated, logout } from "../../helpers/auth";

export default class StaffHome extends Component {
  componentDidMount() {
    if (isAuthenticated() === false) {
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
        <center>
          <div style={styles.overlay}>
            <form style={styles.form}>
              <div
                style={styles.buttonBox}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                <a href="/supHome" style={styles.buttonLink}>
                  Supervisor/ Co-supervisor
                </a>
              </div>
              <div
                style={styles.buttonBox}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
              >
                <a href="/panelhome" style={styles.buttonLink}>
                  Research Panels
                </a>
              </div>
            </form>
          </div>
        </center>
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
      "url(https://www.aitrec.org/wp-content/uploads/2022/08/project-management.jpg)", // Replace with the correct path to your image
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: "20px",
    borderRadius: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  buttonBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#007bff",
    color: "white",
    height: "100px",
    width: "300px",
    textAlign: "center",
    borderRadius: "10px",
    margin: "20px 0",
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
