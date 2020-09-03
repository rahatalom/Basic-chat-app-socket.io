const socket = require("socket.io");

const express = require("express");

const app = express();

var server = app.listen(4000, function () {
  console.log("Server started on port 4000");
});

var io = socket(server);

io.on("connection", function (socket) {
  console.log("We in boys", socket.id);

  socket.on("chat", function (data) {
    io.sockets.emit("chat", data);
  });
  socket.on("typing", function (data) {
    socket.broadcast.emit("typing", data);
  });
  socket.on("join", function (data) {
    socket.broadcast.emit("join", data);
  });
});
