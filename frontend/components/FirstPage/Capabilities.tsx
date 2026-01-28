"use client";

import { Button } from "../Button";
import { motion } from "framer-motion";

export default function Capabilities() {
  const features = [
    "Workspaces",
    "Team Communication",
    "Task Coordination",
    "Role-Based Access",
    "Internal Discussions",
    "Secure Collaboration",
  ];

  const firstRow = features.slice(0, 3);
  const secondRow = features.slice(3, 6);

  return (
    <section className="relative max-w-[88%] mx-auto px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          type: "spring" as const,
          stiffness: 100,
          damping: 20,
        }}
        viewport={{ once: true }}
        className="relative rounded-3xl bg-black p-12 md:p-12 lg:p-10 overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            className="absolute top-0 right-0 w-96 h-96 bg-[#E08476] rounded-full blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.05 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: true }}
            className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400 rounded-full blur-3xl"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Button/Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring" as const,
              stiffness: 100,
              damping: 20,
            }}
            viewport={{ once: true }}
          >
            <Button
              text="WHO WE LOVE TO WORK WITH"
              className="mt-2 text-white"
            />
          </motion.div>

          {/* Features Grid */}
          <div className="mt-8 md:mt-10 space-y-6 w-full">
            {/* First Row - 3 items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
                delay: 0.2,
              }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
            >
              {firstRow.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 20,
                    delay: 0.3 + index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <span className="text-2xl md:text-4xl lg:text-4xl font-serif text-white/95">
                    {feature}
                  </span>
                  {index < 2 && (
                    <span className="text-[#E08476] text-2xl md:text-5xl">
                      •
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* Second Row - 3 items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
                delay: 0.4,
              }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center justify-center gap-4 md:gap-8"
            >
              {secondRow.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 100,
                    damping: 20,
                    delay: 0.7 + index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4"
                >
                  <span className="text-2xl md:text-4xl lg:text-4xl font-serif text-white/95">
                    {feature}
                  </span>
                  {index < 2 && (
                    <span className="text-[#E08476] text-2xl md:text-5xl">
                      •
                    </span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
