"use client";

import { useEffect, useState, use, useRef } from "react";
import { api } from "@/lib/axios";
import MessageItem from "./MessageItem";
import type { ApiMessage, UiMessage } from "@/types/message";
import type { AxiosError } from "axios";
import { useWorkspaceSocket } from "@/app/hooks/useWorkspaceSocket";
import { useChannelSocket } from "@/app/hooks/useChannelSocket";
import { getSocket } from "@/lib/socket";
import { useTypingIndicator } from "@/app/hooks/useTypingIndicator";
import { Send, AlertCircle, Hash } from "lucide-react";

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
  const typingUsers = useTypingIndicator(channelId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const socket = getSocket();
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleTyping() {
    socket.emit("typing:start", { channelId });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("typing:stop", { channelId });
    }, 800);
  }

  /* -------------------- sockets -------------------- */
  useWorkspaceSocket(workspaceId);

  useChannelSocket({
    workspaceId,
    channelId,

    onMessageNew: (msg) => {
      setMessages((prev) => {
        const index = prev.findIndex(
          (m) =>
            m.pending && m.content === msg.content && m.user.id === msg.user.id,
        );

        if (index !== -1) {
          const copy = [...prev];
          copy[index] = msg;
          return copy;
        }

        return prev.some((m) => m.id === msg.id) ? prev : [...prev, msg];
      });
    },

    onMessageUpdated: (msg) => {
      setMessages((prev) => prev.map((m) => (m.id === msg.id ? msg : m)));
    },

    onMessageDeleted: (id) => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    },
  });

  /* -------------------- load current user -------------------- */
  useEffect(() => {
    let cancelled = false;

    async function loadMe() {
      try {
        const res = await api.get<{ id: string }>("/auth/me");
        if (!cancelled) setCurrentUserId(res.data.id);
      } catch {
        // ignore
      }
    }

    loadMe();
    return () => {
      cancelled = true;
    };
  }, []);

  /* -------------------- load messages -------------------- */
  useEffect(() => {
    let cancelled = false;

    async function loadMessages() {
      try {
        const res = await api.get<MessagesResponse>(
          `/workspaces/${workspaceId}/channels/${channelId}/messages`,
        );

        const safeMessages: UiMessage[] = res.data.messages
          .filter(
            (
              m,
            ): m is ApiMessage & {
              user: NonNullable<ApiMessage["user"]>;
            } => !!m.user,
          )
          .map((m) => ({
            id: m.id,
            content: m.content,
            user: m.user,
          }));

        if (!cancelled) {
          setMessages(safeMessages);
          setError(null);
        }
      } catch (err) {
        const error = err as AxiosError<{ message?: string }>;
        if (!cancelled) {
          setError(error.response?.data?.message || "Failed to load messages");
          setMessages([]);
        }
      }
    }

    loadMessages();

    return () => {
      cancelled = true;
    };
  }, [workspaceId, channelId]);

  /* -------------------- auto scroll -------------------- */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* -------------------- send message -------------------- */
  async function sendMessage(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed || !currentUserId) return;

    const tempId = `temp-${Date.now()}`;

    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        content: trimmed,
        user: {
          id: currentUserId,
          name: "You",
        },
        pending: true,
      },
    ]);

    setText("");

    api
      .post(`/workspaces/${workspaceId}/channels/${channelId}/messages`, {
        content: trimmed,
      })
      .catch(() => {
        setMessages((prev) => prev.filter((m) => m.id !== tempId));
      });
  }

  /* -------------------- render -------------------- */
  return (
    <div className="flex flex-col h-full bg-[#0A0A0A]">
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-3 py-4 md:px-6 md:py-6 no-scrollbar">
        {/* Error State */}
        {error && (
          <div className="mb-6 border-l-2 border-red-500/50 bg-red-500/5 px-4 py-3">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
              <p className="text-red-400 font-light text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!error && messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 border border-white/10 flex items-center justify-center mb-4">
              <Hash className="w-8 h-8 text-white/30" />
            </div>
            <h3 className="text-lg text-white/70 font-light mb-2">
              No messages yet
            </h3>
            <p className="text-sm text-white/40 font-light max-w-sm">
              Be the first to start the conversation in this channel
            </p>
          </div>
        )}

        {/* Messages List */}
        <div className="space-y-1">
          {messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              workspaceId={workspaceId}
              channelId={channelId}
              currentUserId={currentUserId ?? ""}
              onUpdated={(updated) => {
                setMessages((prev) =>
                  prev.map((m) => (m.id === updated.id ? updated : m)),
                );
              }}
              onDeleted={(id) => {
                setMessages((prev) => prev.filter((m) => m.id !== id));
              }}
            />
          ))}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Typing Indicator */}
      {typingUsers.length > 0 && (
        <div className="border-t border-white/5 bg-[#0A0A0A] sticky bottom-0 pb-safe">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span
                className="w-1.5 h-1.5 bg-[#E08476] rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-1.5 h-1.5 bg-[#E08476] rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              />
              <span
                className="w-1.5 h-1.5 bg-[#E08476] rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              />
            </div>
            <p className="text-xs text-white/50 font-light">
              {typingUsers
                .map((u) => u.name)
                .slice(0, 2)
                .join(", ")}
              {typingUsers.length > 2 && " and others"} typing…
            </p>
          </div>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t border-white/5 bg-[#0A0A0A] sticky bottom-0">
        <form onSubmit={sendMessage} className="p-3 md:p-6">
          <div className="flex items-end gap-2 md:gap-3">
            <input
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                handleTyping();
              }}
              placeholder="Type a message..."
              className="flex-1 bg-white/2 border border-white/10 text-white text-sm md:text-base font-light px-3 md:px-4 py-2.5 md:py-3 focus:outline-none focus:border-[#E08476]/50 transition-colors placeholder:text-white/30"
              autoComplete="off"
            />

            <button
              type="submit"
              disabled={!text.trim()}
              className="group bg-[#E08476] hover:bg-[#D67567] text-white px-3 md:px-6 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#E08476] flex items-center justify-center gap-2 min-w-11"
            >
              <span className="hidden md:inline font-normal tracking-wide">
                Send
              </span>
              <Send className="w-4 h-10 md:h-12 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
