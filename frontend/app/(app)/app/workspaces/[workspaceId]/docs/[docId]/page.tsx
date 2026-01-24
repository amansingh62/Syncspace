"use client";

import { use, useEffect, useState } from "react";

interface Doc {
  id: string;
  title: string;
  content: string;
  workspaceId: string;
  updatedAt: string;
}

export default function DocPage({
  params,
}: {
  params: Promise<{ workspaceId: string; docId: string }>;
}) {
  const { workspaceId, docId } = use(params);
  
  const [doc, setDoc] = useState<Doc | null>(null);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/docs/${docId}`,
      { credentials: "include" }
    )
      .then(res => res.json())
      .then((data: Doc) => setDoc(data));
  }, [workspaceId, docId]);

  async function save() {
    if (!doc) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/docs/${docId}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: doc.title,
          content: doc.content,
        }),
      }
    );
  }

  if (!doc) return <p>Loading...</p>;

  return (
    <>
      <input
        value={doc.title || ""} 
        onChange={e =>
          setDoc(prev =>
            prev ? { ...prev, title: e.target.value } : prev
          )
        }
      />

      <textarea
        value={doc.content || ""} 
        onChange={e =>
          setDoc(prev =>
            prev ? { ...prev, content: e.target.value } : prev
          )
        }
        rows={20}
      />

      <button onClick={save}>Save</button>
    </>
  );
}