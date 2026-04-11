"use client";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 space-y-12">

      {/* HERO */}
      <div className="text-center max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold"
        >
          Payment Monitoring System
        </motion.h1>

        <p className="text-gray-400 mt-4 text-lg">
          A unified platform to monitor, reconcile, and analyze payment flows
          across multiple systems with real-time insights and operational control.
        </p>
      </div>

      {/* WHAT WE DO */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            What This Platform Does
          </h2>
          <p className="text-gray-400 leading-relaxed">
            This platform provides end-to-end visibility into payment processing,
            posting, reconciliation, and funding workflows. It enables teams to
            quickly identify discrepancies, track transaction statuses, and take
            corrective actions efficiently.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <p className="text-gray-400 text-sm">Core Objective</p>
          <h3 className="text-xl font-semibold mt-2">
            Ensure Accuracy & Transparency in Payment Systems
          </h3>
        </div>
      </div>

      {/* FEATURES */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Key Capabilities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">Posting Monitoring</h3>
            <p className="text-gray-400 text-sm">
              Track transaction posting status and identify failures in real-time.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">Reconciliation</h3>
            <p className="text-gray-400 text-sm">
              Compare payment, CSP, and funding data to detect mismatches.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">Funding Insights</h3>
            <p className="text-gray-400 text-sm">
              Monitor settlement flows and validate expected vs actual funding.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">Discrepancy Handling</h3>
            <p className="text-gray-400 text-sm">
              Drill down into failed transactions and take corrective actions.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-gray-400 text-sm">
              Gain insights into transaction trends, success rates, and revenue.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h3 className="font-semibold mb-2">Operational Efficiency</h3>
            <p className="text-gray-400 text-sm">
              Reduce manual effort with centralized monitoring and automation.
            </p>
          </div>

        </div>
      </div>

      {/* WHY IT MATTERS */}
      <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-white/10 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-semibold mb-3">
          Why This Matters
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Payment systems operate at scale and complexity. This platform ensures
          reliability, transparency, and faster issue resolution — enabling
          businesses to maintain trust, accuracy, and financial integrity.
        </p>
      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-500 text-sm">
        Built for operational excellence in modern payment ecosystems.
      </div>
    </div>
  );
}