"use client";

import { Button } from "../Button";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  LockKeyhole,
  MessagesSquare,
  PanelsTopLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

export function TitlePage() {
  const router = useRouter();

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById("core-features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const container = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
        staggerChildren: 0.12,
        delayChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 90, damping: 18 },
    },
  };

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:wght@300;400;500&family=Space+Grotesk:wght@300;400;500&family=Crimson+Pro:ital,wght@0,200;0,300;0,400;0,500;1,200;1,300&family=Inter:wght@300;400;500&display=swap');
        
        .aesthetic-3 {
          font-family: "Roboto Mono", monospace;
          letter-spacing: 0.12em;
          font-weight: 900;
          font-size: 0.7rem;
        }
        
        .professional-3 {
          font-family: "Roboto Mono", monospace;
          letter-spacing: 0.2em;
          font-weight: 800;
        }

        .main-heading-italic {
          font-family: 'Crimson Pro', serif;
          font-weight: 300;
        }

        .gradient-word {
          background: linear-gradient(to right, #E08476, #F1C6C0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: "Roboto Mono", monospace;

        }

        .main-heading-italic {
          font-family: 'Crimson Pro', serif;
          font-weight: 300;
        }

        .description-text {
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          line-height: 1.6;
        }
      `}</style>

      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mt-6 max-w-7xl bg-white mx-auto rounded-2xl px-4 sm:px-6 md:px-12 py-14 sm:py-16 md:py-20 bg-[radial-gradient(circle_at_top_right,#E08476_0%,#E08476_20%,white_60%)] overflow-hidden"
      >
        {/* Subtle animated background accents */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute -top-24 -right-24 w-60 h-60 sm:w-72 sm:h-72 md:w-96 md:h-96 bg-linear-to-bl from-[#E08476]/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.25 }}
            className="absolute -bottom-28 -left-20 w-[18rem] h-[18rem] sm:w-[22rem] sm:h-[22rem] md:w-[28rem] md:h-[28rem] bg-linear-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left: Copy */}
          <div className="lg:col-span-7">
            <motion.div variants={item} className="flex items-center gap-3 flex-wrap">
              <Button text="NextGen Collab" className="mt-0" />
              <span className="aesthetic-3 uppercase inline-flex items-center gap-2 text-slate-700 border border-slate-200 bg-white/70 backdrop-blur px-3 py-2 rounded-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E08476]" />
                Built for internal teams
              </span>
            </motion.div>

            <motion.div variants={item} className="mt-10">
              <h1 className="tracking-tight leading-tight text-4xl sm:text-5xl md:text-6xl">
                SyncSpace brings your{" "}
                <span className="main-heading-italic italic text-gray-700">
                  <span className="text-[#E08476] gradient-word">Team</span>,{" "}
                  <span className="text-[#E08476] gradient-word">Tasks</span>, and{" "}
                  <span className="text-[#E08476] gradient-word tracking-tighter">
                    Conversations
                  </span>
                </span>{" "}
                together.
              </h1>
            </motion.div>

            <motion.div variants={item} className="mt-6">
              <p className="description-text text-gray-600/80 max-w-xl text-base md:text-lg">
                An internal collaboration platform that keeps teams aligned across
                workspaces, channels, and documentation—with security and access
                controls built in.
              </p>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
              <motion.button
                onClick={() => router.push("/register")}
                className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 overflow-hidden"
                whileHover="hover"
                initial="initial"
                whileTap={{ scale: 0.97 }}
              >
                <motion.span
                  variants={{ initial: { x: 0 }, hover: { x: -4 } }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  Get Started
                </motion.span>
                <motion.span
                  className="flex items-center"
                  variants={{ initial: { opacity: 0, x: -8 }, hover: { opacity: 1, x: 0 } }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>

              <motion.button
                onClick={scrollToFeatures}
                className="bg-white/80 backdrop-blur text-slate-900 px-6 py-3 rounded-full border border-slate-200 hover:border-slate-300 transition-colors"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Features
              </motion.button>
            </motion.div>

            <motion.div
              variants={item}
              className="mt-10 professional-3 flex flex-wrap items-center gap-5 text-xs text-gray-700"
            >
              <span className="inline-flex items-center gap-2">
                <LockKeyhole className="h-4 w-4 text-[#E08476]" />
                SECURE
              </span>
              <span className="text-[#E08476] text-xl leading-none">•</span>
              <span className="inline-flex items-center gap-2">
                <PanelsTopLeft className="h-4 w-4 text-[#E08476]" />
                ORGANIZED
              </span>
              <span className="text-[#E08476] text-xl leading-none">•</span>
              <span className="inline-flex items-center gap-2">
                <MessagesSquare className="h-4 w-4 text-[#E08476]" />
                FAST
              </span>
            </motion.div>

            <motion.div variants={item} className="mt-8 flex flex-wrap gap-3 text-sm text-slate-700">
              {[
                "Workspace-based structure",
                "Real-time channels & docs",
                "Role-based access control",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 bg-white/70 backdrop-blur border border-slate-200 rounded-full px-4 py-2"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#E08476]" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Preview */}
          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <motion.div
              variants={item}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative rounded-3xl border border-slate-200 bg-white/70 backdrop-blur shadow-lg overflow-hidden"
            >
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -right-20 w-80 h-80 bg-linear-to-bl from-[#E08476]/25 to-transparent rounded-full blur-3xl" />
                <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-linear-to-tr from-blue-400/12 to-purple-400/10 rounded-full blur-3xl" />
              </div>

              <div className="relative p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-slate-800">
                    Product preview
                  </div>
                  <span className="aesthetic-3 uppercase text-slate-600 border border-slate-200 bg-white/70 backdrop-blur px-3 py-2 rounded-xl">
                    LIVE
                  </span>
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-2xl bg-linear-to-br from-[#E08476]/25 to-[#E08476]/5 border border-[#E08476]/25 flex items-center justify-center">
                      <PanelsTopLeft className="h-5 w-5 text-[#E08476]" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Acme Workspace</div>
                      <div className="text-sm text-slate-500">3 teams • 12 channels</div>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    {[
                      { title: "Engineering", desc: "Ship faster with focused channels" },
                      { title: "Product", desc: "Decisions captured next to work" },
                      { title: "Ops", desc: "Secure internal updates and docs" },
                    ].map((row) => (
                      <div
                        key={row.title}
                        className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3"
                      >
                        <div className="mt-0.5 h-6 w-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-[#E08476]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {row.title}
                          </div>
                          <div className="text-sm text-slate-600">{row.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}

export default TitlePage;