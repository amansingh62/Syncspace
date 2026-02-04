"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import type { UiMessage } from "@/types/message";
import { Pencil, Trash2, Check, X } from "lucide-react";

interface MessageItemProps {
  message: UiMessage;
  workspaceId: string;
  channelId: string;
  currentUserId: string;
  onUpdated: (updated: UiMessage) => void;
  onDeleted: (id: string) => void;
}

export default function MessageItem({
  message,
  workspaceId,
  channelId,
  currentUserId,
  onUpdated,
  onDeleted,
}: MessageItemProps) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(message.content);
  const [showActions, setShowActions] = useState(false);

  const isOwner = message.user.id === currentUserId;

  /* ---------- update message ---------- */
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = editText.trim();
    if (!trimmed) return;

    onUpdated({
      ...message,
      content: trimmed,
      pendingEdit: true,
    });

    setEditing(false);

    api
      .patch(
        `/workspaces/${workspaceId}/channels/${channelId}/messages/${message.id}`,
        { content: trimmed }
      )
      .catch(() => {
        onUpdated(message);
      });
  }

  /* ---------- delete message ---------- */
  async function handleDelete() {
    onDeleted(message.id);

    api.delete(
      `/workspaces/${workspaceId}/channels/${channelId}/messages/${message.id}`
    ).catch(() => {
      // Handle error if needed
    });
  }

  /* ---------- render ---------- */
  return (
    <div
      className={`group relative px-4 py-3 hover:bg-white/[0.02] transition-colors ${
        message.pending ? "opacity-50" : ""
      }`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex gap-3">
        {/* User Avatar */}
        <div className="shrink-0">
          <div className="w-9 h-9 border border-white/10 flex items-center justify-center text-white/70 text-sm font-light">
            {message.user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          {/* User Name & Status */}
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-sm font-normal text-white">
              {message.user.name}
            </span>
            {message.pendingEdit && (
              <span className="text-xs text-white/30 font-light">(editing...)</span>
            )}
          </div>

          {/* Message Text or Edit Form */}
          {!editing ? (
            <div className="text-sm text-white/80 font-light leading-relaxed break-words">
              {message.content}
            </div>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-2 mt-2">
              <input
                value={editText}
                onChange={e => setEditText(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 text-white text-sm font-light px-3 py-2 focus:outline-none focus:border-[#E08476]/50 transition-colors"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-[#E08476] hover:bg-[#D67567] text-white px-3 py-1.5 text-xs font-normal tracking-wide transition-colors"
                >
                  <Check className="w-3 h-3" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditing(false);
                    setEditText(message.content);
                  }}
                  className="inline-flex items-center gap-1.5 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-3 py-1.5 text-xs font-normal tracking-wide transition-colors"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Action Buttons (shown on hover for owner) */}
        {isOwner && !editing && (
          <div
            className={`shrink-0 flex items-start gap-1 transition-opacity ${
              showActions ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group/btn"
              title="Edit message"
            >
              <Pencil className="w-3.5 h-3.5 text-white/40 group-hover/btn:text-[#E08476]" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 hover:bg-white/5 border border-transparent hover:border-white/10 transition-colors group/btn"
              title="Delete message"
            >
              <Trash2 className="w-3.5 h-3.5 text-white/40 group-hover/btn:text-red-400" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}