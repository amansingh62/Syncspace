import Link from "next/link";
import { cookies } from "next/headers";

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
  const cookieStore = await cookies();
  
  let docs: Doc[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/docs`,
      {
        cache: "no-store",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    if (!res.ok) {
      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await res.json();
        error = errorData.message || 'Failed to load documents';
      } else {
        error = `Failed to load documents (Status: ${res.status})`;
      }
    } else {
      const data = await res.json();
      docs = data.docs;
    }
  } catch (err) {
    console.error('Error:', err);
    error = 'Failed to load documents. Please try again.';
  }

  if (error) {
    return (
      <div>
        <h1>Docs</h1>
        <p>Error: {error}</p>
      </div>
    );
  }

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
          docs.map((doc: Doc) => (
            <li key={doc.id}>
              <Link href={`/app/workspaces/${workspaceId}/docs/${doc.id}`}>
                {doc.title}
              </Link>
            </li>
          ))
        )}
      </ul>
    </>
  );
}