"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export default function DiscrepancyPage() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [data, setData] = useState([
    {
      id: "TXN001",
      amount: 120,
      status: "Failed",
      retry: 3,
      reason: "CIS API Failure",
      time: "08:45 AM",
      selected: false,
    },
    {
      id: "TXN002",
      amount: 250,
      status: "Failed",
      retry: 2,
      reason: "Missing Parameter",
      time: "08:30 AM",
      selected: false,
    },
    {
      id: "TXN003",
      amount: 90,
      status: "Failed",
      retry: 5,
      reason: "CIS API Failure",
      time: "08:10 AM",
      selected: false,
    },
  ]);

  // Derived stats
  const total = data.length;
  const failed = data.filter((d) => d.status === "Failed").length;
  const posted = data.filter((d) => d.status === "Posted").length;

  // Search + Filter
  const filteredData = data.filter((d) => {
    const matchesSearch = d.id.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || d.status === filter;
    return matchesSearch && matchesFilter;
  });

  // Toggle checkbox
  const toggleSelect = (index) => {
    const updated = [...data];
    updated[index].selected = !updated[index].selected;
    setData(updated);
  };

  // Simulate backend call (NO DATA CHANGE)
  const simulateLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  // Actions
  const postSingle = () => simulateLoading();
  const postSelected = () => simulateLoading();
  const postAll = () => simulateLoading();

  return (
    <div className="min-h-screen bg-slate-50 p-10 text-slate-800">

      {/* HEADER */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900">
            Unposted Transactions
          </h1>
          <p className="text-slate-500">
            MID002 - 10 April 2026 | Batch Close Time: 9:00 AM – 9:00 PM ET
          </p>
        </div>

        <div className="flex gap-3">
          <button
            disabled={loading}
            onClick={postSelected}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700 disabled:opacity-50"
          >
            Post Selected
          </button>

          <button
            disabled={loading}
            onClick={postAll}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm text-white transition hover:bg-emerald-700 disabled:opacity-50"
          >
            Post All
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total</p>
          <h2 className="text-2xl font-semibold text-slate-900">{total}</h2>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">Failed</p>
          <h2 className="text-2xl font-semibold text-red-700">{failed}</h2>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm text-emerald-700">Posted</p>
          <h2 className="text-2xl font-semibold text-emerald-700">{posted}</h2>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mb-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search Transaction ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded-lg border border-slate-200 bg-white px-4 py-2 text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {["All", "Failed", "Posted"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-2 text-sm transition ${
              filter === f
                ? "bg-blue-600 text-white"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LOADER */}
      {loading && (
        <div className="mb-6 flex items-center gap-3 rounded-lg border border-blue-100 bg-blue-50 px-4 py-3">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent"></div>
          <p className="text-sm text-blue-700">
            Posting transactions to CIS...
          </p>
        </div>
      )}

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">

          <thead className="bg-slate-100 text-sm text-slate-600">
            <tr>
              <th className="p-4"></th>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Retry Count</th>
              <th className="p-4">Reason</th>
              <th className="p-4">Last Retry</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, index) => (
              <motion.tr
                key={index}
                whileHover={{ scale: 1.01 }}
                className="border-t border-slate-200 transition hover:bg-blue-50/50"
              >
                {/* Checkbox */}
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => toggleSelect(index)}
                    className="accent-blue-600"
                  />
                </td>

                <td className="p-4 font-medium text-slate-800">{row.id}</td>
                <td className="p-4">${row.amount}</td>

                {/* Status */}
                <td className="p-4">
                  <span className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-700">
                    {row.status}
                  </span>
                </td>

                <td className="p-4">5</td>

                <td className="p-4 text-slate-600">{row.reason}</td>

                <td className="p-4 text-slate-500">{row.time}</td>

                {/* Action */}
                <td className="p-4">
                  <button
                    disabled={loading}
                    onClick={postSingle}
                    className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white transition hover:bg-blue-700 disabled:opacity-50"
                  >
                    Post
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}