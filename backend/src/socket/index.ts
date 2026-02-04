import { Server } from "socket.io";
import type { Server as HttpServer } from "http";
import { socketAuth } from "../middlewares/socketAuthMiddleware.js";
import { registerRoomHandlers } from "./room.js";
import { registerEventHandlers } from "./events.js";

let io: Server | null = null;

export function initSocket(server: HttpServer) {
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) {
    console.warn("⚠️  FRONTEND_URL not set, socket CORS may fail");
  }

  io = new Server(server, {
    cors: {
      origin: frontendUrl || "*",
      credentials: true,
      methods: ["GET", "POST"],
    },
    transports: ["websocket", "polling"],
  });

  io.use(socketAuth);

  io.on("connection", socket => {
    console.log("Socket connected:", socket.data.userId);

    registerRoomHandlers(socket);
    registerEventHandlers(socket);

    socket.on("disconnect", () => {
      console.log("Socket disconnected:", socket.data.userId);
    });
  });

  return io;
}

export function getIO(): Server {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
}
