import React, { Component } from "react";
import axios from "axios";
import { isAuthenticated, logout } from "../../helpers/auth";

export default class ViewNoticesStudent extends Component {
  componentDidMount() {
    const USER = isAuthenticated();
    if (USER.userType !== "Student") {
      window.location.replace("/login");
    }
  }

  constructor(props) {
    super(props);

    this.state = {
      noticeList: [],
    };
  }

  componentDidMount() {
    this.retrieveNotices();
  }

  retrieveNotices() {
    axios
      .get("http://localhost:5001/notices/viewByRole/student")
      .then((res) => {
        if (res.data.success) {
          this.setState({
            noticeList: res.data.noticeList,
          });
          console.log(this.state.noticeList);
          console.log(window.location.pathname);
          const myArray = window.location.pathname.split("/", 3);
          console.log(myArray[2]);
        }
      });
  }

  navigate = (category, id) => {
    if (category == "topic") {
      location.href = `/student/NoticeTopic/${id}`;
    } else if (category == "document") {
      location.href = `/student/NoticeDocument/${id}`;
    } else if (category == "presentation") {
      location.href = `/student/NoticePresentation/${id}`;
    } else {
      location.href = `/admin/Notice/${id}`;
    }
  };

  render() {
    return (
      <div className="admin-container">
        <div className="container">
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h2>Student Notices</h2>
            </div>
          </div>

          <table class="table" id="table">
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Notice Header</th>
                <th scope="col">More Details</th>
              </tr>
            </thead>
            <tbody>
              {this.state.noticeList.map((noticeList, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{noticeList.noticeHeader}</td>
                  <td>
                    <a
                      className="btn btn-success"
                      onClick={() =>
                        this.navigate(noticeList.noticeCategory, noticeList._id)
                      }
                    >
                      View
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
