"use client";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function AnalyticsPage() {
  // Fake KPI data
  const kpis = [
    { title: "Total Transactions", value: "5,307" },
    { title: "Total Revenue", value: "$1,126,176" },
    { title: "Success Rate", value: "94.5%" },
    { title: "Failure Rate", value: "5.5%" },
    { title: "Total Discrepancy", value: "$8,228" },
    { title: "Avg Transaction", value: "$212" },
  ];

  // Chart data
  const barData = [
    { name: "Web", value: 641025 },
    { name: "iOS", value: 235881 },
    { name: "Android", value: 56337 },
    { name: "IVR", value: 138320 },
    { name: "AutoPay", value: 46382 },
  ];

  const lineData = [
    { day: "Mon", tx: 800 },
    { day: "Tue", tx: 1200 },
    { day: "Wed", tx: 1000 },
    { day: "Thu", tx: 1400 },
    { day: "Fri", tx: 1600 },
    { day: "Sat", tx: 900 },
    { day: "Sun", tx: 600 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10 space-y-10">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold">Analytics Dashboard</h1>
        <p className="text-gray-400">
          Performance & Transaction Insights
        </p>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {kpis.map((kpi, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10"
          >
            <p className="text-gray-400 text-sm">{kpi.title}</p>
            <h2 className="text-xl font-semibold mt-2">{kpi.value}</h2>
          </motion.div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* BAR CHART */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Payment Channel Distribution
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <Tooltip />
              <Bar dataKey="value" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LINE CHART */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">
            Weekly Transactions Trend
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="day" />
              <Tooltip />
              <Line type="monotone" dataKey="tx" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}