const { Server } = require("socket.io");

let io;
const onlineUsers = new Map();

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("join", ({ userId }) => {
      if (!userId) return;

      const room = `user:${userId}`;
      socket.join(room);
      onlineUsers.set(userId.toString(), socket.id);
      io.emit("user:online", { userId });
    });

    socket.on("taskCreated", (task) => socket.broadcast.emit("taskCreated", task));
    socket.on("taskUpdated", (task) => socket.broadcast.emit("taskUpdated", task));
    socket.on("taskMoved", (task) => socket.broadcast.emit("taskMoved", task));
    socket.on("taskDeleted", (id) => socket.broadcast.emit("taskDeleted", id));

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          io.emit("user:offline", { userId });
          break;
        }
      }
    });
  });

  return io;
};

const emitToUser = (userId, event, payload) => {
  if (!io || !userId) return;

  io.to(`user:${userId}`).emit(event, payload);
};

module.exports = {
  initSocket,
  emitToUser,
};
