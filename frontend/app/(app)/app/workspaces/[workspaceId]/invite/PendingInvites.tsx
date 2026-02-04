"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { Mail, Check, X, Loader2 } from "lucide-react";

interface Invite {
  id: string;
  token: string;
  workspace: {
    id: string;
    name: string;
  };
}

export default function PendingInvites() {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState<string | null>(null);
  const router = useRouter();

  const loadInvites = useCallback(async () => {
    try {
      const res = await api.get<Invite[]>("/workspaces/invite");
      setInvites(res.data);
    } catch {
      // silently fail or show toast if you want
    }
  }, []);

  async function accept(token: string) {
    setLoading(token);
    try {
      await api.post(`/workspaces/invite/${token}/accept`);
      setInvites(prev => prev.filter(i => i.token !== token));
      router.refresh();
    } catch {
      alert("Failed to accept invite");
    } finally {
      setLoading(null);
    }
  }

  async function reject(token: string) {
    setLoading(token);
    try {
      await api.delete(`/workspaces/invite/${token}`);
      loadInvites();
    } catch {
      alert("Failed to reject invite");
    } finally {
      setLoading(null);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await api.get<Invite[]>("/workspaces/invite");
        if (!cancelled) {
          setInvites(res.data);
        }
      } catch {}
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (invites.length === 0) return null;

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E08476]" />
          <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
            Pending
          </span>
        </div>
        
        <h2 className="text-2xl md:text-3xl font-light tracking-tight text-white mb-2">
          Workspace Invitations
        </h2>
        <p className="text-white/50 font-light">
          {invites.length} pending {invites.length === 1 ? 'invitation' : 'invitations'}
        </p>
      </div>

      {/* Invites List */}
      <div className="space-y-3">
        {invites.map(invite => (
          <div
            key={invite.id}
            className="group relative border border-white/5 bg-white/[0.02] hover:border-[#E08476]/30 transition-all duration-300 overflow-hidden"
          >
            {/* Hover Line */}
            <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#E08476] transition-all duration-300 group-hover:w-1" />
            
            <div className="px-6 py-4">
              <div className="flex items-center gap-4">
                {/* Mail Icon */}
                <div className="shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 group-hover:border-[#E08476]/50 group-hover:text-[#E08476] transition-colors">
                  <Mail className="w-5 h-5" />
                </div>

                {/* Workspace Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white/60 font-light mb-1">
                    You have been invited to
                  </p>
                  <h3 className="text-lg font-light text-white truncate">
                    {invite.workspace.name}
                  </h3>
                </div>

                {/* Action Buttons */}
                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={() => accept(invite.token)}
                    disabled={loading === invite.token}
                    className="group/btn inline-flex items-center gap-2 bg-[#E08476] hover:bg-[#D67567] text-white px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-normal tracking-wide text-sm"
                  >
                    {loading === invite.token ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="hidden sm:inline">Accepting...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">Accept</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => reject(invite.token)}
                    disabled={loading === invite.token}
                    className="group/btn inline-flex items-center gap-2 border border-white/10 hover:border-red-400/30 hover:bg-red-400/5 text-white/70 hover:text-red-400 px-4 py-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-normal tracking-wide text-sm"
                  >
                    {loading === invite.token ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="hidden sm:inline">Rejecting...</span>
                      </>
                    ) : (
                      <>
                        <X className="w-4 h-4" />
                        <span className="hidden sm:inline">Decline</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="h-px w-0 bg-gradient-to-r from-transparent via-[#E08476] to-transparent transition-all duration-500 group-hover:w-full mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}