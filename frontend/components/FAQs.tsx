"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "What is SyncSpace?",
    answer:
      "SyncSpace is an internal collaboration platform designed for organizations to manage workspaces, team communication, tasks, and discussions in one secure and structured environment.",
  },
  {
    id: 2,
    question: "Who is SyncSpace built for?",
    answer:
      "SyncSpace is built for internal teams within organizations, including startups, product teams, engineering teams, operations, and growing companies that need organized and secure collaboration.",
  },
  {
    id: 3,
    question: "How is SyncSpace different from other collaboration tools?",
    answer:
      "Unlike general-purpose communication tools, SyncSpace focuses on structured internal collaboration. It organizes teams into workspaces, keeps conversations tied to work, and provides clarity without noise or distractions.",
  },
  {
    id: 4,
    question: "Is SyncSpace secure for internal use?",
    answer:
      "Yes. SyncSpace is designed with security in mind, offering role-based access and controlled visibility so only the right people can access the right information within your organization.",
  },
];


export default function FAQ() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section className="relative max-w-7xl bg-white mx-auto rounded-2xl px-6 py-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute top-0 left-0 w-80 h-80 bg-linear-to-br from-[#E08476]/10 to-[#E08476]/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-linear-to-tl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
          }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-6xl md:text-7xl font-serif italic text-slate-900">
            FAQs
          </h2>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-0">
          {faqItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: index * 0.1,
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="border-b border-slate-200 last:border-b-0"
            >
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full py-6 px-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors duration-300 group"
              >
                <span className="text-lg md:text-xl font-medium text-slate-800 text-left group-hover:text-slate-900 transition-colors">
                  {item.question}
                </span>

                <motion.div
                  animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 25,
                  }}
                  className="ml-4 shrink-0"
                >
                  {expandedId === item.id ? (
                    <Minus className="w-6 h-6 text-[#E08476]" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#E08476]" />
                  )}
                </motion.div>
              </button>

              {/* Answer */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  expandedId === item.id
                    ? { height: "auto", opacity: 1 }
                    : { height: 0, opacity: 0 }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 40,
                }}
                className="overflow-hidden"
              >
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={
                    expandedId === item.id
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: -10 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 40,
                  }}
                  className="px-6 pb-6 text-slate-600 leading-relaxed"
                >
                  {item.answer}
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
