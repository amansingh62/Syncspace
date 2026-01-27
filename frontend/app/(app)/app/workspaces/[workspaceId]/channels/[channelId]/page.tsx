"use client";

import { useEffect, useState, use } from "react";
import MessageItem from "./MessageItem";
import type { ApiMessage, UiMessage } from "@/types/message";

interface MessagesResponse {
  messages: ApiMessage[];
  nextCursor: string | null;
}

export default function ChannelPage({
  params,
}: {
  params: Promise<{ workspaceId: string; channelId: string }>;
}) {
  const { workspaceId, channelId } = use(params);

  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
      credentials: "include",
    })
      .then(res => (res.ok ? res.json() : null))
      .then(user => {
        if (user?.id) setCurrentUserId(user.id);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/channels/${channelId}/messages`,
      { credentials: "include" }
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to load messages");
        return res.json();
      })
      .then((data: MessagesResponse) => {
        const safeMessages: UiMessage[] = data.messages
          .filter((m): m is ApiMessage & { user: NonNullable<ApiMessage["user"]> } => !!m.user)
          .map(m => ({
            id: m.id,
            content: m.content,
            user: m.user,
          }));

        setMessages(safeMessages);
      })
      .catch(err => {
        setError(err.message);
        setMessages([]);
      });
  }, [workspaceId, channelId]);

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/channels/${channelId}/messages`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      }
    );

    if (!res.ok) return;

    const newMessage: ApiMessage = await res.json();
    if (!newMessage.user) {
      console.error("Received message without user data");
      return;
    }

    const uiMessage: UiMessage = {
      id: newMessage.id,
      content: newMessage.content,
      user: newMessage.user,
    };

    setMessages(prev => [...prev, uiMessage]);
    setText("");
  }

  return (
    <>
      <div className="h-[70vh] overflow-y-auto border p-3 rounded">
        {error && <p className="text-red-500 text-sm">{error}</p>}

        {!error && messages.length === 0 && (
          <p className="text-gray-400 text-sm">No messages yet</p>
        )}

        {messages.map(msg => (
          <MessageItem
            key={msg.id}
            message={msg}
            workspaceId={workspaceId}
            channelId={channelId}
            currentUserId={currentUserId ?? ""}
            onUpdated={updated => {
              if (!updated.user) {
                console.error("Updated message missing user data");
                return;
              }
              
              setMessages(prev =>
                prev.map(m => (m.id === updated.id ? updated : m))
              );
            }}
            onDeleted={id =>
              setMessages(prev => prev.filter(m => m.id !== id))
            }
          />
        ))}
      </div>

      <form onSubmit={sendMessage} className="flex gap-2 mt-3">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Message #channel"
          className="flex-1 border px-2 py-1 rounded"
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}