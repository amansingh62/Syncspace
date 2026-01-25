"use client";

import { useEffect, useState, use } from "react";

interface Message {
  id: string;
  content: string;
  user: {
    id: string;
    name: string;
  };
}

interface MessagesResponse {
  messages: Message[];
  nextCursor: string | null;
}

export default function ChannelPage({
  params,
}: {
  params: Promise<{ workspaceId: string; channelId: string }>;
}) {
  const { workspaceId, channelId } = use(params);

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/channels/${channelId}/messages`,
      { credentials: "include" }
    )
      .then(async res => {
        if (!res.ok) {
          const err = await res.json().catch(() => null);
          throw new Error(err?.message || "Failed to load messages");
        }
        return res.json();
      })
      .then((data: MessagesResponse) => {
        if (Array.isArray(data.messages)) {
          setMessages(data.messages);
        } else {
          setMessages([]); 
        }
      })
      .catch(err => {
        console.error(err);
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

    const newMessage: Message = await res.json();

    setMessages(prev => [...prev, newMessage]);
    setText("");
  }

  return (
    <>
      <div className="h-[70vh] overflow-y-auto border p-3 rounded">
        {error && (
          <p className="text-red-500 text-sm mb-2">{error}</p>
        )}

        {messages.length === 0 && !error && (
          <p className="text-gray-400 text-sm">No messages yet</p>
        )}

        {messages.map(msg => (
          <div key={msg.id}>
            <strong>{msg.user.name}</strong>: {msg.content}
          </div>
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
