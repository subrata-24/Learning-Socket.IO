const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io"); //Server is a class

const app = express();
const PORT = 3000;

// Create HTTP server with Express app
const expressServer = http.createServer(app);

// Attach Socket.IO to the HTTP server.This can be any name
const io = new Server(expressServer);

io.on("connection", (socket) => {
  console.log("New user connected");

  setInterval(() => {
    const d = new Date();
    const t = d.getTime();
    socket.emit("customeEvent", t);
  }, 10);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

expressServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
