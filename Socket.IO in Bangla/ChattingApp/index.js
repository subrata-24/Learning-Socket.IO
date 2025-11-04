//create express server
const express = require("express");
const app = express();
const http = require("http");
const expressServer = http.createServer(app);
const PORT = 3000;
const path = require("path");

//Create socket server
const { Server } = require("socket.io");
const socketServer = new Server(expressServer);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

socketServer.on("connection", (socket) => {
  socket.on("chat", (msg) => {
    socket.emit("msg_transfer", msg);
  });
});

expressServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
