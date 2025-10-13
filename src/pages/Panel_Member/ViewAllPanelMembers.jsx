import React from "react";
import axios from "axios";

export default class ViewAllPanelMembers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panelmembers: [],
    };
  }

  componentDidMount() {
    this.retrievePanelmembers();
  }

  retrievePanelmembers() {
    axios.get("http://localhost:5001/panelMembers/view/").then((res) => {
      if (res.data.success) {
        this.setState({
          panelmembers: res.data.PanelMembersList,
        });

        console.log(this.state.panelmembers);
      }
    });
  }

  onDelete = (id) => {
    axios
      .delete(`http://localhost:5001/panelMembers/delete/${id}`)
      .then((res) => {
        alert("Deleted successfully !!!");
        this.retrievePanelmembers();
      });
  };

  filterData(panelmembers, searchKey) {
    const result = panelmembers.filter(
      (post) =>
        post.staffID.toLowerCase().includes(searchKey) ||
        post.panelmemberID.includes(searchKey) ||
        post.panelmemberName.includes(searchKey) ||
        post.p_researchArea.includes(searchKey)
    );

    this.setState({ panelmembers: result });
  }

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
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <br></br>
              <br></br>
              <br></br>
              <h1>
                <center>
                  <b>Panel Members Details</b>
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
                <th scope="col"> Staff ID</th>
                <th scope="col">Panel Member ID</th>
                <th scope="col">Panel Member Name</th>
                <th scope="col">Research Area</th>
              </tr>
            </thead>

            <tbody>
              {this.state.panelmembers.map((panelmembers, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{panelmembers.staffID}</td>
                  <td>{panelmembers.panelmemberID}</td>
                  <td>{panelmembers.panelmemberName}</td>
                  <td>{panelmembers.p_researchArea}</td>
                  <td>
                    <a
                      className="btn btn-secondary btn-sm btn-block"
                      href={`/edit/${panelmembers._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;UPDATE
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-secondary btn-sm btn-block"
                      href="#"
                      onClick={() => this.onDelete(panelmembers._id)}
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
