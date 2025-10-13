import React from "react";
import axios from "axios";
import { getCurrentUser, setSelectedChat } from "../../helpers/auth";

export default class ViewAllRequests extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statusRe: [],
    };
  }

  componentDidMount() {
    this.retrieveStatusRe();
  }

  retrieveStatusRe() {
    axios.get("http://localhost:5001/topic/status").then((res) => {
      if (res.data.success) {
        console.log("RESPONSE", res.data.statsTopics);
        this.setState({
          // staff:res.data.statsTopics
          statusRe: res.data.statsTopics.filter((d) => d.userType === "Staff"),
        });

        console.log(this.state.statusRe);
      }
    });
  }
  retrieveStatusRe() {
    var user = getCurrentUser();
    axios
      .get(`http://localhost:5001/topic/status?id=${user.userID}`)
      .then((res) => {
        if (res.data.success) {
          this.setState({
            statusRe: res.data.statsTopics,
          });

          console.log(this.state.statusRe);
        }
      });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:5001/staff/delete/${id}`).then((res) => {
      alert("Deleted successfully !!!");
      this.retrieveStatusRe();
    });
  };

  filterData(statusRe, searchKey) {
    const result = statusRe.filter(
      (post) =>
        post.groupID.toLowerCase().includes(searchKey) ||
        post.supervisorID.toLowerCase().includes(searchKey) ||
        post.topic.toLowerCase().includes(searchKey)
    );
    this.setState({ statusRe: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios
      .get(`http://localhost:5001/topic/status?id=${user.userID}`)
      .then((res) => {
        if (res.data.success) {
          this.filterData(res.data.statsTopics, searchKey);
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
                  <b>All Request Topics </b>
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
                <th scope="col"> Group ID </th>
                <th scope="col"> Supervisor </th>
                <th scope="col"> Topics </th>
              </tr>
            </thead>

            <tbody>
              {this.state.statusRe.map((statusRe, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{statusRe.groupID}</td>
                  <td>{statusRe.supervisorID}</td>
                  <td>{statusRe.topic}</td>
                  <td>
                    <a
                      className="btn btn-secondary btn-sm btn-block"
                      href={`/accept/add?id=${statusRe._id}`}
                    >
                      <i className="fa fa-eye"></i>&nbsp;VIEW
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>{" "}
      </div>
    );
  }
}
