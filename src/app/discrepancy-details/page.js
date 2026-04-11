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
    <div className="min-h-screen bg-gray-950 text-white p-10">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-semibold">Unposted Transactions</h1>
          <p className="text-gray-400">
           MID002 - 10 April 2026  |  Batch Close Time: 9:00 AM – 9:00 PM ET
          </p>
        </div>

        <div className="flex gap-3">
          <button
            disabled={loading}
            onClick={postSelected}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm disabled:opacity-50"
          >
            Post Selected
          </button>

          <button
            disabled={loading}
            onClick={postAll}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm disabled:opacity-50"
          >
            Post All
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total</p>
          <h2 className="text-2xl font-semibold">{total}</h2>
        </div>

        <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/20">
          <p className="text-red-400 text-sm">Failed</p>
          <h2 className="text-2xl font-semibold">{failed}</h2>
        </div>

        <div className="bg-green-500/10 p-5 rounded-xl border border-green-500/20">
          <p className="text-green-400 text-sm">Posted</p>
          <h2 className="text-2xl font-semibold">{posted}</h2>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search Transaction ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-64"
        />

        {["All", "Failed", "Posted"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm ${
              filter === f
                ? "bg-blue-600"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* LOADER */}
      {loading && (
        <div className="mb-6 flex items-center gap-3 bg-blue-500/10 border border-blue-500/20 px-4 py-3 rounded-lg">
          <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-blue-400 text-sm">
            Posting transactions to CIS...
          </p>
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-left">
          
          <thead className="bg-gray-900 text-gray-300 text-sm">
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
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >
                {/* Checkbox */}
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={row.selected}
                    onChange={() => toggleSelect(index)}
                  />
                </td>

                <td className="p-4">{row.id}</td>
                <td className="p-4">${row.amount}</td>

                {/* Status */}
                <td className="p-4">
                  <span className="px-3 py-1 rounded-full text-sm bg-red-500/20 text-red-400">
                    {row.status}
                  </span>
                </td>

                <td className="p-4">5</td>

                <td className="p-4 text-gray-300">{row.reason}</td>

                <td className="p-4 text-gray-400">{row.time}</td>

                {/* Action */}
                <td className="p-4">
                  <button
                    disabled={loading}
                    onClick={postSingle}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm disabled:opacity-50"
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