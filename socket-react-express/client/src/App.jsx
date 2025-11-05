import React from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

const App = () => {
  const socket = io("http://localhost:3000/");

  useEffect(() => {
    socket.on("message", (msg) => {
      console.log(msg);
    });
  }, []);

  return <div>Hello</div>;
};

export default App;
