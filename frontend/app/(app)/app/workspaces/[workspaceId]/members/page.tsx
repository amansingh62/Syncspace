import { fetchWorkspaceMembers } from "@/lib/workspace.server";
import InviteMemberForm from "./InviteMember";
import MemberActions from "./MemberActions";

export default async function MembersPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  const members = await fetchWorkspaceMembers(workspaceId);

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
    </>
  );
}