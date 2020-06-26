const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users.js");

const PORT = process.env.PORT || 5000;

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//Middleware
app.use(router);
app.use(cors());

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit("message", {
      user: "admin",
      text: `${
        user.name.charAt(0).toUpperCase() + user.name.slice(1)
      }, welcome to room ${
        user.room.charAt(0).toUpperCase() + user.room.slice(1)
      }`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${
        user.name.charAt(0).toUpperCase() + user.name.slice(1)
      } joined room ${user.room.charAt(0).toUpperCase() + user.room.slice(1)}`,
    });
    socket.join(user.room);

    io.to(user.room).emit("dataRoom", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${
          user.room.charAt(0).toUpperCase() + user.room.slice(1)
        } has left the room`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
