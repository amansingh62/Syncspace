"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail, Github, Twitter } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Footer() {
      
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
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
    <footer className="relative mt-12 bg-black max-w-7xl mx-auto text-white rounded-t-2xl overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-black rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 rounded-2xl mt-12 px-10 py-6">
        <div className="grid-cols-1 flex justify-between md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div>
            {/* Left section - CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 100,
                damping: 20,
              }}
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2 lg:col-span-1 flex flex-col justify-start"
            >
              <h2 className="text-4xl md:text-5xl font-serif italic mb-8 leading-tight">
                Bring your team<br />
                <span className="block">into one space.</span>
              </h2>
              <motion.button
                whileHover="hover"
                initial="initial"
                whileTap={{ scale: 0.95 }}
                className="bg-white text-slate-950 px-8 py-3 rounded-full font-medium w-fit hover:bg-slate-100 transition-colors duration-300 flex items-center overflow-hidden"
              >
                <motion.span
                  variants={{
                    initial: { x: 0 },
                    hover: { x: -6 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  onClick={() => router.push("/register")}
                >
                  Get Started
                </motion.span>
                <motion.span
                  className="flex items-center"
                  variants={{
                    initial: { opacity: 0, x: -10 },
                    hover: { opacity: 1, x: 4 },
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <ArrowRight className="h-4 w-4" />
                </motion.span>
              </motion.button>
            </motion.div>
          </div>

          <div>
            {/* Right section - Links grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 md:grid-cols-2 gap-2"
            >
              {/* Product Column */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-6 text-slate-300">
                  Product
                </h3>
                <ul className="space-y-3">
                  {[
                    "Workspaces",
                    "Team Communication",
                    "Task Management",
                    "Role-Based Access",
                  ].map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ x: 5 }}
                      className="text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Connect Column */}
              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-semibold mb-6 text-slate-300">
                  Connect
                </h3>
                <ul className="space-y-3">
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="group text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <a
                      href="mailto:support@syncspace.com"
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>Email</span>
                    </a>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="group text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <a
                      href="https://github.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>GitHub</span>
                    </a>
                  </motion.li>
                  <motion.li
                    whileHover={{ x: 5 }}
                    className="group text-slate-400 hover:text-white transition-colors duration-300 cursor-pointer"
                  >
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Twitter className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <span>Twitter</span>
                    </a>
                  </motion.li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
        className="h-px bg-linear-to-r from-transparent via-slate-700 to-transparent mb-8"
      />

      {/* Bottom Attribution */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-center text-xs text-slate-500 font-mono"
      >
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-slate-400">SYNCSPACE</span>. BUILT FOR INTERNAL
          TEAM COLLABORATION.
        </p>
      </motion.div>
    </footer>
  );
}
