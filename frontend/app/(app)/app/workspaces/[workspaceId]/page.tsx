import { redirect } from "next/navigation";

export default async function WorkspaceEntry({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;
  redirect(`/app/workspaces/${workspaceId}/channels`);
}