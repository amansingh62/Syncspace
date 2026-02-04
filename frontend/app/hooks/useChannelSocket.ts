"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";
import type { UiMessage } from "@/types/message";

interface ChannelSocketOptions {
  workspaceId: string;
  channelId: string;
  onMessageNew: (msg: UiMessage) => void;
  onMessageUpdated: (msg: UiMessage) => void;
  onMessageDeleted: (id: string) => void;
}

export function useChannelSocket({
  workspaceId,
  channelId,
  onMessageNew,
  onMessageUpdated,
  onMessageDeleted,
}: ChannelSocketOptions) {
  useEffect(() => {
    const socket = getSocket();

    // Wait for socket to be connected before joining rooms
    const joinRooms = () => {
      if (socket.connected) {
        console.log("Joining workspace:", workspaceId, "channel:", channelId);
        socket.emit("join-workspace", workspaceId);
        socket.emit("join-channel", channelId);
      }
    };

    // If already connected, join immediately
    if (socket.connected) {
      joinRooms();
    } else {
      // Otherwise wait for connection
      socket.once("connect", joinRooms);
    }

    // Set up message listeners
    socket.on("message:new", onMessageNew);
    socket.on("message:updated", onMessageUpdated);
    socket.on("message:deleted", ({ id }) => onMessageDeleted(id));

    return () => {
      // Clean up: leave channel and remove listeners
      if (socket.connected) {
        socket.emit("leave-channel", channelId);
      }
      socket.off("message:new", onMessageNew);
      socket.off("message:updated", onMessageUpdated);
      socket.off("message:deleted");
      socket.off("connect", joinRooms);
    };
  }, [workspaceId, channelId, onMessageNew, onMessageUpdated, onMessageDeleted]);
}
