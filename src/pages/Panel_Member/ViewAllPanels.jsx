import React from "react";
import axios from "axios";

export default class ViewAllPanels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      panels: [],
    };
  }

  componentDidMount() {
    this.retrievePanels();
  }

  retrievePanels() {
    axios.get("http://localhost:5001/panel/view/").then((res) => {
      if (res.data.success) {
        this.setState({
          panels: res.data.PanelList,
        });

        console.log(this.state.panels);
      }
    });
  }

  onDelete = (id) => {
    axios.delete(`http://localhost:5001/panel/delete/${id}`).then((res) => {
      alert("Deleted successfully !!!");
      this.retrievePanels();
    });
  };

  filterData(panels, searchKey) {
    const result = panels.filter(
      (post) =>
        post.panelGroupID.toLowerCase().includes(searchKey) ||
        post.panelHead.includes(searchKey) ||
        post.panel_researchArea.includes(searchKey)
    );

    this.setState({ panels: result });
  }

  handleSearchArea = (e) => {
    const searchKey = e.currentTarget.value;

    axios.get("/panel/view/").then((res) => {
      if (res.data.success) {
        this.filterData(res.data.existingPanels, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="viewPanel-container">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <br></br>
              <br></br>
              <br></br>
              <h1>
                <center>
                  <b>Panel Details</b>
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
                <th scope="col">panel Head ID</th>
                <th scope="col">Research Area</th>
              </tr>
            </thead>

            <tbody>
              {this.state.panels.map((panels, index) => (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{panels.panelGroupID}</td>
                  <td>{panels.panelHead}</td>
                  <td>{panels.panel_researchArea}</td>
                  <td>
                    <a
                      className="btn btn-secondary btn-sm btn-block"
                      href={`/edit/${panels._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;UPDATE
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-secondary btn-sm btn-block"
                      href="#"
                      onClick={() => this.onDelete(panels._id)}
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
