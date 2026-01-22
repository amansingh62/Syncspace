"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkspace } from "@/lib/workspace.client";
import type { CreateWorkspaceResponse } from "../../../../../../types/workspace";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const workspace: CreateWorkspaceResponse = await createWorkspace(name);
      router.push(`/app/workspaces/${workspace.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 32 }}>
      <h1>Create Workspace</h1>

      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Workspace name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />

        <div className="mt-10">
          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
          </button>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </main>
  );
}
