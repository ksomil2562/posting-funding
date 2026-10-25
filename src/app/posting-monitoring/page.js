"use client";
import { useState } from "react";

export default function PostingMonitoring() {
  const rawData = [
    { mid: "MID001", payment: 120, deposit: 120 },
    { mid: "MID002", payment: 200, deposit: 180 },
    { mid: "MID003", payment: 150, deposit: 150 },
  ];

  const [filter, setFilter] = useState("All");

  const processedData = rawData.map((row) => {
    const discrepancy = row.payment - row.deposit;
    return {
      ...row,
      discrepancy,
      status: discrepancy === 0 ? "Success" : "Failed",
    };
  });

  const filteredData =
    filter === "All"
      ? processedData
      : processedData.filter((d) => d.status === filter);

  const total = processedData.length;
  const success = processedData.filter((d) => d.status === "Success").length;
  const failed = processedData.filter((d) => d.status === "Failed").length;
  const totalDiscrepancy = processedData.reduce(
    (acc, d) => acc + d.discrepancy,
    0
  );

  return (
    <div className="min-h-screen bg-slate-50 p-10 text-slate-800">

      {/* HEADER */}
      <h1 className="mb-2 text-3xl font-semibold text-slate-900">
        Posting Monitoring
      </h1>

      <p className="mb-6 text-slate-500">
        
      </p>

      {/* SUMMARY CARDS */}
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">

        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">Total MIDs</p>
          <h2 className="text-2xl font-semibold text-slate-900">{total}</h2>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5">
          <p className="text-sm text-emerald-700">Success</p>
          <h2 className="text-2xl font-semibold text-emerald-700">{success}</h2>
        </div>

        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-700">Failed</p>
          <h2 className="text-2xl font-semibold text-red-700">{failed}</h2>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm text-amber-700">Total Discrepancy</p>
          <h2 className="text-2xl font-semibold text-amber-700">
            {totalDiscrepancy}
          </h2>
        </div>
      </div>

      {/* FILTER */}
      <div className="mb-4 flex gap-4">
        {["All", "Success", "Failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-4 py-1 text-sm transition ${
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
              <th className="p-4">Payment Report Count</th>
              <th className="p-4">Deposit Count</th>
              <th className="p-4">Posting Discrepancy</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((row, index) => (
              <tr
                key={index}
                className="border-t border-slate-200 transition hover:bg-blue-50/50"
              >
                <td className="p-4 font-medium text-slate-800">{row.mid}</td>
                <td className="p-4">{row.payment}</td>
                <td className="p-4">{row.deposit}</td>

                <td
                  className={`cursor-pointer p-4 font-semibold ${
                    row.discrepancy === 0
                      ? "text-emerald-600"
                      : "text-red-600 underline"
                  }`}
                  onClick={() =>
                    row.discrepancy !== 0 &&
                    window.open("/discrepancy-details", "_blank")
                  }
                >
                  {row.discrepancy}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      row.status === "Success"
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
    </div>
  );
}