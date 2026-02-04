"use client";

import { api } from "@/lib/axios";
import { useState } from "react";
import { Trash2, Loader2, ChevronDown, Shield, User as UserIcon } from "lucide-react";

interface Props {
  member: {
    id: string;            
    role: "OWNER" | "ADMIN" | "MEMBER";
    isCurrentUser: boolean; 
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
  workspaceId: string;
}

export default function MemberActions({ member, workspaceId }: Props) {
  const [loading, setLoading] = useState(false);
  const [roleLoading, setRoleLoading] = useState(false);

  const canChangeRole = member.role !== "OWNER" && !member.isCurrentUser;
  const canRemove = member.role !== "OWNER" && !member.isCurrentUser;

  async function changeRole(role: "ADMIN" | "MEMBER") {
    setRoleLoading(true);
    try {
      await api.patch(
        `/workspaces/${workspaceId}/members/${member.id}/role`,
        { role }
      );

      window.location.reload();
    } catch (err) {
      alert("Failed to change role");
      setRoleLoading(false);
    }
  }

  async function removeMember() {
    setLoading(true);
    try {
      await api.delete(
        `/workspaces/${workspaceId}/members/${member.id}`
      );

      window.location.reload();
    } catch (err) {
      alert("Failed to remove member");
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Role Badge/Selector */}
      {member.role === "OWNER" && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#E08476]/10 border border-[#E08476]/30 text-[#E08476] text-xs font-normal tracking-wide">
          <Shield className="w-3.5 h-3.5" />
          <span>Owner</span>
        </div>
      )}

      {canChangeRole && (
        <div className="relative">
          <select
            value={member.role}
            onChange={e => changeRole(e.target.value as "ADMIN" | "MEMBER")}
            disabled={roleLoading}
            className="appearance-none bg-white/[0.02] border border-white/10 text-white text-xs font-normal tracking-wide pl-3 pr-8 py-1.5 focus:outline-none focus:border-[#E08476]/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-white/20"
          >
            <option value="MEMBER" className="bg-[#0A0A0A] text-white">Member</option>
            <option value="ADMIN" className="bg-[#0A0A0A] text-white">Admin</option>
          </select>
          <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
            {roleLoading ? (
              <Loader2 className="w-3.5 h-3.5 text-white/40 animate-spin" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-white/40" />
            )}
          </div>
        </div>
      )}

      {!canChangeRole && member.role === "ADMIN" && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/10 text-white/70 text-xs font-normal tracking-wide">
          <Shield className="w-3.5 h-3.5" />
          <span>Admin</span>
        </div>
      )}

      {!canChangeRole && member.role === "MEMBER" && !member.isCurrentUser && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/10 text-white/70 text-xs font-normal tracking-wide">
          <UserIcon className="w-3.5 h-3.5" />
          <span>Member</span>
        </div>
      )}

      {/* Current User Badge */}
      {member.isCurrentUser && (
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.02] border border-white/10 text-white/50 text-xs font-normal tracking-wide">
          <UserIcon className="w-3.5 h-3.5" />
          <span>You</span>
        </div>
      )}

      {/* Remove Button */}
      {canRemove && (
        <button
          onClick={removeMember}
          disabled={loading}
          className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 border border-white/10 hover:border-red-400/30 hover:bg-red-400/5 text-white/60 hover:text-red-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs font-normal tracking-wide"
        >
          {loading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Removing...</span>
            </>
          ) : (
            <>
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </>
          )}
        </button>
      )}
    </div>
  );
}