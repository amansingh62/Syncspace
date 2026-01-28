"use client";

import React from "react";
import { Button } from "./Button";
import { FeatureCard } from "./FeatureCard";
import { Briefcase, KeyRound, LockKeyhole, MessageSquareText } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function IconBadge({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      whileInView={{ scale: 1, rotate: 0 }}
      transition={{
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
        delay: delay || 0,
      }}
      viewport={{ once: true }}
      className="h-14 w-14 rounded-xl bg-linear-to-br from-[#E08476]/30 to-[#E08476]/10 border border-[#E08476]/40 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {children}
    </motion.div>
  );
}

export default function CoreFeatures() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative mt-10 max-w-7xl bg-white mx-auto rounded-2xl px-6 py-24 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 right-0 w-96 h-96 bg-linear-to-bl from-[#E08476]/20 to-[#E08476]/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute bottom-0 left-0 w-80 h-80 bg-linear-to-tr from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-linear-to-br from-cyan-400/10 to-blue-400/5 rounded-full blur-3xl"
        />
      </div>

      {/* Grid pattern background */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.02]"
        viewBox="0 0 1200 600"
      >
        <defs>
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#E08476" />
          </pattern>
        </defs>
        <rect width="1200" height="600" fill="url(#grid)" />
      </svg>

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
          }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button text="Core Features" className="mt-0" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring" as const,
            stiffness: 100,
            damping: 20,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="text-center mt-12 px-6"
        >
          <h2 className="text-4xl leading-tight">
            Built for focused team collaboration
          </h2>
          <p className="mt-6 text-slate-600 max-w-lg mx-auto leading-relaxed text-md font-light">
            Everything you need to keep work organized, communication clear, and access
            controlled—without sacrificing security.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20"
        >
          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={
                <IconBadge delay={0}>
                  <Briefcase className="h-6 w-6 text-[#E08476]" />
                </IconBadge>
              }
              title="Workspace-based collaboration"
              description="Organize teams, projects, and discussions cleanly."
              className="h-full"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={
                <IconBadge delay={0.1}>
                  <MessageSquareText className="h-6 w-6 text-[#E08476]" />
                </IconBadge>
              }
              title="Real-time communication"
              description="Conversations that stay where work happens."
              className="h-full"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={
                <IconBadge delay={0.2}>
                  <KeyRound className="h-6 w-6 text-[#E08476]" />
                </IconBadge>
              }
              title="Role-based access"
              description="Only the right people see the right things."
              className="h-full"
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <FeatureCard
              icon={
                <IconBadge delay={0.3}>
                  <LockKeyhole className="h-6 w-6 text-[#E08476]" />
                </IconBadge>
              }
              title="Secure by design"
              description="Built for internal organizational use."
              className="h-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}