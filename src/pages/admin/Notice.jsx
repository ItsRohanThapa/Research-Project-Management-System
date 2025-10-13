import React, { Component } from "react";
import axios from "axios";

export default class Notice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      noticeHeader: "",
      description: "",
      downdocument: "",
    };
  }

  componentDidMount() {
    const myArray = window.location.pathname.split("/", 4);
    console.log(myArray[3]);
    let id = myArray[3];
    axios.get(`http://localhost:5001/notices/view/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          noticeHeader: res.data.Notice.noticeHeader,
          description: res.data.Notice.description,
          downdocument: res.data.Notice.docURL,
        });
      }
    });
  }

  render() {
    return (
      <div className="admin-container">
        <center>
          <br />
          <br />
          <br />
          <h2>{this.state.noticeHeader}</h2>
          <br />
          <h4>{this.state.description}</h4>
          <br />
          <a
            className="btn btn-danger"
            onClick={() => (location.href = this.state.downdocument)}
          >
            Download Document
          </a>
          <br />
          <br />
        </center>
      </div>
    );
  }
}
