import type { CreateWorkspaceResponse } from "../types/workspace";
import { api } from "./axios";

export async function createWorkspace(
  name: string
): Promise<CreateWorkspaceResponse> {
  try {
  const res = await api.post<CreateWorkspaceResponse>("/workspaces", { name });
  return res.data;
} catch {
  throw new Error("Failed to create workspace");
}
}