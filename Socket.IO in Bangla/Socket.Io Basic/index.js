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

expressServer.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
