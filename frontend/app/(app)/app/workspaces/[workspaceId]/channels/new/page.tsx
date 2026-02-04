"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/axios";
import type { AxiosError } from "axios";
import { ArrowLeft, Hash, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NewChannelPage({
  params,
}: {
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = use(params);

  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function createChannel(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError("Channel name is required");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post<{ id: string }>(
        `/workspaces/${workspaceId}/channels`,
        { name: trimmedName }
      );

      router.push(
        `/app/workspaces/${workspaceId}/channels/${res.data.id}`
      );
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;

      setError(
        error.response?.data?.message ||
          "Failed to create channel"
      );
      setLoading(false);
    }
  }

  return (
    <div className="h-full bg-[#0A0A0A] overflow-y-auto">
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Back Button */}
        <Link
          href={`/app/workspaces/${workspaceId}/channels`}
          className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group mb-8"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm font-light tracking-wide">Back to Channels</span>
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#E08476]" />
            <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
              New Channel
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
            Create a channel
          </h1>

          <p className="text-lg text-white/50 font-light max-w-xl">
            Channels are where your team communicates. They are best organized around a topic — like #marketing or #general.
          </p>
        </div>

        {/* Form Container */}
        <div className="border border-white/5 bg-white/[0.02]">
          <form onSubmit={createChannel} className="p-8 md:p-12">
            <div className="space-y-8">
              {/* Channel Name Input */}
              <div className="space-y-3">
                <label
                  htmlFor="channel-name"
                  className="block text-sm text-white/70 font-light tracking-wide uppercase"
                >
                  Channel Name
                </label>

                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                    <Hash className="w-5 h-5" />
                  </div>
                  <input
                    id="channel-name"
                    type="text"
                    placeholder="e.g. marketing, design, general"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    disabled={loading}
                    className="w-full bg-transparent border border-white/10 text-white text-lg font-light pl-12 pr-6 py-4 focus:outline-none focus:border-[#E08476]/50 transition-colors placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div className="flex items-start gap-2 text-xs text-white/40 font-light">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <p>
                    Channel names must be lowercase, without spaces or periods, and can not be longer than 80 characters.
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
                  type="submit"
                  disabled={loading || !name.trim()}
                  className="group relative bg-[#E08476] hover:bg-[#D67567] text-white font-normal tracking-wide px-8 h-14 transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#E08476] flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Creating channel...</span>
                    </>
                  ) : (
                    <>
                      <Hash className="w-4 h-4" />
                      <span>Create Channel</span>
                    </>
                  )}
                </button>

                <Link
                  href={`/app/workspaces/${workspaceId}/channels`}
                  className="inline-flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-white/70 hover:text-white font-normal tracking-wide px-8 h-14 transition-all duration-300 bg-transparent hover:bg-white/5"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 border-t border-white/5 pt-8">
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-white/40 uppercase tracking-wider text-xs mb-2">Channel Guidelines</div>
              <ul className="space-y-2 text-white/60 font-light">
                <li className="flex items-start gap-2">
                  <span className="text-[#E08476] mt-1">•</span>
                  <span>Use clear, descriptive names that make the channels purpose obvious</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E08476] mt-1">•</span>
                  <span>Keep names short and memorable for easy reference</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E08476] mt-1">•</span>
                  <span>Consider prefixing channels by topic (e.g., proj-website, team-design)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}