import React, { Component } from 'react'

export default class ManageNotices extends Component {
    render() {
        return (
            <div className="admin-container">
                <div>
                <center>
                <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <h1>MANAGE NOTICES</h1>
                    <br/>
                    <br/>
                    <br/>
                    
                    <form>
            <button className="btn btn-secondary btn-lg">
              <a
                href="/admin/newNotice"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                Publish New Notice{" "}
              </a>
            </button>{" "}

            <button className="btn btn-secondary btn-lg">
              <a
                href="/admin/viewNotices"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                View All Notices{" "}
              </a>
            </button>{" "}
          </form>
                    </center>
                </div>
            </div>
        )
    }
}