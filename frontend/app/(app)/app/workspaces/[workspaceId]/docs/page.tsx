import Link from "next/link";
import { serverFetch } from "@/lib/serverFetch";
import { FileText, Plus, Clock } from "lucide-react";

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

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInHours < 1) {
      return "Just now";
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="h-full bg-[#0A0A0A] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E08476]" />
            <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
              Documentation
            </span>
          </div>
          
          <div className="flex items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-3">
                Documents
              </h1>
              <p className="text-lg text-white/50 font-light">
                {docs.length} {docs.length === 1 ? 'document' : 'documents'} in workspace
              </p>
            </div>

            <Link
              href={`/app/workspaces/${workspaceId}/docs/new`}
              className="group bg-[#E08476] hover:bg-[#D67567] text-white px-6 py-3 transition-all duration-300 flex items-center gap-2"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span className="font-normal tracking-wide">New Document</span>
            </Link>
          </div>
        </div>

        {/* Documents List */}
        {docs.length === 0 ? (
          <div className="border border-white/5 bg-white/[0.02]">
            <div className="p-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 border border-white/10 flex items-center justify-center">
                <FileText className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="text-lg text-white/70 font-light mb-2">
                No documents yet
              </h3>
              <p className="text-white/40 font-light mb-6">
                Create your first document to start organizing knowledge
              </p>
              <Link
                href={`/app/workspaces/${workspaceId}/docs/new`}
                className="inline-flex items-center gap-2 bg-[#E08476] hover:bg-[#D67567] text-white px-6 py-3 transition-colors font-normal tracking-wide"
              >
                <Plus className="w-4 h-4" />
                Create Document
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {docs.map((doc) => (
              <Link
                key={doc.id}
                href={`/app/workspaces/${workspaceId}/docs/${doc.id}`}
                className="group block"
              >
                <div className="relative border border-white/5 bg-white/[0.02] hover:border-[#E08476]/30 transition-all duration-300 overflow-hidden">
                  {/* Hover Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#E08476] transition-all duration-300 group-hover:w-1" />
                  
                  <div className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      {/* Document Icon */}
                      <div className="shrink-0 w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 transition-colors group-hover:border-[#E08476]/50 group-hover:text-[#E08476]">
                        <FileText className="w-5 h-5" />
                      </div>

                      {/* Document Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-light text-white group-hover:text-[#E08476] transition-colors truncate mb-1">
                          {doc.title}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-white/40 font-light">
                          <Clock className="w-3 h-3" />
                          <span>Updated {formatDate(doc.updatedAt)}</span>
                        </div>
                      </div>

                      {/* Arrow Indicator */}
                      <div className="shrink-0 text-white/30 group-hover:text-[#E08476] transition-all group-hover:translate-x-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-px w-0 bg-gradient-to-r from-transparent via-[#E08476] to-transparent transition-all duration-500 group-hover:w-full mx-auto" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer Info */}
        {docs.length > 0 && (
          <div className="mt-12 pt-8 border-t border-white/5">
            <div className="flex items-center justify-between text-sm">
              <div className="text-white/40 font-light">
                Click a document to view or edit
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E08476] rounded-full" />
                <span className="text-white/40 font-light">
                  {docs.length} total {docs.length === 1 ? 'doc' : 'docs'}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}