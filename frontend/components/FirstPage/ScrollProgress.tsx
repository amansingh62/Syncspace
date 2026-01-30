"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <motion.div
        style={{ scaleX }}
        className="h-1 origin-left bg-linear-to-r from-[#E08476] via-[#F1C6C0] to-purple-400/70"
      />
    </div>
  );
}

