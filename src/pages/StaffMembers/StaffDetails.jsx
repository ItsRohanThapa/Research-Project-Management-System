import React, { Component } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
//import { useParams } from 'react-router-dom';
import { isAuthenticated, logout } from "../../helpers/auth";

export default class StaffDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    const USER = isAuthenticated();
    if (USER.userType !== "Staff") {
      window.location.replace("/login");
    }
    const { id } = useParams();

    axios.get(`http://localhost:5001/staff/view/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          user: res.data.user,
        });

        console.log(this.state.user);
      }
    });
  }
  render() {
    const {
      firstName,
      lastName,
      userID,
      userType,
      userSubType,
      topicArea,
      email,
      username,
    } = this.state.user;
    return (
      <div className="details_container">
        <div className="container">
          <div style={{ marginTop: "20px" }}>
            <br />
            <br />
            <br />
            <h2>
              <b>
                {firstName}&nbsp;&nbsp;{lastName}
              </b>
            </h2>
            <hr />
            <br />
            <dl className="row">
              <dt className="col-sm-3">User ID</dt>
              <dd className="col-sm-9">{userID}</dd>

              <dt className="col-sm-3">Staff Designation</dt>
              <dd className="col-sm-9">{userSubType}</dd>

              <dt className="col-sm-3">Topic Area</dt>
              <dd className="col-sm-9">{topicArea}</dd>

              <dt className="col-sm-3">Email</dt>
              <dd className="col-sm-9">{email}</dd>

              <dt className="col-sm-3">Username</dt>
              <dd className="col-sm-9">{username}</dd>
            </dl>
            <br />
            <br /> <br />
            <br /> <br />
            <br /> <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}
