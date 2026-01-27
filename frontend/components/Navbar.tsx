"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
  ];

  return (
    <main>
      <nav className="flex items-center justify-between bg-white rounded-4xl px-8 py-4 mt-6 max-w-7xl mx-auto">
        <div
          className="text-xl font-medium cursor-pointer"
          onClick={() => router.push("/")}
        >
          SyncSpace
        </div>

        <div className="flex items-center gap-6">
          <ul className="flex items-center gap-6 list-none font-medium">
            {navItems.map((item) => (
              <li key={item.name} className="relative group">
                <motion.button
                  onClick={() => router.push(item.href)}
                  className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors"
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
                    variants={{
                      initial: { x: -10 },
                      hover: { x: 0 },
                      active: { x: 0 },
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.name}
                  </motion.span>
                </motion.button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Get Started */}
            <motion.button
              onClick={() => router.push("/register")}
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
                <ArrowRight size={16} />
              </motion.span>
            </motion.button>

            <div className="w-px h-5 bg-gray-300" /> 


            {/* Sign In */}
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
        </div>
      </nav>
    </main>
  );
}