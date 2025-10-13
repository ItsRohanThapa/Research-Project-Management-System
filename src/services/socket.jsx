import socketIOClient from "socket.io-client";

// const serverEndpoint = "<your-nodejs-server-url>";
const serverEndpoint = "http://localhost:5001";
// const serverEndpoint = "https://mychat-api.herokuapp.com";

export const socket = socketIOClient(serverEndpoint, {
  transports: ["websocket"],
});
