import React, { Component } from 'react'

export default class ManageTopics extends Component {
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
                    <h1>TOPIC MANAGEMENT</h1>
                    <br/>
                    <br/>
                    <br/>
                    
                    <form>
            <button className="btn btn-secondary btn-lg">
              <a
                href="/admin/supTopics"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                All Topics{" "}
              </a>
            </button>{" "}

            <button className="btn btn-secondary btn-lg">
              <a
                href="/admin/topics"
                style={{ textDecoration: "none", color: "white" }}
              >
                {" "}
                Accepted Topic{" "}
              </a>
            </button>{" "}

          </form>
                    </center>
                </div>
            </div>
        )
    }
}