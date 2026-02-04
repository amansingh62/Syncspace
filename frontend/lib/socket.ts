import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const apiUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!apiUrl) {
      throw new Error("NEXT_PUBLIC_API_URL is not defined");
    }

    socket = io(apiUrl, {
      withCredentials: true,
      autoConnect: true,
      transports: ["websocket", "polling"],
    });

    // Log connection events for debugging
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket?.id);
    });

    socket.on("disconnect", (reason) => {
      console.log("❌ Socket disconnected:", reason);
    });

    socket.on("connect_error", (error) => {
      console.error("🔴 Socket connection error:", error.message);
    });
  }

  return socket;
};
