"use client";

import { api } from "@/lib/axios";

export default function LeaveWorkspaceButton({
  workspaceId,
}: {
  workspaceId: string;
}) {
  async function leave() {
    if (
      !confirm(
        "Are you sure you want to leave this workspace? You will lose access."
      )
    )
      return;

    try {
      await api.delete(`/workspaces/${workspaceId}/leave`);
      window.location.href = "/app";
    } catch (err) {
      alert("Failed to leave workspace");
    }
  }

  return (
    <button
      onClick={leave}
      className="mt-24 text-red-500 border pt-6 pb-6 pl-12 pr-12"
    >
      Leave Workspace
    </button>
  );
}
