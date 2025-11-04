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

/*
  Create and configure custom namespaces:
  - A namespace is a separate communication "channel" under the same Socket.IO server.
  - Clients must explicitly connect to a namespace to exchange events/messages through it.
*/

// Create '/chat' namespace
let chatSocket = io.of("/chat");

// Handle connections to '/chat' namespace
chatSocket.on("connection", (socket) => {
  // Emit 'customEvent' to ALL clients connected to /chat namespace
  chatSocket.emit("customEvent", "Lets start chatting");
});

// Create '/admin' namespace
let adminSocket = io.of("/admin");

// Handle connections to '/admin' namespace
adminSocket.on("connection", (socket) => {
  // Emit 'customEvent' to ALL clients connected to /admin namespace
  adminSocket.emit("customEvent", "I am only for admin panel");
});

// Start the HTTP server
expressServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
