// Import required modules
const express = require("express");
const app = express();
const http = require("http");

// Create an HTTP server using the Express app
const expressServer = http.createServer(app);
const PORT = 3000;
const path = require("path");

// Import and setup Socket.IO server
const { Server } = require("socket.io");
const io = new Server(expressServer); // This sets up the main Socket.IO server

// Serve the HTML page on root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
  //create kitchen room under default/main namespace
  socket.join("kitchen-room");
  //Divide one room in many part
  io.sockets.in("kitchen-room").emit("cooking", "I am cooking food"); //TO connect on kitchen room the client must use the custom event name
  io.sockets.in("kitchen-room").emit("boiling", "I am boiling water");

  //create bed room under default/main namespace
  socket.join("bed-room");
  io.sockets.in("bed-room").emit("sleeping", "I am sleeping");
  io.sockets.in("bed-room").emit("rest", "I am taking rest");
});

expressServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
