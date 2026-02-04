import Link from "next/link";
import { serverFetch } from "@/lib/serverFetch";
import { Hash, Plus } from "lucide-react";

interface Channel {
  id: string;
  name: string;
  workspaceId: string;
  createdAt: string;
}

export default async function ChannelsPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  const res = await serverFetch(
    `/workspaces/${workspaceId}/channels`
  );

  if (!res.ok) {
    return null;
  }

  const channels: Channel[] = await res.json();

  return (
    <div className="h-full bg-[#0A0A0A] overflow-y-auto no-scrollbar md:scrollbar-default">
      <div className="max-w-4xl mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-[#E08476]" />
            <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
              Communication
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
            <div>
              <h1 className="text-3xl md:text-5xl font-light tracking-tight text-white mb-2 md:mb-3">
                Channels
              </h1>
              <p className="text-lg text-white/50 font-light">
                {channels.length} {channels.length === 1 ? 'channel' : 'channels'} available
              </p>
            </div>

            <Link
              href={`/app/workspaces/${workspaceId}/channels/new`}
className="group bg-[#E08476] hover:bg-[#D67567] text-white px-4 md:px-6 py-2.5 md:py-3 transition-all duration-300 flex items-center gap-2 self-start md:self-auto"
            >
              <Plus className="w-4 h-4 transition-transform group-hover:rotate-90" />
              <span className="font-normal tracking-wide">New Channel</span>
            </Link>
          </div>
        </div>

        {/* Channels List */}
        {channels.length === 0 ? (
          <div className="border border-white/5 bg-white/2">
            <div className="p-8 md:p-16 text-center">
              <div className="w-16 h-16 mx-auto mb-4 border border-white/10 flex items-center justify-center">
                <Hash className="w-8 h-8 text-white/30" />
              </div>
              <h3 className="text-lg text-white/70 font-light mb-2">
                No channels yet
              </h3>
              <p className="text-white/40 font-light mb-6">
                Create your first channel to start collaborating
              </p>
              <Link
                href={`/app/workspaces/${workspaceId}/channels/new`}
                className="inline-flex items-center gap-2 bg-[#E08476] hover:bg-[#D67567] text-white px-6 py-3 transition-colors font-normal tracking-wide"
              >
                <Plus className="w-4 h-4" />
                Create Channel
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {channels.map((channel) => (
              <Link
                key={channel.id}
                href={`/app/workspaces/${workspaceId}/channels/${channel.id}`}
                className="group block"
              >
                <div className="relative border border-white/5 bg-white/2 hover:border-[#E08476]/30 transition-all duration-300 overflow-hidden">
                  {/* Hover Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#E08476] transition-all duration-300 group-hover:w-1" />
                  
                  <div className="px-4 md:px-6 py-3 md:py-4">
                    <div className="flex items-center gap-4">
                      {/* Channel Icon */}
                      <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 border border-white/10 flex items-center justify-center">
                        <Hash className="w-5 h-5" />
                      </div>

                      {/* Channel Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base md:text-lg font-light text-white group-hover:text-[#E08476] transition-colors truncate">
                          {channel.name}
                        </h3>
                        <p className="text-xs text-white/40 font-light">
                          Created {new Date(channel.createdAt).toLocaleDateString()}
                        </p>
                      </div>

                      {/* Arrow Indicator */}
                      <div className="shrink-0 text-white/40 md:text-white/30 md:group-hover:text-[#E08476] md:transition-all md:group-hover:translate-x-1">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="h-px w-0 bg-linear-to-r from-transparent via-[#E08476] to-transparent transition-all duration-500 group-hover:w-full mx-auto" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer Info */}
        {channels.length > 0 && (
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/5">
            <div className="flex items-center justify-between text-sm">
              <div className="text-white/40 font-light">
                Select a channel to view messages
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#E08476] rounded-full" />
                <span className="text-white/40 font-light">All channels active</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}