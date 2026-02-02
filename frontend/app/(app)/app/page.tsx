import PendingInvites from "./workspaces/[workspaceId]/invite/PendingInvites";
import WorkspaceHero from "@/components/Workspace/HeroWorkspace";
import WorkspaceList from "@/components/Workspace/WorkspaceList";

export default async function WorkspaceSelectorPage() {

  return (
    <>
      <WorkspaceHero />
      <WorkspaceList />
      <PendingInvites />
    </>
  );
}
