import { fetchWorkspaceMembers } from "@/lib/workspace.server";
import InviteMemberForm from "./InviteMember";
import MemberActions from "./MemberActions";
import LeaveWorkspaceButton from "./LeaveWorkspaceButton";
import DeleteWorkspaceButton from "./DeleteWorkspaceButton";
import { Users, Shield, UserCheck } from "lucide-react";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const members = await fetchWorkspaceMembers(workspaceId);
  const currentMember = members.find(m => m.isCurrentUser);

  return (
    <div className="h-full bg-[#0A0A0A] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E08476]" />
            <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
              Team
            </span>
          </div>
          
          <div className="flex items-end justify-between gap-6 mb-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-3">
                Members
              </h1>
              <p className="text-lg text-white/50 font-light">
                {members.length} {members.length === 1 ? 'member' : 'members'} in workspace
              </p>
            </div>
          </div>
        </div>

        {/* Members List */}
        <div className="mb-12">
          <div className="space-y-2">
            {members.map((m) => (
              <div
                key={m.id}
                className="group relative border border-white/5 bg-white/[0.02] hover:border-white/10 transition-all duration-300 overflow-hidden"
              >
                {/* Hover Line */}
                <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#E08476] transition-all duration-300 group-hover:w-1" />
                
                <div className="px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    {/* Left Side - Member Info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Avatar */}
                      <div className="shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-white/70 text-sm font-light group-hover:border-[#E08476]/30 transition-colors">
                        {m.user.name.charAt(0).toUpperCase()}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-normal text-white truncate">
                            {m.user.name}
                          </h3>
                          {m.isCurrentUser && (
                            <span className="shrink-0 px-2 py-0.5 bg-white/5 border border-white/10 text-white/50 text-xs font-light">
                              You
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-white/40 font-light truncate">
                          {m.user.email}
                        </p>
                      </div>
                    </div>

                    {/* Right Side - Actions */}
                    <div className="shrink-0">
                      <MemberActions
                        member={m}
                        workspaceId={workspaceId}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Invite Form */}
        <InviteMemberForm workspaceId={workspaceId} />

        {/* Danger Zone */}
        {currentMember && (
          <div className="mt-16 pt-12 border-t border-red-500/10">
            <div className="mb-6">
              <h2 className="text-xl font-light text-white mb-2">Danger Zone</h2>
              <p className="text-sm text-white/40 font-light">
                Irreversible actions that affect your workspace access
              </p>
            </div>

            {currentMember.role === "OWNER" ? (
              <DeleteWorkspaceButton workspaceId={workspaceId} />
            ) : (
              <LeaveWorkspaceButton workspaceId={workspaceId} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}