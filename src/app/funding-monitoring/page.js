"use client";
import { useState } from "react";

export default function FundingMonitoring() {
  const rawData = [
    // ✅ Perfect Match
    {
      mid: "MID001",
      deposit: 10000,
      ecp: 500,
      chargeback: 200,
      actual: 9300,
    },

    // ❌ Underfunded
    {
      mid: "MID002",
      deposit: 8000,
      ecp: 300,
      chargeback: 100,
      actual: 7400,
    },

    // ❌ Overfunded
    {
      mid: "MID003",
      deposit: 12000,
      ecp: 1000,
      chargeback: 500,
      actual: 11000,
    },
  ];

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Process data
  const processed = rawData.map((row) => {
    const expected = row.deposit - row.ecp - row.chargeback;
    const discrepancy = expected - row.actual;

    return {
      ...row,
      expected,
      discrepancy,
      status: discrepancy === 0 ? "Successful" : "Mismatch",
    };
  });

  // Filter + Search
  const filtered = processed.filter((row) => {
    const matchesFilter = filter === "All" || row.status === filter;
    const matchesSearch = row.mid
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  // Summary
  const total = processed.length;
  const success = processed.filter((d) => d.status === "Successful").length;
  const mismatch = processed.filter((d) => d.status === "Mismatch").length;
  const totalGap = processed.reduce((acc, d) => acc + d.discrepancy, 0);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-10">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-2">
        Funding Monitoring
      </h1>
      <p className="text-gray-400 mb-6">
        Settlement Reconciliation Overview
      </p>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        
        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total MIDs</p>
          <h2 className="text-2xl font-semibold">{total}</h2>
        </div>

        <div className="bg-green-500/10 p-5 rounded-xl border border-green-500/20">
          <p className="text-green-400 text-sm">Successful</p>
          <h2 className="text-2xl font-semibold">{success}</h2>
        </div>

        <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/20">
          <p className="text-red-400 text-sm">Mismatch</p>
          <h2 className="text-2xl font-semibold">{mismatch}</h2>
        </div>

        <div className="bg-yellow-500/10 p-5 rounded-xl border border-yellow-500/20">
          <p className="text-yellow-400 text-sm">Total Discrepancy</p>
          <h2 className="text-2xl font-semibold">${totalGap}</h2>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="flex gap-4 mb-4">
        
        {/* Search */}
        <input
          type="text"
          placeholder="Search MID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg w-64"
        />

        {/* Filter */}
        {["All", "Successful", "Mismatch"].map((f) => (
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

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-gray-800">
        <table className="w-full text-left">
          
          <thead className="bg-gray-900 text-gray-300 text-sm">
            <tr>
              <th className="p-4">MID</th>
              <th className="p-4">Deposit</th>
              <th className="p-4">ECP Return</th>
              <th className="p-4">Chargeback</th>
              <th className="p-4">Expected Funding</th>
              <th className="p-4">Actual Funding</th>
              <th className="p-4">Discrepancy</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((row, index) => (
              <tr
                key={index}
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >
                <td className="p-4">{row.mid}</td>
                <td className="p-4">${row.deposit}</td>
                <td className="p-4">${row.ecp}</td>
                <td className="p-4">${row.chargeback}</td>

                <td className="p-4 font-medium">${row.expected}</td>
                <td className="p-4">${row.actual}</td>

                {/* Discrepancy */}
                <td
                  className={`p-4 font-semibold ${
                    row.discrepancy === 0
                      ? "text-green-400"
                      : row.discrepancy > 0
                      ? "text-red-400"
                      : "text-yellow-400"
                  }`}
                >
                  ${row.discrepancy}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      row.status === "Successful"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EMPTY STATE */}
      {filtered.length === 0 && (
        <div className="text-gray-400 mt-6">
          No results found
        </div>
      )}
    </div>
  );
}