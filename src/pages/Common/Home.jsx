import React, { Component } from "react";
import axios from "axios";

export default class Home extends Component {
  render() {
    return (
      <center>
        <div className="Home_container">
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
          <br></br>
          <br></br>
          <b></b>
          <h1 style={styles.title}>
            <i>PROJEXPERT</i>
          </h1>
          <h3 style={styles.tagline}>Where Research Meets Efficiency</h3>
        </div>
      </center>
    );
  }
}
const styles = {
  title: {
    fontSize: "4rem",
    margin: "0 0 20px 0",
    color: "#00008B", // Bluish white color
  },
  tagline: {
    fontSize: "1.5rem",
    color: "#00008B", // Bluish white color
  },
};
