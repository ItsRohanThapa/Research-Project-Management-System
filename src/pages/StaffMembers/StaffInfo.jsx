import React from "react";
import axios from "axios";
import { isAuthenticated, logout } from "../../helpers/auth";
export default class StaffInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      staff: [],
    };
  }

  componentDidMount() {
    const USER = isAuthenticated();
    if (USER.userType !== "Staff") {
      window.location.replace("/login");
    }
    this.retrieveStaff();
  }

  retrieveStaff() {
    axios.get("http://localhost:5001/staff/view").then((res) => {
      if (res.data.success) {
        console.log("RESPONSE", res.data.existingStaff);
        this.setState({
          // staff:res.data.existingStaff
          staff: res.data.existingStaff.filter((d) => d.userType === "Staff"),
        });

        console.log(this.state.staff);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:5001/staff/delete/${id}`).then((res) => {
      alert("Deleted successfully !!!");
      this.retrieveStaff();
    });
  };

  filterData(staff, searchKey) {
    const result = staff.filter((post) =>
      // post.firstName.toLowerCase().includes(searchKey) ||
      // post.lastName.toLowerCase().includes(searchKey) ||
      post.email.toLowerCase().includes(searchKey)
    );
    this.setState({ staff: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5001/staff/view").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingStaff, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="statusRe-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <br></br>
              <br></br>
              <br></br>
              <h1>
                <center>
                  <b>All Staff Details</b>
                </center>
              </h1>{" "}
              <br></br>
            </div>
            <div className="col-lg-3 mt-2 mb-2">
              <br></br>
              <br></br>
              <br></br>
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search ..."
                name="searchQue"
                onChange={this.handleSearchArea}
              ></input>
            </div>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th scope="col"> Index </th>
                <th scope="col"> Staff ID </th>
                <th scope="col"> Designation </th>
                <th scope="col"> First Name </th>
                <th scope="col"> Last Name </th>
                <th scope="col"> Research Topic </th>
                <th scope="col"> Email </th>
                <th scope="col"> Username </th>
              </tr>
            </thead>

            <tbody>
              {this.state.staff.map((staff, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{staff.userID}</td>
                  <td>{staff.userSubType}</td>
                  <td>{staff.firstName}</td>
                  <td>{staff.lastName}</td>
                  <td>{staff.topicArea}</td>
                  <td>{staff.email}</td>
                  <td>{staff.username}</td>
                  <td>
                    <a
                      className="btn btn-secondary btn-sm btn-block"
                      href="#"
                      onClick={() => this.onDelete(staff._id)}
                    >
                      <i className="far fa-trash-alt"></i>&nbsp;DELETE
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
