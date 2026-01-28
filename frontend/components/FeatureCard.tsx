"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({ icon, title, description, className }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative p-6 rounded-2xl bg-white border border-slate-200 cursor-pointer overflow-hidden group",
        className
      )}
    >
      {/* Animated gradient background on hover */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={
          isHovered
            ? { opacity: 1, scale: 1 }
            : { opacity: 0, scale: 0.8 }
        }
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-linear-to-br from-[#E08476]/5 to-blue-400/5 pointer-events-none"
      />

      {/* Animated border glow */}
      <motion.div
        animate={isHovered ? { boxShadow: "0 0 20px rgba(224, 132, 118, 0.2)" } : {}}
        className="absolute inset-0 rounded-2xl pointer-events-none"
      />

      <div className="relative z-10 flex flex-col gap-4">
        <motion.div
          animate={isHovered ? { y: -8 } : { y: 0 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 20 }}
        >
          {icon}
        </motion.div>

        <div className="flex-1">
          <motion.h3
            animate={isHovered ? { color: "#E08476" } : { color: "#0f172a" }}
            className="text-lg font-semibold mb-2 transition-colors duration-300"
          >
            {title}
          </motion.h3>

          <motion.p
            animate={isHovered ? { opacity: 1 } : { opacity: 0.75 }}
            className="text-sm text-slate-600 leading-relaxed"
          >
            {description}
          </motion.p>
        </div>

        {/* Animated bottom accent line */}
        <motion.div
          initial={{ scaleX: 0, originX: 0 }}
          animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ type: "spring" as const, stiffness: 200, damping: 25 }}
          className="h-1 bg-linear-to-r from-[#E08476] to-transparent rounded-full mt-2"
        />
      </div>
    </motion.div>
  );
}