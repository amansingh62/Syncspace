export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER";

export interface Workspace {
    id: string;
    name: string;
    createdAt: string;
};

export interface WorkspaceMember {
    id: string;
    userId: string;
    workspaceId: string;
    role: WorkspaceRole;
    workspace: Workspace;
}

export interface CreateWorkspaceResponse {
  id: string;
  name: string;
  members: Array<{
    id: string;
    userId: string;
    role: WorkspaceRole;
  }>;
};

export interface WorkspaceMemberResponse {
  id: string;
  role: "OWNER" | "ADMIN" | "MEMBER";
  user: {
    id: string;
    name: string;
    email: string;
  };
}