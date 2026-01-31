import type {
  WorkspaceMember,
  WorkspaceMemberResponse,
} from "../types/workspace";
import { serverFetch } from "@/lib/serverFetch";

export async function fetchWorkspaces(): Promise<WorkspaceMember[]> {
  const res = await serverFetch("/workspaces");
  if (!res.ok) return [];
  return res.json();
}

export async function fetchWorkspaceMembers(
  workspaceId: string
): Promise<WorkspaceMemberResponse[]> {
  const res = await serverFetch(
    `/workspaces/${workspaceId}/members`
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed to fetch workspace members: ${res.status} ${text}`
    );
  }

  const data = await res.json();

  if (data && typeof data === "object" && "members" in data) {
    return data.members;
  }

  if (Array.isArray(data)) {
    return data;
  }

  return [];
}
