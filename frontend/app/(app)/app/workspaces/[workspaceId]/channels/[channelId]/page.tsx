"use client";

import { useEffect, useState, use } from "react";
import { api } from "@/lib/axios";
import MessageItem from "./MessageItem";
import type { ApiMessage, UiMessage } from "@/types/message";
import type { AxiosError } from "axios";

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

  /* ---------- load current user ---------- */
  useEffect(() => {
    let cancelled = false;

    async function loadMe() {
      try {
        const res = await api.get<{ id: string }>("/auth/me");
        if (!cancelled) {
          setCurrentUserId(res.data.id);
        }
      } catch {
        // silently ignore
      }
    }

    loadMe();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ---------- load messages ---------- */
  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      try {
        const res = await api.get<MessagesResponse>(
          `/workspaces/${workspaceId}/channels/${channelId}/messages`
        );

        const safeMessages: UiMessage[] = res.data.messages
          .filter(
            (
              m
            ): m is ApiMessage & {
              user: NonNullable<ApiMessage["user"]>;
            } => !!m.user
          )
          .map(m => ({
            id: m.id,
            content: m.content,
            user: m.user,
          }));

        if (!cancelled) {
          setMessages(safeMessages);
          setError(null);
        }
      } catch (err: unknown) {
        const error = err as AxiosError<{ message?: string }>;
        if (!cancelled) {
          setError(
            error.response?.data?.message ||
              "Failed to load messages"
          );
          setMessages([]);
        }
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [workspaceId, channelId]);

  /* ---------- send message ---------- */
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    try {
      const res = await api.post<ApiMessage>(
        `/workspaces/${workspaceId}/channels/${channelId}/messages`,
        { content: trimmed }
      );

      if (!res.data.user) {
        console.error("Received message without user data");
        return;
      }

      const uiMessage: UiMessage = {
        id: res.data.id,
        content: res.data.content,
        user: res.data.user,
      };

      setMessages(prev => [...prev, uiMessage]);
      setText("");
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      setError(
        error.response?.data?.message ||
          "Failed to send message"
      );
    }
  }

  /* ---------- render ---------- */
  return (
    <>
      <div className="h-[70vh] overflow-y-auto border p-3 rounded">
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        {!error && messages.length === 0 && (
          <p className="text-gray-400 text-sm">
            No messages yet
          </p>
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
                console.error(
                  "Updated message missing user data"
                );
                return;
              }

              setMessages(prev =>
                prev.map(m =>
                  m.id === updated.id ? updated : m
                )
              );
            }}
            onDeleted={id =>
              setMessages(prev =>
                prev.filter(m => m.id !== id)
              )
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
