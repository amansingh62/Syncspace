"use client";

import { useState } from "react";
import { api } from "@/lib/axios";
import type { AxiosError } from "axios";
import type { UiMessage, ApiMessage } from "@/types/message";

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

  const isOwner = message.user.id === currentUserId;

  /* ---------- update message ---------- */
  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();

    const trimmed = editText.trim();
    if (!trimmed) return;

    try {
      const res = await api.patch<ApiMessage>(
        `/workspaces/${workspaceId}/channels/${channelId}/messages/${message.id}`,
        { content: trimmed }
      );

      const updatedMessage = res.data;

      // Preserve user info if API doesn't return it
      onUpdated({
        id: updatedMessage.id,
        content: updatedMessage.content,
        user: updatedMessage.user ?? message.user,
      });

      setEditing(false);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error(
        error.response?.data?.message ?? "Failed to update message"
      );
    }
  }

  /* ---------- delete message ---------- */
  async function handleDelete() {
    try {
      await api.delete(
        `/workspaces/${workspaceId}/channels/${channelId}/messages/${message.id}`
      );

      onDeleted(message.id);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      console.error(
        error.response?.data?.message ?? "Failed to delete message"
      );
    }
  }

  /* ---------- render ---------- */
  return (
    <div className="mb-3 p-2 border-b">
      <div className="font-semibold text-sm">
        {message.user.name}
      </div>

      {!editing ? (
        <div className="text-sm">{message.content}</div>
      ) : (
        <form onSubmit={handleUpdate} className="flex gap-2 mt-1">
          <input
            value={editText}
            onChange={e => setEditText(e.target.value)}
            className="flex-1 border px-2 py-1 rounded text-sm"
            autoFocus
          />
          <button type="submit" className="text-sm">
            Save
          </button>
          <button
            type="button"
            onClick={() => {
              setEditing(false);
              setEditText(message.content);
            }}
            className="text-sm"
          >
            Cancel
          </button>
        </form>
      )}

      {isOwner && !editing && (
        <div className="flex gap-2 mt-1">
          <button
            onClick={() => setEditing(true)}
            className="text-xs text-blue-600"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-xs text-red-600"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
