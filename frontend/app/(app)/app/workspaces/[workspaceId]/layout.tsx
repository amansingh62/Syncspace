import Link from "next/link";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <nav style={{ width: "200px", borderRight: "1px solid #ccc", padding: "1rem" }}>
        <h2>Workspace</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Link href={`/app/workspaces/${workspaceId}/channels`}>
              💬 Channels
            </Link>
          </li>
          <li>
            <Link href={`/app/workspaces/${workspaceId}/docs`}>
              📝 Docs
            </Link>
          </li>
          <li>
            <Link href={`/app/workspaces/${workspaceId}/members`}>
              👥 Members
            </Link>
          </li>
        </ul>
      </nav>
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}