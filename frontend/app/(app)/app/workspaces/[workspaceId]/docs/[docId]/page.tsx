"use client";

import { use, useEffect, useRef, useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import { useDebounce } from "@/app/hooks/useDebounce";
import { api } from "@/lib/axios";
import { ArrowLeft, Loader2, Check, AlertCircle, Clock, FileText } from "lucide-react";
import Link from "next/link";

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
  const [error, setError] = useState<string | null>(null);

  const lastSaved = useRef<{ title?: string; content?: string }>({});

  const debouncedTitle = useDebounce(doc?.title, 800);
  const debouncedContent = useDebounce(doc?.content, 800);

  useEffect(() => {
    let cancelled = false;

    async function loadDoc() {
      try {
        const res = await api.get<Doc>(
          `/workspaces/${workspaceId}/docs/${docId}`
        );

        if (!cancelled) {
          setDoc(res.data);
          lastSaved.current = {
            title: res.data.title,
            content: res.data.content,
          };
          setError(null);
        }
      } catch {
        if (!cancelled) {
          setError("Failed to load document");
        }
      }
    }

    loadDoc();

    return () => {
      cancelled = true;
    };
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

    async function save() {
      try {
        setStatus("saving");
        setError(null);

        await api.patch(
          `/workspaces/${workspaceId}/docs/${docId}`,
          {
            title: debouncedTitle,
            content: debouncedContent,
          }
        );

        if (!cancelled) {
          lastSaved.current = {
            title: debouncedTitle,
            content: debouncedContent,
          };
          setStatus("saved");
        }
      } catch {
        if (!cancelled) {
          setError("Failed to save");
          setStatus("saved");
        }
      }
    }

    save();

    return () => {
      cancelled = true;
    };
  }, [debouncedTitle, debouncedContent, workspaceId, docId, doc]);

  if (!doc && !error) {
    return (
      <div className="h-full bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-white/50 animate-spin mx-auto mb-4" />
          <p className="text-white/50 font-light">Loading document...</p>
        </div>
      </div>
    );
  }

  if (error && !doc) {
    return (
      <div className="h-full bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-16 h-16 border border-red-500/30 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-400" />
          </div>
          <h3 className="text-lg text-white/70 font-light mb-2">Failed to load document</h3>
          <p className="text-white/40 font-light mb-6">{error}</p>
          <Link
            href={`/app/workspaces/${workspaceId}/docs`}
            className="inline-flex items-center gap-2 border border-white/10 hover:border-white/20 text-white/70 hover:text-white px-6 py-3 transition-colors font-normal tracking-wide"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Documents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[#0A0A0A] flex flex-col overflow-hidden">
      {/* Header Bar */}
      <div className="border-b border-white/5 bg-[#0A0A0A]/95 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Back Button */}
            <Link
              href={`/app/workspaces/${workspaceId}/docs`}
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-light tracking-wide hidden sm:inline">Documents</span>
            </Link>

            {/* Status Indicator */}
            <div className="flex items-center gap-3">
              {error && (
                <div className="flex items-center gap-2 text-red-400 text-sm font-light">
                  <AlertCircle className="w-4 h-4" />
                  <span>{error}</span>
                </div>
              )}
              
              {!error && (
                <div className="flex items-center gap-2 text-white/50 text-sm font-light">
                  {status === "saving" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4 text-[#E08476]" />
                      <span>Saved</span>
                    </>
                  )}
                </div>
              )}

              {/* Last Updated */}
              {doc && (
                <div className="hidden md:flex items-center gap-2 text-white/30 text-xs font-light border-l border-white/10 pl-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {new Date(doc.updatedAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Document Title Section */}
          <div className="mb-12">
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-12 h-12 border border-white/10 flex items-center justify-center text-white/40 hover:text-[#E08476] hover:border-[#E08476]/30 transition-colors mt-1">
                <FileText className="w-6 h-6" />
              </div>
              
              <div className="flex-1 min-w-0">
                <input
                  value={doc?.title || ""}
                  onChange={e =>
                    setDoc(prev =>
                      prev ? { ...prev, title: e.target.value } : prev
                    )
                  }
                  className="w-full bg-transparent text-white text-4xl md:text-5xl font-light tracking-tight border-none outline-none focus:outline-none placeholder:text-white/20 mb-3 leading-tight"
                  placeholder="Untitled document"
                />
                
                <div className="h-px bg-linear-to-r from-[#E08476]/30 via-white/10 to-transparent" />
              </div>
            </div>
          </div>

          {/* Rich Text Editor with Dark Theme Wrapper */}
          <div className="editor-wrapper min-h-150">
            <style jsx>{`
              .editor-wrapper :global(.ProseMirror) {
                color: rgba(255, 255, 255, 0.9) !important;
                background-color: transparent !important;
                min-height: 600px;
                padding: 0;
                outline: none !important;
                font-size: 1.125rem;
                line-height: 1.75;
                font-weight: 300;
              }

              .editor-wrapper :global(.ProseMirror p) {
                color: rgba(255, 255, 255, 0.85) !important;
                margin: 1rem 0;
                line-height: 1.75;
              }

              .editor-wrapper :global(.ProseMirror h1),
              .editor-wrapper :global(.ProseMirror h2),
              .editor-wrapper :global(.ProseMirror h3),
              .editor-wrapper :global(.ProseMirror h4),
              .editor-wrapper :global(.ProseMirror h5),
              .editor-wrapper :global(.ProseMirror h6) {
                color: rgb(255, 255, 255) !important;
                font-weight: 300;
                line-height: 1.3;
                margin-top: 2rem;
                margin-bottom: 1rem;
              }

              .editor-wrapper :global(.ProseMirror h1) { font-size: 2.5rem; }
              .editor-wrapper :global(.ProseMirror h2) { font-size: 2rem; }
              .editor-wrapper :global(.ProseMirror h3) { font-size: 1.5rem; }
              .editor-wrapper :global(.ProseMirror h4) { font-size: 1.25rem; }

              .editor-wrapper :global(.ProseMirror strong) {
                color: rgb(255, 255, 255) !important;
                font-weight: 500;
              }

              .editor-wrapper :global(.ProseMirror em) {
                color: rgba(255, 255, 255, 0.95) !important;
              }

              .editor-wrapper :global(.ProseMirror code) {
                background-color: rgba(255, 255, 255, 0.05) !important;
                color: #E08476 !important;
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 0.125rem 0.375rem;
                font-size: 0.875em;
                font-family: 'Monaco', 'Courier New', monospace;
              }

              .editor-wrapper :global(.ProseMirror pre) {
                background-color: rgba(255, 255, 255, 0.02) !important;
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-left: 3px solid #E08476;
                padding: 1rem;
                overflow-x: auto;
                margin: 1.5rem 0;
              }

              .editor-wrapper :global(.ProseMirror pre code) {
                background-color: transparent !important;
                border: none;
                padding: 0;
                color: rgba(255, 255, 255, 0.9) !important;
              }

              .editor-wrapper :global(.ProseMirror blockquote) {
                border-left: 3px solid #E08476;
                padding-left: 1.5rem;
                margin: 1.5rem 0;
                color: rgba(255, 255, 255, 0.7) !important;
                font-style: italic;
              }

              .editor-wrapper :global(.ProseMirror ul),
              .editor-wrapper :global(.ProseMirror ol) {
                color: rgba(255, 255, 255, 0.85) !important;
                padding-left: 2rem;
                margin: 1rem 0;
              }

              .editor-wrapper :global(.ProseMirror li) {
                color: rgba(255, 255, 255, 0.85) !important;
                margin: 0.5rem 0;
              }

              .editor-wrapper :global(.ProseMirror a) {
                color: #E08476 !important;
                text-decoration: underline;
                text-decoration-color: rgba(224, 132, 118, 0.3);
                transition: all 0.2s;
              }

              .editor-wrapper :global(.ProseMirror a:hover) {
                text-decoration-color: #E08476;
              }

              .editor-wrapper :global(.ProseMirror hr) {
                border: none;
                border-top: 1px solid rgba(255, 255, 255, 0.1);
                margin: 2rem 0;
              }

              .editor-wrapper :global(.ProseMirror table) {
                border-collapse: collapse;
                width: 100%;
                margin: 1.5rem 0;
              }

              .editor-wrapper :global(.ProseMirror table td),
              .editor-wrapper :global(.ProseMirror table th) {
                border: 1px solid rgba(255, 255, 255, 0.1);
                padding: 0.75rem;
                color: rgba(255, 255, 255, 0.85) !important;
              }

              .editor-wrapper :global(.ProseMirror table th) {
                background-color: rgba(255, 255, 255, 0.03);
                font-weight: 500;
                color: rgb(255, 255, 255) !important;
              }

              .editor-wrapper :global(.ProseMirror img) {
                max-width: 100%;
                height: auto;
                border: 1px solid rgba(255, 255, 255, 0.1);
                margin: 1.5rem 0;
              }

              .editor-wrapper :global(.ProseMirror-focused) {
                outline: none !important;
              }

              .editor-wrapper :global(.ProseMirror p.is-editor-empty:first-child::before) {
                color: rgba(255, 255, 255, 0.2);
                content: attr(data-placeholder);
                float: left;
                height: 0;
                pointer-events: none;
              }

              .editor-wrapper :global(.tiptap) {
                color: rgba(255, 255, 255, 0.9) !important;
              }

              .editor-wrapper :global(*) {
                color: inherit;
              }
            `}</style>
            
            <RichTextEditor
              content={doc?.content || ""}
              onChange={(content: string) =>
                setDoc(prev =>
                  prev ? { ...prev, content } : prev
                )
              }
            />
          </div>
        </div>
      </div>

      {/* Floating Save Indicator (Mobile) */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <div className="bg-[#E08476] text-white px-4 py-2.5 shadow-2xl shadow-[#E08476]/20 border border-[#E08476]/30 flex items-center gap-2">
          {status === "saving" ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-sm font-normal tracking-wide">Saving</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span className="text-sm font-normal tracking-wide">Saved</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}