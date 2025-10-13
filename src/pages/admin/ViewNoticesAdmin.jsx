import React, { Component } from "react";
import axios from "axios";

export default class ViewNoticesAdmin extends Component {
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
    axios.get("http://localhost:5001/notices/view/").then((res) => {
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

  onDelete = (id) => {
    axios.delete(`http://localhost:5001/notices/delete/${id}`).then((res) => {
      alert("Notice Deleted Successfully");
      this.retrieveNotices();
    });
  };

  download = (link) => {
    location.href = link;
  };

  render() {
    return (
      <div className="admin-container">
        <div className="container">
          <br />
          <br />
          <br />
          <br />

          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h2>All Notices</h2>
            </div>
          </div>

          <table class="table" id="table">
            <thead>
              <tr>
                <th scope="col">Count</th>
                <th scope="col">Notice Category</th>
                <th scope="col">Broadcast Type</th>
                <th scope="col">Notice Header</th>
                <th scope="col">Message</th>
                <th scope="col">Downloadable Content</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.noticeList.map((noticeList, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{noticeList.noticeCategory}</td>
                  <td>{noticeList.roleID}</td>
                  <td>{noticeList.noticeHeader}</td>
                  <td>{noticeList.description}</td>
                  <td>
                    <a
                      className="btn btn-secondary"
                      onClick={() => (location.href = noticeList.docURL)}
                    >
                      Download
                    </a>
                  </td>
                  <td>
                    <a
                      className="btn btn-danger"
                      onClick={() => this.onDelete(noticeList._id)}
                    >
                      Delete
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
