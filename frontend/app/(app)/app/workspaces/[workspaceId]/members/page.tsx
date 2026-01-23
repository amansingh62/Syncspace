import { fetchWorkspaceMembers } from "@/lib/workspace.server";
import InviteMemberForm from "./InviteMember";
import MemberActions from "./MemberActions";
import LeaveWorkspaceButton from "./LeaveWorkspaceButton";
import DeleteWorkspaceButton from "./DeleteWorkspaceButton";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const members = await fetchWorkspaceMembers(workspaceId);
  const currentMember = members.find(m => m.isCurrentUser);

  return (
    <>
      <h1>Members</h1>

      <ul>
        {members.map(m => (
          <li key={m.id}>
            <strong>{m.user.name}</strong> - {m.user.email} ({m.role})

    <MemberActions
      member={m}
      workspaceId={workspaceId}
    />

          </li>
        ))}
      </ul>

      <InviteMemberForm workspaceId={workspaceId} />

     {currentMember && (
      currentMember.role === "OWNER" ? (
    <DeleteWorkspaceButton workspaceId={workspaceId} />
  ) : (
    <LeaveWorkspaceButton workspaceId={workspaceId} />
  )
)}
    </>
  );
}