import React from "react";
import axios from "axios";

export default class ViewFinalMarks extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      finalmarks: [],
    };
  }

  componentDidMount() {
    this.retrieveFinalmarks();
  }

  retrieveFinalmarks() {
    axios.get("http://localhost:5001/finalMarks/view/").then((res) => {
      if (res.data.success) {
        this.setState({
          finalmarks: res.data.FinalMarksList,
        });

        console.log(this.state.finalmarks);
      }
    });
  }

  onDelete = (id) => {
    axios
      .delete(`http://localhost:5001/finalMarks/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully !!!");
        this.retrieveFinalmarks();
      });
  };

  filterData(finalmarks, searchKey) {
    const result = finalmarks.filter(
      (post) =>
        post.panelGroupID.toLowerCase().includes(searchKey) ||
        post.studentGroupID.includes(searchKey) ||
        post.charter.includes(searchKey) ||
        post.pro_proposal.toLowerCase().includes(searchKey) ||
        post.pp_01.includes(searchKey) ||
        post.pp_02.includes(searchKey) ||
        post.final_report.includes(searchKey) ||
        post.App_Banner.toLowerCase().includes(searchKey) ||
        post.finalmark.includes(searchKey) ||
        post.finalgrade.includes(searchKey)
    );

    this.setState({ finalmarks: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/panel/view/").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.finalmarks, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="viewFinalmarks-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <br></br>
              <br></br>
              <br></br>
              <button className="btn btn-secondary btn-lg active">
                <a
                  href="/panelhome"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {" "}
                  BACK{" "}
                </a>
              </button>
              <h1>
                <center>
                  <b>Final Marks Details</b>
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
                <th scope="col"> panel Group ID</th>
                <th scope="col">Student Group ID</th>
                <th scope="col"> pp_01</th>
                <th scope="col">pp_02</th>
                <th scope="col">Final Report</th>
                <th scope="col">Final Marks</th>
                <th scope="col">Final Grade</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              {this.state.finalmarks.map((finalmarks, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{finalmarks.panelGroupID}</td>
                  <td>{finalmarks.studentGroupID}</td>
                  <td>{finalmarks.pp_01}</td>
                  <td>{finalmarks.pp_02}</td>
                  <td>{finalmarks.final_report}</td>
                  <td>{finalmarks.finalmark}</td>
                  <td>{finalmarks.finalgrade}</td>
                  <td>
                    <a
                      className="btn btn-secondary btn-sm btn-block"
                      href={`/edit/${finalmarks._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;UPDATE
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-secondary btn-sm btn-block"
                      href="#"
                      onClick={() => this.onDelete(finalmarks._id)}
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
