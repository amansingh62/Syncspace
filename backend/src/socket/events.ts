import type { Socket } from "socket.io";
import { getIO } from "./index.js";

export function registerEventHandlers(socket: Socket) {
  const userId = socket.data.userId;
  const io = getIO();

  io.emit("presence:online", userId);

  socket.on("disconnect", () => {
    io.emit("presence:offline", userId);
  });

  socket.on("typing:start", ({ channelId }) => {
    socket.to(`channel:${channelId}`).emit("typing:start", {
      userId,
      userName: socket.data.userName,
      channelId 
    });
  });

  socket.on("typing:stop", ({ channelId }) => {
    socket.to(`channel:${channelId}`).emit("typing:stop", {
      userId,
      channelId  
    });
  });
}