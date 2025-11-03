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
  // When a client connects to the server using Socket.IO, the socket object represents that specific client’s connection. So, any work or communication related to that particular client happens through this socket object.on,emit,login

  //   setTimeout(() => {
  //     //Through a message to client after ten second
  //     socket.send("Hello Subrata(server-->client)");
  //   }, 2000);

  //Send time after every ten second
  setInterval(() => {
    const d = new Date();
    const t = d.getTime();
    socket.send(t);
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
