import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";

//create express server
const app = express();
const PORT = 3000;
const server = createServer(app);

//create socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.get("/", (req, res) => {
  res.send("Hello world!!");
});

io.on("connection", (socket) => {
  console.log("User is connected");
  console.log("Socket ID", socket.id);
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
