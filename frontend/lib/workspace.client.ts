import type { CreateWorkspaceResponse } from "../types/workspace";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function createWorkspace(
  name: string
): Promise<CreateWorkspaceResponse> {
  const res = await fetch(`${API_URL}/api/workspaces`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", 
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Failed to create workspace");
  return res.json();
}