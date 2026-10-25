"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Home } from "lucide-react";

export default function FundingMonitoring() {
  const router = useRouter();

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
    <div className="min-h-screen bg-slate-50 p-10 text-slate-800">
      {/* HOME BUTTON */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-700"
        >
          <Home size={16} />
          Home
        </button>
      </div>

      {/* HEADER */}
      <h1 className="mb-2 text-3xl font-semibold text-slate-900">
        Funding Monitoring
      </h1>
      <p className="mb-6 text-slate-500">
        Settlement Reconciliation Overview
      </p>

      {/* SUMMARY */}
      <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total MIDs</p>
          <h2 className="text-2xl font-semibold text-slate-900">{total}</h2>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm text-emerald-700">Successful</p>
          <h2 className="text-2xl font-semibold text-emerald-700">{success}</h2>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">Mismatch</p>
          <h2 className="text-2xl font-semibold text-red-700">{mismatch}</h2>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-700">Total Discrepancy</p>
          <h2 className="text-2xl font-semibold text-amber-700">${totalGap}</h2>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="mb-4 flex flex-wrap gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Search MID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-800 outline-none placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {/* Filter */}
        {["All", "Successful", "Mismatch"].map((f) => (
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

      {/* TABLE */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-100 text-sm text-slate-600">
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
                className="border-t border-slate-200 transition hover:bg-blue-50/50"
              >
                <td className="p-4 font-medium text-slate-800">{row.mid}</td>
                <td className="p-4">${row.deposit}</td>
                <td className="p-4">${row.ecp}</td>
                <td className="p-4">${row.chargeback}</td>

                <td className="p-4 font-medium text-slate-800">
                  ${row.expected}
                </td>
                <td className="p-4">${row.actual}</td>

                {/* Discrepancy */}
                <td
                  className={`p-4 font-semibold ${
                    row.discrepancy === 0
                      ? "text-emerald-600"
                      : row.discrepancy > 0
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}
                >
                  ${row.discrepancy}
                </td>

                {/* Status */}
                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      row.status === "Successful"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
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
        <div className="mt-6 text-slate-500">
          No results found
        </div>
      )}
    </div>
  );
}