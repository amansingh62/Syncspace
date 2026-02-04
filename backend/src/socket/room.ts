import type { Socket } from "socket.io";

export function registerRoomHandlers(socket: Socket) {
  socket.on("join-workspace", (workspaceId: string) => {
    socket.join(`workspace:${workspaceId}`);
    console.log(`User ${socket.data.userId} joined workspace:${workspaceId}`);
  });

  socket.on("leave-workspace", (workspaceId: string) => {
    socket.leave(`workspace:${workspaceId}`);
    console.log(`User ${socket.data.userId} left workspace:${workspaceId}`);
  });

  socket.on("join-channel", (channelId: string) => {
    socket.join(`channel:${channelId}`);
    console.log(`User ${socket.data.userId} joined channel:${channelId}`);
  });

  socket.on("leave-channel", (channelId: string) => {
    socket.leave(`channel:${channelId}`);
    console.log(`User ${socket.data.userId} left channel:${channelId}`);
  });
}