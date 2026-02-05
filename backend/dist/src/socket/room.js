export function registerRoomHandlers(socket) {
    socket.on("join-workspace", (workspaceId) => {
        socket.join(`workspace:${workspaceId}`);
        console.log(`User ${socket.data.userId} joined workspace:${workspaceId}`);
    });
    socket.on("leave-workspace", (workspaceId) => {
        socket.leave(`workspace:${workspaceId}`);
        console.log(`User ${socket.data.userId} left workspace:${workspaceId}`);
    });
    socket.on("join-channel", (channelId) => {
        socket.join(`channel:${channelId}`);
        console.log(`User ${socket.data.userId} joined channel:${channelId}`);
    });
    socket.on("leave-channel", (channelId) => {
        socket.leave(`channel:${channelId}`);
        console.log(`User ${socket.data.userId} left channel:${channelId}`);
    });
}
//# sourceMappingURL=room.js.map