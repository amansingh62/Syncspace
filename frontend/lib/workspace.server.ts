import { cookies } from "next/headers";
import type { WorkspaceMember } from "../../types/workspace";

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
