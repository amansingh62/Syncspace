import { cookies } from "next/headers";
import type { WorkspaceMember, WorkspaceMemberResponse } from "../types/workspace";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

async function getCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map(c => `${c.name}=${c.value}`)
    .join("; ");
}

export async function fetchWorkspaces(): Promise<WorkspaceMember[]> {
  const res = await fetch(`${API_URL}/api/workspaces`, {
    cache: "no-store",
    headers: {
      cookie: await getCookieHeader(),
    },
  });

  if (!res.ok) return [];
  return res.json();
}

export async function fetchWorkspaceMembers(
  workspaceId: string
): Promise<WorkspaceMemberResponse[]> {

  const res = await fetch(
    `${API_URL}/api/workspaces/${workspaceId}/members`,
    {
      method: "GET",
      headers: {
        cookie: await getCookieHeader(),
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(
      `Failed to fetch workspace members: ${res.status} ${text}`
    );
  }

  const data = await res.json();

    if (data && typeof data === 'object' && 'members' in data) {
    return data.members;
  }
  
  if (Array.isArray(data)) {
    return data;
  }

  return [];
}