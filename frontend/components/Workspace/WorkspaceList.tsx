import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { fetchWorkspaces } from '@/lib/workspace.server';
import type { WorkspaceMember } from '@/types/workspace';

export default async function WorkspaceList() {
  const workspaces: WorkspaceMember[] = await fetchWorkspaces();
  
  return (
    <section className="min-h-screen bg-[#0A0A0A] py-24 px-6 md:px-12 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0">
        {/* Accent Glow */}
        <div className="absolute top-0 left-1/4 w-125 h-125 bg-[#E08476]/5 rounded-full blur-[120px] -translate-y-1/2" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-12 bg-linear-to-r from-transparent to-[#E08476]" />
            <span className="text-[#E08476]/80 text-sm font-light tracking-[0.2em] uppercase">
              Dashboard
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-3">
                Your Workspaces
              </h1>
              <p className="text-lg text-white/50 font-light">
                {workspaces.length} {workspaces.length === 1 ? 'workspace' : 'workspaces'} active
              </p>
            </div>

            {workspaces.length > 0 && (
              <div className="flex items-center gap-8 text-sm">
                <div>
                  <div className="text-white/40 uppercase tracking-wider text-xs mb-1">Sort by</div>
                  <div className="text-white/70">Recent Activity</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Workspace Grid */}
        {workspaces.length === 0 ? (
          <div className="border border-white/5 bg-white/2 backdrop-blur-sm">
            <div className="p-16 md:p-24 text-center">
              <div className="w-20 h-20 mx-auto mb-6 border border-white/10 flex items-center justify-center">
                <div className="w-12 h-12 border border-[#E08476]/30" />
              </div>
              <h3 className="text-xl text-white/70 font-light mb-3">
                No workspaces yet
              </h3>
              <p className="text-white/40 font-light mb-8 max-w-md mx-auto">
                Create your first workspace to start collaborating with your team
              </p>
              <Link 
                href="/app/workspaces/new"
                className="inline-flex items-center gap-2 bg-[#E08476] hover:bg-[#D67567] text-white px-6 py-3 transition-colors font-normal tracking-wide"
              >
                Create Workspace
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {workspaces.map((ws) => (
              <Link 
                key={ws.id} 
                href={`/app/workspaces/${ws.workspace.id}`}
                className="block group"
              >
                <div className="relative border border-white/5 bg-white/2 backdrop-blur-sm hover:border-[#E08476]/30 transition-all duration-300 overflow-hidden">
                  {/* Hover Effect Line */}
                  <div className="absolute left-0 top-0 bottom-0 w-0 bg-[#E08476] transition-all duration-300 group-hover:w-1" />
                  
                  <div className="p-6 md:p-8">
                    <div className="flex items-center justify-between gap-6">
                      {/* Left Side - Main Content */}
                      <div className="flex items-center gap-5 flex-1 min-w-0">
                        {/* Workspace Icon */}
                        <div className="relative shrink-0">
                          <div className="w-14 h-14 border border-white/10 flex items-center justify-center text-white/70 text-xl font-light transition-colors group-hover:border-[#E08476]/50 group-hover:text-[#E08476]">
                            {ws.workspace.name.charAt(0).toUpperCase()}
                          </div>
                          {/* Active Indicator */}
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#E08476] border-2 border-[#0A0A0A]" />
                        </div>

                        {/* Workspace Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl md:text-2xl font-light text-white tracking-tight truncate group-hover:text-[#E08476] transition-colors">
                            {ws.workspace.name}
                          </h3>
                        </div>
                      </div>

                      {/* Right Side - Arrow */}
                      <div className="shrink-0">
                        <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-[#E08476]/50 transition-all">
                          <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-[#E08476] group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Border Accent */}
                  <div className="h-px w-0 bg-linear-to-r from-transparent via-[#E08476] to-transparent transition-all duration-500 group-hover:w-full mx-auto" />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Footer Stats (if workspaces exist) */}
        {workspaces.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/5">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <div className="text-2xl font-light text-white mb-1">{workspaces.length}</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Total Workspaces</div>
              </div>
              <div>
                <div className="text-2xl font-light text-[#E08476] mb-1">Active</div>
                <div className="text-xs text-white/40 uppercase tracking-wider">Status</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}