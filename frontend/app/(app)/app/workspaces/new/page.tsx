"use client";

import { apiFetch } from "@/lib/auth";

export default function CreateWorkspacePage() {
  const createWorkspace = async () => {
    await apiFetch("/api/workspaces", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "My Workspace" }),
    });
  };

  return (
    <button onClick={createWorkspace} className="ml-[47%] text-2xl mt-10">
      Create
    </button>
  );
}
