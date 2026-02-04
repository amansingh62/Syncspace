import Link from "next/link";
import { MessageSquare, FileText, Users, ChevronRight } from "lucide-react";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  const navItems = [
    {
      href: `/app/workspaces/${workspaceId}/channels`,
      icon: MessageSquare,
      label: "Channels",
    },
    {
      href: `/app/workspaces/${workspaceId}/docs`,
      icon: FileText,
      label: "Docs",
    },
    {
      href: `/app/workspaces/${workspaceId}/members`,
      icon: Users,
      label: "Members",
    },
  ];

  return (
    <div className="flex h-screen bg-[#0A0A0A] overflow-hidden">
      {/* Sidebar Navigation */}
      <nav className="w-64 border-r border-white/5 bg-[#0A0A0A] flex flex-col">
        {/* Workspace Header */}
        <div className="px-6 py-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/70 text-lg font-light">
              W
            </div>
            <div>
              <h2 className="text-white font-light text-lg tracking-tight">Workspace</h2>
              <p className="text-white/40 text-xs font-light">Active</p>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between px-3 py-2.5 text-white/60 hover:text-white hover:bg-white/2 transition-all duration-200 border-l-2 border-transparent hover:border-[#E08476]"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-light tracking-wide">{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="px-6 py-6 border-t border-white/5">
          <Link
            href="/app"
            className="text-xs text-white/40 hover:text-white/60 transition-colors font-light tracking-wide"
          >
            ← Back to Workspaces
          </Link>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden bg-[#0A0A0A]">
        {children}
      </main>
    </div>
  );
}