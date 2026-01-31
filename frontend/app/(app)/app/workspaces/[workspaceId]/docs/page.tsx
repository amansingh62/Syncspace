import Link from "next/link";
import { serverFetch } from "@/lib/serverFetch";

interface Doc {
  id: string;
  title: string;
  updatedAt: string;
}

export default async function DocsPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  const res = await serverFetch(
    `/workspaces/${workspaceId}/docs`
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();
  const docs: Doc[] = data.docs ?? [];

  return (
    <>
      <div>
        <h1>Docs</h1>
        <Link href={`/app/workspaces/${workspaceId}/docs/new`}>
          ➕ New Doc
        </Link>
      </div>

      <ul>
        {docs.length === 0 ? (
          <li>No documents yet</li>
        ) : (
          docs.map(doc => (
            <li key={doc.id}>
              <Link
                href={`/app/workspaces/${workspaceId}/docs/${doc.id}`}
              >
                {doc.title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
