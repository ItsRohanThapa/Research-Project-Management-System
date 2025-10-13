import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser, setSelectedChat } from "../../helpers/auth";

const ChatRoom = (props) => {
  const [chatlist, SetChatlist] = useState([]);

  const [mylist, SetMylist] = useState([]);

  useEffect(() => {
    function getData() {
      var user = getCurrentUser();
      var userType = user.userType;
      var userSubType = user.userSubType;
      var userId = user.userID;
      var stdID = user.stdID;
      var config = {};
      if (userType == "Staff" && userSubType == "Supervisor") {
        config = {
          method: "get",
          url: `http://localhost:5001/chat/getChatsByStaff?supervisor=${userId}`,
          headers: {},
        };
      }
      if (userType == "Staff" && userSubType == "Co-Supervisor") {
        config = {
          method: "get",
          url: `http://localhost:5001/chat/getChatsByStaff?co_supervisor=${userId}`,
          headers: {},
        };
      }
      if (userType == "Student") {
        config = {
          method: "get",
          url: `http://localhost:5001/chat/getChatsByStudent?id=${stdID}`,
          headers: {},
        };
      }

      axios(config)
        .then(function (response) {
          console.log(response.data.groupList);
          SetMylist(response.data.groupList);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    getData();
  }, []);

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <center>
        <h2>Chat Room</h2>
      </center>
      <br />
      <div style={{ display: "grid", placeContent: "center" }}>
        {mylist.map((item) => (
          <div>
            <button
              style={{
                width: "400px",
                backgroundColor: "#4CAF50",
                margin: "10px",
              }}
              color="success"
              onClick={(e) => {
                setSelectedChat(item.groupID);
                window.location.href = "chat";
              }}
            >
              {item.groupID}
            </button>
          </div>
        ))}
      </div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default ChatRoom;
