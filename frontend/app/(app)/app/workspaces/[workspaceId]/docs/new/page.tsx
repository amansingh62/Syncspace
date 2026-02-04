"use client";

import { useRouter, useParams } from "next/navigation";
import { useState } from "react";
import { api } from "@/lib/axios";
import type { AxiosError } from "axios";
import { ArrowLeft, FileText, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NewDocPage() {
  const { workspaceId } = useParams<{ workspaceId: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function create() {
    if (!workspaceId) {
      setError("Workspace not found");
      return;
    }

    const trimmedTitle = title.trim();
    if (trimmedTitle.length < 2) {
      setError("Title must be at least 2 characters");
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const res = await api.post<{ id: string }>(
        `/workspaces/${workspaceId}/docs`,
        { title: trimmedTitle }
      );

      router.push(
        `/app/workspaces/${workspaceId}/docs/${res.data.id}`
      );
    } catch (err: unknown) {
      const axiosError = err as AxiosError<{ message?: string }>;

      setError(
        axiosError.response?.data?.message ??
          "Failed to create document. Please try again."
      );
    } finally {
      setIsCreating(false);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isCreating && title.trim()) {
      create();
    }
  };

  return (
    <div className="h-full bg-[#0A0A0A] overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href={`/app/workspaces/${workspaceId}/docs`}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-light tracking-wide">Back to Documents</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E08476]" />
            <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
              New Document
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
            Create a document
          </h1>

          <p className="text-lg text-white/50 font-light max-w-xl">
            Documents help you organize and share knowledge with your team. Start by giving your document a clear, descriptive title.
          </p>
        </div>

        {/* Form Container */}
        <div className="border border-white/5 bg-white/[0.02]">
          <div className="p-8 md:p-12">
            <div className="space-y-8">
              {/* Document Title Input */}
              <div className="space-y-3">
                <label
                  htmlFor="doc-title"
                  className="block text-sm text-white/70 font-light tracking-wide uppercase"
                >
                  Document Title
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <FileText className="w-5 h-5" />
                  </div>
                  <input
                    id="doc-title"
                    type="text"
                    placeholder="e.g. Product Requirements, Meeting Notes, Style Guide"
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isCreating}
                    className="w-full bg-transparent border border-white/10 text-white text-lg font-light pl-12 pr-6 py-4 focus:outline-none focus:border-[#E08476]/50 transition-colors placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    autoFocus
                  />
                </div>

                <div className="flex items-start gap-2 text-xs text-white/40 font-light">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <p>
                    Choose a descriptive title that helps team members understand the documents purpose at a glance.
                  </p>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="border-l-2 border-red-500/50 bg-red-500/5 px-4 py-3">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-red-400 font-light">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={create}
                  disabled={isCreating || !title.trim()}
                  className="group relative bg-[#E08476] hover:bg-[#D67567] text-white font-normal tracking-wide px-8 h-14 transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#E08476] flex items-center justify-center gap-2"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating document...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-4 h-4" />
                      <span>Create Document</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/app/workspaces/${workspaceId}/docs`}
                  className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-normal tracking-wide px-8 h-14 transition-all duration-300 bg-transparent hover:bg-white/5"
                >
                  Cancel
                </Link>
              </div>

              {/* Keyboard Shortcut Hint */}
              <div className="flex items-center gap-2 text-xs text-white/30 font-light pt-2">
                <span>Press</span>
                <kbd className="px-2 py-1 border border-white/10 bg-white/5 font-mono">Enter</kbd>
                <span>to create</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 border-t border-white/5 pt-8">
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-white/40 uppercase tracking-wider text-xs mb-2">Document Tips</div>
              <ul className="space-y-2 text-white/60 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-[#E08476] mt-1">•</span>
                  <span>Use templates for common document types to save time</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E08476] mt-1">•</span>
                  <span>Add collaborators after creation to enable real-time editing</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E08476] mt-1">•</span>
                  <span>Version history automatically tracks all changes</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}