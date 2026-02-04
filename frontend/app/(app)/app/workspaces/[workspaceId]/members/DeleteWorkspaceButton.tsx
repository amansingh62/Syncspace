"use client";

import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import { useState } from "react";
import { Trash2, Loader2, AlertTriangle } from "lucide-react";

export default function DeleteWorkspaceButton({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function deleteWorkspace() {
    setLoading(true);

    try {
      await api.delete(`/workspaces/${workspaceId}/delete`);
      router.push("/app");
    } catch (err) {
      alert("Failed to delete workspace");
      setLoading(false);
    }
  }

  return (
    <div className="border-2 border-red-500/30 bg-red-500/5 p-6">
      <div className="flex items-start gap-4">
        <div className="shrink-0 w-10 h-10 border border-red-500/50 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-light text-white mb-2">Delete Workspace</h3>
          <p className="text-sm text-white/60 font-light mb-1">
            Permanently delete this workspace and all its data including:
          </p>
          <ul className="text-sm text-white/50 font-light mb-4 space-y-1 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>All channels and messages</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>All documents and files</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 mt-1">•</span>
              <span>All member access</span>
            </li>
          </ul>
          <p className="text-sm text-red-400 font-light mb-4">
            This action cannot be undone.
          </p>

          <button
            onClick={deleteWorkspace}
            disabled={loading}
            className="group inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-normal tracking-wide"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deleting workspace...</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4" />
                <span>Delete Workspace Permanently</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}