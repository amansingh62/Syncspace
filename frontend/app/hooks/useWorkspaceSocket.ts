"use client";

import { useEffect } from "react";
import { getSocket } from "@/lib/socket";

export function useWorkspaceSocket(workspaceId: string) {
  useEffect(() => {
    const socket = getSocket();

    // Wait for socket to be connected before joining workspace
    const joinWorkspace = () => {
      if (socket.connected) {
        console.log("Joining workspace:", workspaceId);
        socket.emit("join-workspace", workspaceId);
      }
    };

    // If already connected, join immediately
    if (socket.connected) {
      joinWorkspace();
    } else {
      // Otherwise wait for connection
      socket.once("connect", joinWorkspace);
    }

    return () => {
      // Clean up: leave workspace
      if (socket.connected) {
        socket.emit("leave-workspace", workspaceId);
      }
      socket.off("connect", joinWorkspace);
    };
  }, [workspaceId]);
}