"use client";

import { motion } from "framer-motion";
import { FileText, ArrowLeft, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MonthlyInvoiceReport() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      {/* SIDEBAR */}
      <aside className="w-56 shrink-0 border-r border-slate-200 bg-white px-5 py-6">
        <img
          src="/llogo.png"
          alt="Logo"
          className="mb-10 h-10 w-auto"
        />

        <button
          onClick={() => router.push("/dashboard")}
          className="flex w-full items-center gap-3 rounded-lg p-3
          text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1">
        {/* TOP BAR */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-5">
          <h1 className="text-xl font-semibold text-slate-900">
            Monthly Invoice Report
          </h1>

          <span className="text-sm text-slate-500">
            Welcome, Somil
          </span>
        </header>

        {/* COMING SOON */}
        <section className="flex min-h-[calc(100vh-73px)] items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-lg rounded-3xl border border-slate-200
            bg-white p-10 text-center shadow-lg shadow-slate-200/50"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center
              rounded-2xl border border-blue-100 bg-blue-50 text-blue-600"
            >
              <FileText size={40} />
            </motion.div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full
            border border-blue-100 bg-blue-50 px-4 py-2 text-sm text-blue-700">
              <Clock size={15} />
              Under Development
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight text-slate-900">
              Coming Soon
            </h2>

            <p className="text-base leading-7 text-slate-500">
              We're working on something great. The Monthly Invoice
              Report will be available here soon.
            </p>

            <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-blue-600/70" />

            <button
              onClick={() => router.push("/dashboard")}
              className="mt-8 rounded-xl bg-blue-600 px-6 py-3
              text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Return to Dashboard
            </button>
          </motion.div>
        </section>
      </main>
    </div>
  );
}