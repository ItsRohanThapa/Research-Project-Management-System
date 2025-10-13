import React from "react";
import axios from "axios";

export default class getAllStudents extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      existingUser: [],
    };
  }

  componentDidMount() {
    this.retrieveAllUser();
  }

  retrieveAllUser() {
    axios.get("http://localhost:5001/getAllUsers").then((res) => {
      if (res.data.success) {
        console.log("Hellooo", res.data.existingUser);
        this.setState({
          existingUser: res.data.existingUser,
        });
      }
    });
  }

  // onDelete = (id) => {
  //   axios.delete(`http://localhost:5001/panelMembers/delete/${id}`).then((res) => {
  //     alert("Deleted successfully !!!");
  //     this.retrievePanelmembers();
  //   })
  // }

  // filterData(existingUser,searchKey){
  //   const result = panelmembers.filter((post) =>
  //   post.staffID.toLowerCase().includes(searchKey) ||
  //   post.panelmemberID.includes(searchKey) ||
  //   post.panelmemberName.includes(searchKey) ||
  //   post.p_researchArea.includes(searchKey)
  //   )

  //   this.setState({panelmembers:result})
  // }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/panelMembers/view/").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.PanelMembersList, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="viewPanelMember-container">
        <div className="row">
          <div className="col-lg-9 mt-2 mb-2">
            <br></br>
            <br></br>
            <br></br>
            <h1>
              <center>
                <b>All Students Details</b>
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
              <th scope="col"> Index</th>
              <th scope="col"> Full Name</th>
              <th scope="col"> Student ID</th>
              <th scope="col">NIC</th>
              <th scope="col">E-Mail</th>
              <th scope="col">specialization</th>
            </tr>
          </thead>

          <tbody>
            {console.log("State user", this.state.existingUser)}
            {this.state.existingUser?.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.fullName}</td>
                <td>{user.stdID}</td>
                <td>{user.NIC}</td>
                <td>{user.stdEmail}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.specialization}</td>
                <td>
                  <a
                    className="btn btn-secondary btn-sm btn-block"
                    href={`/edit/${user._id}`}
                  >
                    <i className="fas fa-edit"></i>&nbsp;UPDATE
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-secondary btn-sm btn-block"
                    href="#"
                    onClick={() => this.onDelete(user._id)}
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;DELETE
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
