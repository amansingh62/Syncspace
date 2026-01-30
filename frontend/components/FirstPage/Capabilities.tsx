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
    <section className="relative max-w-7xl mx-auto px-6 py-24">
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
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.06 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            viewport={{ once: true }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[32rem] h-[32rem] bg-purple-500 rounded-full blur-3xl"
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

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="mt-6 text-sm md:text-base text-white/70 max-w-xl"
          >
            Teams that care about structure, clarity, and secure internal
            collaboration across workspaces and channels.
          </motion.p>

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
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 120,
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
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4 }}
                  transition={{
                    type: "spring" as const,
                    stiffness: 120,
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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.8,
              }}
              viewport={{ once: true }}
              className="pt-4 flex flex-wrap justify-center gap-3 text-xs md:text-sm text-white/75"
            >
              {[
                "Product & engineering orgs",
                "Operations & enablement teams",
                "Leaders who need clean internal communication",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E08476]" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
