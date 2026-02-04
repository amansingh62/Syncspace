"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkspace } from "@/lib/workspace.client";
import type { CreateWorkspaceResponse } from "../../../../../types/workspace";
import { ArrowRight, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function CreateWorkspacePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const workspace: CreateWorkspaceResponse = await createWorkspace(name);
      router.push(`/app/workspaces/${workspace.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create workspace");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Accent Glow */}
        <div className="absolute top-1/4 right-1/4 w-150 h-150 bg-[#E08476]/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-100 h-100 bg-[#E08476]/3 rounded-full blur-[100px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-white/5 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-6 py-5 md:px-12 md:py-6">
            <Link 
              href="/app" 
              className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="text-sm font-light tracking-wide">Back to Workspaces</span>
            </Link>
          </div>
        </header>

        {/* Main Form Section */}
        <div className="flex-1 flex items-center justify-center px-6 py-16 md:py-24">
          <div className="w-full max-w-2xl">
            {/* Form Header */}
            <div className="mb-12 md:mb-16">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-12 bg-linear-to-r from-transparent to-[#E08476]" />
                <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
                  New Workspace
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
                Create a workspace
              </h1>
              
              <p className="text-lg text-white/50 font-light max-w-xl">
                Set up a collaborative environment for your team to work together on projects and tasks.
              </p>
            </div>

            {/* Form Container */}
            <div className="border border-white/5 bg-white/2 backdrop-blur-sm">
              <form onSubmit={submit} className="p-8 md:p-12">
                <div className="space-y-8">
                  {/* Workspace Name Input */}
                  <div className="space-y-3">
                    <label 
                      htmlFor="workspace-name" 
                      className="block text-sm text-white/70 font-light tracking-wide uppercase"
                    >
                      Workspace Name
                    </label>
                    <input
                      id="workspace-name"
                      type="text"
                      placeholder="Enter workspace name"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required
                      disabled={loading}
                      className="w-full bg-transparent border border-white/10 text-white text-lg font-light px-6 py-4 focus:outline-none focus:border-[#E08476]/50 transition-colors placeholder:text-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <p className="text-xs text-white/40 font-light">
                      Choose a clear, descriptive name for your workspace
                    </p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="border-l-2 border-red-500/50 bg-red-500/5 px-4 py-3">
                      <p className="text-sm text-red-400 font-light">{error}</p>
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
                          <span>Creating workspace...</span>
                        </>
                      ) : (
                        <>
                          <span>Create Workspace</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <Link
                      href="/app"
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
              <div className="grid md:grid-cols-3 gap-6 text-sm">
                <div>
                  <div className="text-white/40 uppercase tracking-wider text-xs mb-2">Features</div>
                  <div className="text-white/70 font-light">Real-time collaboration</div>
                </div>
                <div>
                  <div className="text-white/40 uppercase tracking-wider text-xs mb-2">Security</div>
                  <div className="text-white/70 font-light">End-to-end encrypted</div>
                </div>
                <div>
                  <div className="text-white/40 uppercase tracking-wider text-xs mb-2">Access</div>
                  <div className="text-white/70 font-light">Invite team members</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}