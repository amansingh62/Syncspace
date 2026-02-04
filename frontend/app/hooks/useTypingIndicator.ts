"use client";

import { useEffect, useState } from "react";
import { getSocket } from "@/lib/socket";

interface TypingUser {
  id: string;
  name: string;
}

export function useTypingIndicator(channelId: string) {
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);

  useEffect(() => {
    const socket = getSocket();

    // Handler functions that check channelId
    const handleTypingStart = ({ userId, userName, channelId: eventChannelId }: { 
      userId: string; 
      userName: string; 
      channelId: string;
    }) => {
      // Only process if it's for the current channel
      if (eventChannelId !== channelId) return;
      
      setTypingUsers(prev =>
        prev.some(u => u.id === userId)
          ? prev
          : [...prev, { id: userId, name: userName }]
      );
    };

    const handleTypingStop = ({ userId, channelId: eventChannelId }: { 
      userId: string; 
      channelId: string;
    }) => {
      // Only process if it's for the current channel
      if (eventChannelId !== channelId) return;
      
      setTypingUsers(prev =>
        prev.filter(u => u.id !== userId)
      );
    };

    socket.on("typing:start", handleTypingStart);
    socket.on("typing:stop", handleTypingStop);

    return () => {
      socket.off("typing:start", handleTypingStart);
      socket.off("typing:stop", handleTypingStop);
      // Clear typing users when switching channels
      setTypingUsers([]);
    };
  }, [channelId]);

  return typingUsers;
}