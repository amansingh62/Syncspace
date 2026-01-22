import { redirect } from "next/navigation";

interface WorkspaceEntryProps {
  params: Promise<{ workspaceId: string }>;  
}

export default async function WorkspaceEntry({ params }: WorkspaceEntryProps) {
  const { workspaceId } = await params;
  
  redirect(`/app/workspaces/${workspaceId}/channels`);
}