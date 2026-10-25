"use client";

import { useRouter } from "next/navigation";
import {
  FileText,
  Activity,
  HeartPulse,
  Wallet,
  ArrowLeft,
} from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  const router = useRouter();

  const features = [
    {
      title: "Invoice Reports",
      description: "View invoice details and monthly reports.",
      icon: FileText,
    },
    {
      title: "Posting Monitoring",
      description: "Track transaction posting status.",
      icon: Activity,
    },
    {
      title: "Transaction Health Report",
      description: "Monitor transaction health and identify issues.",
      icon: HeartPulse,
    },
    {
      title: "Funding Summary Report",
      description: "Review funding activity and payment balances.",
      icon: Wallet,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      {/* SIDEBAR */}
      <aside className="w-56 shrink-0 bg-white border-r border-slate-200 p-5">
        <img
          src="/llogo.png"
          alt="Logo"
          className="h-10 w-auto mb-10"
        />

        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-3 w-full p-3 rounded-lg
          text-slate-600 hover:bg-blue-50 hover:text-blue-700 transition text-sm"
        >
          <ArrowLeft size={18} />
          Dashboard
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 min-w-0">
        <header className="px-8 py-5 border-b border-slate-200 bg-white">
          <h1 className="text-xl font-semibold text-slate-900">About</h1>
          <p className="text-sm text-slate-500 mt-1">
            Payment Monitoring Platform
          </p>
        </header>

        <section className="p-8 max-w-6xl">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-slate-900">
              One platform. Complete visibility.
            </h2>
            <p className="text-slate-500 mt-2 text-sm leading-6 max-w-2xl">
              A centralized platform designed to simplify payment
              operations, monitor transactions, and provide clear
              visibility into posting and funding activities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.08 }}
                  className="p-6 rounded-2xl bg-white
                  border border-slate-200 hover:border-blue-300
                  shadow-sm transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-blue-50
                  flex items-center justify-center text-blue-600 mb-5">
                    <Icon size={23} />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900">
                    {feature.title}
                  </h3>

                  <p className="text-sm text-slate-500 mt-2 leading-6">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <p className="text-xs text-slate-400 mt-8">
            Payment Monitoring Dashboard · About
          </p>
        </section>
      </main>
    </div>
  );
}