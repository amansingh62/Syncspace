"use client";

import { motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("core-features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const navItems = [
    { name: "Home", href: "/", onClick: () => router.push("/") },
    { name: "Features", href: "#core-features", onClick: scrollToFeatures },
  ];

  return (
    <main className="px-4">
      <nav className="flex items-center justify-between bg-white/80 backdrop-blur border border-slate-200/80 rounded-4xl px-4 md:px-8 py-3.5 mt-6 max-w-7xl mx-auto shadow-[0_10px_30px_rgba(15,23,42,0.06)]">
        <button
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => router.push("/")}
          aria-label="Go to SyncSpace home"
        >
          <div className="h-8 w-8 rounded-2xl bg-linear-to-br from-[#E08476]/80 to-[#F1C6C0]/80 flex items-center justify-center border border-white shadow-sm group-hover:scale-105 transition-transform">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              SyncSpace
            </span>
            <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
              Team Workspaces
            </span>
          </div>
        </button>

        <div className="flex items-center gap-3 md:gap-6">
          <ul className="hidden md:flex items-center gap-6 list-none font-medium">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <motion.button
                  onClick={item.onClick}
                  className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors py-1"
                  initial="initial"
                  whileHover="hover"
                  animate={pathname === item.href ? "active" : "initial"}
                >
                  <motion.span
                    className="text-black font-bold"
                    variants={{
                      initial: { opacity: 0, x: 8 },
                      hover: { opacity: 1, x: 0 },
                      active: { opacity: 1, x: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    •
                  </motion.span>
                  <motion.span
                    className="relative"
                    variants={{
                      initial: { x: -10 },
                      hover: { x: 0 },
                      active: { x: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.name}
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[#E08476] origin-left"
                      initial={{ scaleX: 0 }}
                      animate={
                        pathname === item.href
                          ? { scaleX: 1, opacity: 1 }
                          : { scaleX: 0, opacity: 0 }
                      }
                      transition={{ duration: 0.25 }}
                    />
                  </motion.span>
                </motion.button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-slate-500 bg-white/80 border border-slate-200 rounded-full px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E08476]" />
              <span>Internal SaaS</span>
            </div>

            <div className="hidden md:block w-px h-5 bg-gray-300" />

            {/* Sign In (desktop) */}
            <div className="hidden md:block">
              <motion.button
                onClick={() => router.push("/login")}
                className="bg-black text-white px-5 py-2 rounded-3xl flex items-center overflow-hidden"
                whileHover="hover"
                initial="initial"
              >
                <motion.span
                  variants={{
                    initial: { x: 0 },
                    hover: { x: -6 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  Sign In
                </motion.span>
                <motion.span
                  className="flex items-center"
                  variants={{
                    initial: { opacity: 0, x: -10 },
                    hover: { opacity: 1, x: 4 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </motion.button>
            </div>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="md:hidden inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 bg-white/80 text-slate-800"
              aria-label="Toggle navigation"
              onClick={() => setIsMobileOpen((prev) => !prev)}
            >
              {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isMobileOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto", marginTop: 8 },
          closed: { opacity: 0, height: 0, marginTop: 0 },
        }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
        className="md:hidden max-w-7xl mx-auto overflow-hidden"
      >
        <div className="mt-2 bg-white/90 backdrop-blur rounded-2xl border border-slate-200 shadow-lg px-4 py-4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  setIsMobileOpen(false);
                  item.onClick();
                }}
                className="flex items-center justify-between py-2 text-sm font-medium text-slate-800"
              >
                <span>{item.name}</span>
                {pathname === item.href && (
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E08476]" />
                )}
              </button>
            ))}
          </div>

          <div className="h-px bg-slate-200/80" />

          <button
            onClick={() => {
              setIsMobileOpen(false);
              router.push("/login");
            }}
            className="w-full bg-black text-white px-4 py-2.5 rounded-full text-sm font-medium flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </main>
  );
}