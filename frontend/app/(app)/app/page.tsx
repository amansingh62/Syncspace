import { fetchWorkspaces } from "@/lib/workspace.server";
import Link from "next/link";
import { LogoutButton } from "@/components/LogoutButton";
import type { WorkspaceMember } from "../../../../types/workspace";

export default async function WorkspaceSelectorPage() {
  const workspaces: WorkspaceMember[] = await fetchWorkspaces();

  return (
    <>
      <h1>Your Workspaces</h1>

      {workspaces.length === 0 ? (
        <p>You are not part of any workspace yet.</p>
      ) : (
        <ul>
          {workspaces.map(ws => (
            <li key={ws.id}>
              <Link href={`/app/workspaces/${ws.workspaceId}`}>
                {ws.workspace.name} ({ws.role})
              </Link>
            </li>
          ))}
        </ul>
      )}

      <Link href="/app/workspaces/new">➕ Create new workspace</Link>
      <LogoutButton />
    </>
  );
}
