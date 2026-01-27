"use client";

import { useState } from "react";
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
    if (!editText.trim()) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/channels/${channelId}/messages/${message.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: editText }),
        }
      );

      if (!res.ok) {
        console.error("Failed to update message");
        return;
      }

      const updatedMessage: ApiMessage = await res.json();
      
      // Use existing user data if API doesn't return it (fallback)
      // Since the user doesn't change when editing a message
      onUpdated({
        id: updatedMessage.id,
        content: updatedMessage.content,
        user: updatedMessage.user || message.user,
      });
      
      setEditing(false);
    } catch (error) {
      console.error("Error updating message:", error);
    }
  }

  /* ---------- delete message ---------- */
  async function handleDelete() {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/channels/${channelId}/messages/${message.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!res.ok) {
        console.error("Failed to delete message");
        return;
      }

      onDeleted(message.id);
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  }

  /* ---------- render ---------- */
  return (
    <div className="mb-3 p-2 border-b">
      <div className="font-semibold text-sm">{message.user.name}</div>

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