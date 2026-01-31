"use client";

import { api } from "@/lib/axios";

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
  const canChangeRole = member.role !== "OWNER" && !member.isCurrentUser;
  const canRemove = member.role !== "OWNER" && !member.isCurrentUser;

  async function changeRole(role: "ADMIN" | "MEMBER") {
  try {
    await api.patch(
      `/workspaces/${workspaceId}/members/${member.id}/role`,
      { role }
    );

    window.location.reload();
  } catch (err) {
    alert("Failed to change role");
  }
}

async function removeMember() {
  if (!confirm(`Remove ${member.user.name} from workspace?`)) return;

  try {
    await api.delete(
      `/workspaces/${workspaceId}/members/${member.id}`
    );

    window.location.reload();
  } catch (err) {
    alert("Failed to remove member");
  }
}

  return (
    <span style={{ marginLeft: 12 }}>
      {canChangeRole && (
        <select
          value={member.role}
          onChange={e =>
            changeRole(e.target.value as "ADMIN" | "MEMBER")
          }
        >
          <option value="MEMBER">Member</option>
          <option value="ADMIN">Admin</option>
        </select>
      )}

      {canRemove && (
        <button onClick={removeMember} style={{ marginLeft: 8 }}>
          Remove
        </button>
      )}
      
      {member.isCurrentUser && (
        <span style={{ marginLeft: 8, color: "#666", fontSize: "0.9em" }}>
          (You)
        </span>
      )}
    </span>
  );
}