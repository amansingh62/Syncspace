"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/axios";
import type { AxiosError } from "axios";

export default function NewDocPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create() {
    if (!workspaceId) {
      setError("Workspace not found");
      return;
    }

    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 2) {
      setError("Title must be at least 2 characters");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const res = await api.post<{ id: string }>(
        `/workspaces/${workspaceId}/docs`,
        { title: trimmedTitle }
      );

      router.push(
        `/app/workspaces/${workspaceId}/docs/${res.data.id}`
      );
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;

      setError(
        axiosError.response?.data?.message ??
          "Failed to create document. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  }

  return (
    <div className="max-w-lg mx-auto space-y-4">
      <h1 className="text-xl font-semibold">New Document</h1>

      {error && (
        <p className="text-red-500 text-sm">{error}</p>
      )}

      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter document title"
        disabled={isCreating}
        className="w-full border px-3 py-2 rounded"
      />

      <button
        onClick={create}
        disabled={isCreating || !title.trim()}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isCreating ? "Creating..." : "Create"}
      </button>
    </div>
  );
}
