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
    <div className="min-h-screen bg-gray-950 text-white p-10">
      
      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-2">
        Posting Monitoring
      </h1>

      <p className="text-gray-400 mb-6">
        
      </p>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        
        <div className="bg-white/5 p-5 rounded-xl border border-white/10">
          <p className="text-gray-400 text-sm">Total MIDs</p>
          <h2 className="text-2xl font-semibold">{total}</h2>
        </div>

        <div className="bg-green-500/10 p-5 rounded-xl border border-green-500/20">
          <p className="text-green-400 text-sm">Success</p>
          <h2 className="text-2xl font-semibold">{success}</h2>
        </div>

        <div className="bg-red-500/10 p-5 rounded-xl border border-red-500/20">
          <p className="text-red-400 text-sm">Failed</p>
          <h2 className="text-2xl font-semibold">{failed}</h2>
        </div>

        <div className="bg-yellow-500/10 p-5 rounded-xl border border-yellow-500/20">
          <p className="text-yellow-400 text-sm">Total Discrepancy</p>
          <h2 className="text-2xl font-semibold">{totalDiscrepancy}</h2>
        </div>
      </div>

      {/* FILTER */}
      <div className="mb-4 flex gap-4">
        {["All", "Success", "Failed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1 rounded-lg text-sm ${
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
                className="border-t border-gray-800 hover:bg-gray-900 transition"
              >
                <td className="p-4">{row.mid}</td>
                <td className="p-4">{row.payment}</td>
                <td className="p-4">{row.deposit}</td>

                <td
                  className={`p-4 font-semibold cursor-pointer ${
                    row.discrepancy === 0
                      ? "text-green-400"
                      : "text-red-400 underline"
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
                    className={`px-3 py-1 rounded-full text-sm ${
                      row.status === "Success"
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
    </div>
  );
}