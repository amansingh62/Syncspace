"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";

export default function NewDocPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();

  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  async function create() {
    if (!workspaceId) {
      setError("Workspace not found");
      return;
    }

    if (!title.trim() || title.trim().length < 2) {
      setError("Title must be at least 2 characters");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/docs`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: title.trim() }),
        }
      );

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: "Failed to create document" }));
        setError(errorData.message || `Error: ${res.status}`);
        return;
      }

      const doc = await res.json();

      router.push(`/app/workspaces/${workspaceId}/docs/${doc.id}`);
    } catch (err) {
      console.error("Error creating document:", err);
      setError("Failed to create document. Please try again.");
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <>
      <h1>New Doc</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter document title"
        disabled={isCreating}
      />

      <button onClick={create} disabled={isCreating || !title.trim()}>
        {isCreating ? "Creating..." : "Create"}
      </button>
    </>
  );
}
