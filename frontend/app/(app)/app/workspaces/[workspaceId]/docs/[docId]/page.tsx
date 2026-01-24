"use client";

import { use, useEffect, useRef, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import { useDebounce } from "@/app/hooks/useDebounce";

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
  const [status, setStatus] = useState<"saving" | "saved">("saved");

  const lastSaved = useRef<{ title?: string; content?: string }>({});

  const debouncedTitle = useDebounce(doc?.title, 800);
  const debouncedContent = useDebounce(doc?.content, 800);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/docs/${docId}`,
      { credentials: "include" }
    )
      .then(res => res.json())
      .then((data: Doc) => {
        setDoc(data);

        lastSaved.current = {
          title: data.title,
          content: data.content,
        };
      });
  }, [workspaceId, docId]);

  useEffect(() => {
    if (!doc) return;
    if (debouncedTitle === undefined || debouncedContent === undefined) return;

    if (
      lastSaved.current.title === debouncedTitle &&
      lastSaved.current.content === debouncedContent
    ) {
      return;
    }

    let cancelled = false;

    const save = async () => {
      setStatus("saving");

      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/workspaces/${workspaceId}/docs/${docId}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: debouncedTitle,
            content: debouncedContent,
          }),
        }
      );

      if (!cancelled) {
        lastSaved.current = {
          title: debouncedTitle,
          content: debouncedContent,
        };
        setStatus("saved");
      }
    };

    save();

    return () => {
      cancelled = true;
    };
  }, [debouncedTitle, debouncedContent, workspaceId, docId, doc]);

  if (!doc) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <input
        value={doc.title || ""}
        onChange={e =>
          setDoc(prev =>
            prev ? { ...prev, title: e.target.value } : prev
          )
        }
        className="w-full text-2xl font-semibold mb-2 border-none outline-none focus:ring-0"
        placeholder="Untitled document"
      />

      <div className="text-sm text-gray-500 mb-4">
        {status === "saving" ? "Saving…" : "Saved"}
      </div>

      <RichTextEditor
        content={doc.content || ""}
        onChange={(content: string) =>
          setDoc(prev =>
            prev ? { ...prev, content } : prev
          )
        }
      />
    </div>
  );
}
