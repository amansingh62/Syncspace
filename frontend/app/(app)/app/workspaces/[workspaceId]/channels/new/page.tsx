"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";

export default function NewChannelPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  // ✅ unwrap params
  const { workspaceId } = use(params);

  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function createChannel(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/channels`,
      {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      }
    );

    if (!res.ok) {
      const err = await res.json();
      setError(err.message || "Failed to create channel");
      return;
    }

    const channel = await res.json();

    router.push(
      `/app/workspaces/${workspaceId}/channels/${channel.id}`
    );
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
