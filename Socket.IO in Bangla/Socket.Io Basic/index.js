//make http express server
const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
const PORT = 3000;
const path = require("path");

//make socket.io server
const { Server } = require("socket.io");
const io = new Server(expressServer);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  console.log("User is connected");
  //If use io. then it send the message or change to all conneceted client with this server
  //If use socket. it refers to only one client who is currently connected or whom data is change.Only he get the updated message/change.
  io.sockets.emit(
    "broadcastEvent",
    "Broadcast this message to all users who are connected"
  );
});

expressServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
