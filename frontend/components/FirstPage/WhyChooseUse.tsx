"use client";

import { Button } from "../Button";
import { Card } from "../Card";
import Image from "next/image";
import { motion } from "framer-motion";

export default function WhyChooseUs(){
    return (
        <section className="relative mt-10 max-w-7xl bg-white mx-auto rounded-2xl overflow-hidden">
          {/* Background accents */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.1 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 w-80 h-80 bg-linear-to-br from-[#E08476]/15 to-transparent rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.1, delay: 0.25 }}
              viewport={{ once: true }}
              className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 110, damping: 20 }}
              viewport={{ once: true }}
              className="flex justify-center"
            >
              <Button text="Why Choose Us" className="mt-16" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.15 }}
              viewport={{ once: true }}
              className="text-center mt-10 px-6"
            >
              <h2 className="text-4xl">Why teams use SyncSpace</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
                Keep work aligned with structured spaces, clear communication, and tools that scale with your organization.
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.12, delayChildren: 0.15 },
                },
              }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 mt-14 pb-10"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 90, damping: 16 },
                  },
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Card
                  className="mb-0 bg-white/90 backdrop-blur border-slate-200 hover:border-[#E08476]/60 hover:shadow-xl transition-all duration-300"
                  icon={
                    <Image
                      src="/centralizationIcon.png"
                      alt="Centralized Communication"
                      width={368}
                      height={148}
                    />
                  }
                  title="Centralizing communication"
                  description="Bring all your team conversations into one unified platform."
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 90, damping: 16 },
                  },
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Card
                  className="mb-0 bg-white/90 backdrop-blur border-slate-200 hover:border-[#E08476]/60 hover:shadow-xl transition-all duration-300"
                  icon={
                    <Image
                      src="/Organising.png"
                      alt="Organizing teams"
                      width={300}
                      height={148}
                    />
                  }
                  title="Multi-workspace organization"
                  description="Create dedicated spaces for different teams and projects to keep everything organized."
                />
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { type: "spring", stiffness: 90, damping: 16 },
                  },
                }}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Card
                  className="mb-0 bg-white/90 backdrop-blur border-slate-200 hover:border-[#E08476]/60 hover:shadow-xl transition-all duration-300"
                  icon={
                    <Image
                      src="/docs.png"
                      alt="Enterprise-grade documentation"
                      width={300}
                      height={148}
                    />
                  }
                  title="Enterprise-grade documentation"
                  description="Transform ideas into polished documents with advanced editing tools and seamless team workflows."
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              viewport={{ once: true }}
              className="px-8 pb-10 flex flex-wrap gap-4 text-xs md:text-sm text-slate-600"
            >
              {[
                "Designed for internal collaboration",
                "Optimized for multi-workspace orgs",
                "Keeps conversations, docs & updates aligned",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 bg-white/80 backdrop-blur border border-slate-200 rounded-full px-4 py-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E08476]" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </section>
    )
}