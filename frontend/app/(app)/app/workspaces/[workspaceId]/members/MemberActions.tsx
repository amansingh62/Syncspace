"use client";

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
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/members/${member.id}/role`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      alert(error.message || "Failed to change role");
      return;
    }

    window.location.reload();
  }

  async function removeMember() {
    if (!confirm(`Remove ${member.user.name} from workspace?`)) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/members/${member.id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    if (!res.ok) {
      const error = await res.json();
      alert(error.message || "Failed to remove member");
      return;
    }

    window.location.reload();
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