"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import type { AxiosError } from "axios";

export default function NewChannelPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  // unwrap params
  const { workspaceId } = use(params);

  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  async function createChannel(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Channel name is required");
      return;
    }

    try {
      const res = await api.post<{ id: string }>(
        `/workspaces/${workspaceId}/channels`,
        { name: trimmedName }
      );

      router.push(
        `/app/workspaces/${workspaceId}/channels/${res.data.id}`
      );
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      setError(
        error.response?.data?.message ||
          "Failed to create channel"
      );
    }
  }

  return (
    <>
      <h1>Create Channel</h1>

      <form onSubmit={createChannel}>
        <input
          placeholder="channel-name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>

      {error && <p className="text-red-400">{error}</p>}
    </>
  );
}
