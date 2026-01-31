"use client";

import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";

export default function DeleteWorkspaceButton({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const router = useRouter();

  async function deleteWorkspace() {
    const confirmDelete = confirm(
      "This will permanently delete the workspace and all its data.\n\nThis action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/workspaces/${workspaceId}/delete`);
      router.push("/app");
    } catch (err) {
      alert("Failed to delete workspace");
    }
  }

  return (
    <button
      onClick={deleteWorkspace}
      className="mt-24 text-shadow-indigo-200 bg-red-400 pt-8 pb-8 pl-14 pr-14 rounded-xl"
    >
      Delete Workspace
    </button>
  );
}
