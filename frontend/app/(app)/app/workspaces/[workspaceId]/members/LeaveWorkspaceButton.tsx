"use client";

import { api } from "@/lib/axios";
import { useState } from "react";
import { LogOut, Loader2, AlertTriangle } from "lucide-react";

export default function LeaveWorkspaceButton({
  workspaceId,
}: {
  workspaceId: string;
}) {
  const [loading, setLoading] = useState(false);

  async function leave() {
    setLoading(true);
    
    try {
      await api.delete(`/workspaces/${workspaceId}/leave`);
      window.location.href = "/app";
    } catch {
      alert("Failed to leave workspace");
      setLoading(false);
    }
  }

  return (
    <div className="border border-red-500/20 bg-red-500/5 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-base md:text-lg font-light text-white mb-1 md:mb-2">Leave Workspace</h3>
          <p className="text-xs md:text-sm text-white/60 font-light mb-3 md:mb-4">
            You will lose access to this workspace and all its content. You can only rejoin if invited again.
          </p>

          <button
            onClick={leave}
            disabled={loading}
            className="group inline-flex items-center gap-2 border-2 border-red-500/50 hover:border-red-500 hover:bg-red-500/10 text-red-400 hover:text-red-300 px-4 md:px-6 py-2.5 md:py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-normal tracking-wide w-full sm:w-auto justify-center"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Leaving workspace...</span>
              </>
            ) : (
              <>
                <LogOut className="w-4 h-4" />
                <span>Leave Workspace</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}