"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Activity,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ShieldAlert,
  Wallet,
  Search,
  CalendarDays,
  ChevronDown,
  X,
  Filter,
  RefreshCw,
} from "lucide-react";

// Illustrative data only. Replace with your real API response.
const sampleData = [
  {
    mid: "MID-1001",
    total: 12500,
    success: 11900,
    failed: 600,
    refunds: 180,
    chargebacks: 12,
    ecpReturns: 8,
    tokenized: 8200,
    preLogin: 7400,
    postLogin: 5100,
    region: "North America",
    paymentMethod: "Card",
    channel: "Web",
    accountType: "Residential",
  },
  {
    mid: "MID-1002",
    total: 9800,
    success: 9212,
    failed: 588,
    refunds: 145,
    chargebacks: 7,
    ecpReturns: 11,
    tokenized: 5900,
    preLogin: 6100,
    postLogin: 3700,
    region: "North America",
    paymentMethod: "Bank",
    channel: "IVR",
    accountType: "Commercial",
  },
  {
    mid: "MID-1003",
    total: 7600,
    success: 7144,
    failed: 456,
    refunds: 96,
    chargebacks: 4,
    ecpReturns: 5,
    tokenized: 4200,
    preLogin: 4800,
    postLogin: 2800,
    region: "Europe",
    paymentMethod: "Card",
    channel: "Mobile",
    accountType: "Residential",
  },
  {
    mid: "MID-1004",
    total: 6400,
    success: 6080,
    failed: 320,
    refunds: 110,
    chargebacks: 3,
    ecpReturns: 6,
    tokenized: 3900,
    preLogin: 4000,
    postLogin: 2400,
    region: "Europe",
    paymentMethod: "PayPal",
    channel: "Web",
    accountType: "Commercial",
  },
];

const pct = (value, total) =>
  total ? `${((value / total) * 100).toFixed(1)}%` : "—";

const number = (value) => value.toLocaleString("en-US");

export default function TransactionHealthReport() {
  const router = useRouter();

  const [selectedMids, setSelectedMids] = useState([]);
  const [pendingMids, setPendingMids] = useState([]);
  const [midSearch, setMidSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [midFilterOpen, setMidFilterOpen] = useState(false);
  const [period, setPeriod] = useState("30 days");

  // The applied selection controls KPIs and table data.
  const filteredData = useMemo(
    () =>
      sampleData.filter(
        (row) =>
          selectedMids.length === 0 ||
          selectedMids.includes(row.mid)
      ),
    [selectedMids]
  );

  // Table search does not change the overall KPI totals.
  const tableData = useMemo(
    () =>
      filteredData.filter((row) =>
        [
          row.mid,
          row.region,
          row.paymentMethod,
          row.channel,
          row.accountType,
        ]
          .join(" ")
          .toLowerCase()
          .includes(tableSearch.toLowerCase())
      ),
    [filteredData, tableSearch]
  );

  const totals = useMemo(
    () =>
      filteredData.reduce(
        (acc, row) => {
          Object.keys(acc).forEach((key) => {
            acc[key] += row[key];
          });
          return acc;
        },
        {
          total: 0,
          success: 0,
          failed: 0,
          refunds: 0,
          chargebacks: 0,
          ecpReturns: 0,
          tokenized: 0,
          preLogin: 0,
          postLogin: 0,
        }
      ),
    [filteredData]
  );

  const nonTokenized = Math.max(0, totals.total - totals.tokenized);
  const allMids = selectedMids.length === 0;

  const metrics = [
    {
      label: "Total Transactions",
      value: number(totals.total),
      icon: Activity,
      color: "text-blue-600",
    },
    {
      label: "Success Rate",
      value: pct(totals.success, totals.total),
      icon: CheckCircle2,
      color: "text-emerald-600",
    },
    {
      label: "Failure Rate",
      value: pct(totals.failed, totals.total),
      icon: XCircle,
      color: "text-rose-600",
    },
    {
      label: "Refund Rate",
      value: pct(totals.refunds, totals.total),
      icon: RotateCcw,
      color: "text-amber-600",
    },
    {
      label: "Chargeback Count",
      value: number(totals.chargebacks),
      icon: ShieldAlert,
      color: "text-orange-600",
    },
    {
      label: "ECP Return Count",
      value: number(totals.ecpReturns),
      icon: Wallet,
      color: "text-violet-600",
    },
    {
      label: "Tokenized Payments",
      value: pct(totals.tokenized, totals.total),
      icon: CheckCircle2,
      color: "text-cyan-600",
    },
    {
      label: "Non-Tokenized Payments",
      value: pct(nonTokenized, totals.total),
      icon: Activity,
      color: "text-slate-500",
    },
  ];

  const columns = [
    ["MID", (r) => r.mid],
    ["Total", (r) => number(r.total)],
    ["Success", (r) => number(r.success)],
    ["Success %", (r) => pct(r.success, r.total)],
    ["Failed", (r) => number(r.failed)],
    ["Failure %", (r) => pct(r.failed, r.total)],
    ["Refunds", (r) => number(r.refunds)],
    ["Refund %", (r) => pct(r.refunds, r.total)],
    ["Chargebacks", (r) => number(r.chargebacks)],
    ["ECP Returns", (r) => number(r.ecpReturns)],
    ["Tokenized %", (r) => pct(r.tokenized, r.total)],
    ["Non-Tokenized %", (r) => pct(r.total - r.tokenized, r.total)],
    ["Pre-Login %", (r) => pct(r.preLogin, r.total)],
    ["Post-Login %", (r) => pct(r.postLogin, r.total)],
    ["Region", (r) => r.region],
    ["Payment Method", (r) => r.paymentMethod],
    ["Channel", (r) => r.channel],
    ["Account Type", (r) => r.accountType],
  ];

  const matchingMids = sampleData.filter((row) =>
    row.mid.toLowerCase().includes(midSearch.toLowerCase())
  );

  const togglePendingMid = (mid, checked) => {
    setPendingMids((previous) =>
      checked
        ? previous.includes(mid)
          ? previous
          : [...previous, mid]
        : previous.filter((item) => item !== mid)
    );
  };

  const openMidFilter = () => {
    setPendingMids(selectedMids);
    setMidSearch("");
    setMidFilterOpen((previous) => !previous);
  };

  const applyMidFilter = () => {
    setSelectedMids(pendingMids);
    setMidFilterOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* HEADER */}
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur md:px-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            aria-label="Back to dashboard"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 md:text-xl">
              Transaction Health
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Payment Monitoring / Health Report
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
          <span className="h-2 w-2 rounded-full bg-blue-600" />
          {allMids ? "All MIDs" : `${selectedMids.length} selected`}
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] space-y-7 p-5 md:p-8">
        {/* FILTER TOOLBAR */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Transaction Health Overview
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Filter by MID to compare individual or combined performance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* PERIOD */}
              <label className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3">
                <CalendarDays size={16} className="text-slate-400" />
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  aria-label="Reporting period"
                  className="bg-transparent py-3 text-sm text-slate-700 outline-none"
                >
                  <option>Today</option>
                  <option>7 days</option>
                  <option>30 days</option>
                  <option>90 days</option>
                </select>
              </label>

              {/* MID SELECTOR */}
              <div className="relative">
                <button
                  onClick={openMidFilter}
                  aria-expanded={midFilterOpen}
                  className={`flex min-w-56 items-center justify-between gap-4 rounded-xl border px-4 py-3 text-sm transition ${
                    midFilterOpen
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Filter size={16} className="text-blue-600" />
                    {allMids
                      ? "All MIDs"
                      : `${selectedMids.length} MIDs selected`}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-slate-400 transition ${
                      midFilterOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {midFilterOpen && (
                  <>
                    <button
                      aria-label="Close MID selector"
                      className="fixed inset-0 z-20 cursor-default"
                      onClick={() => setMidFilterOpen(false)}
                    />

                    <div className="absolute right-0 top-full z-30 mt-2 w-80 max-w-[90vw] rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                      <div className="mb-3 flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-slate-900">
                            Select MIDs
                          </h3>
                          <p className="mt-1 text-xs text-slate-500">
                            Choose one or more
                          </p>
                        </div>
                        <button
                          onClick={() => setMidFilterOpen(false)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                          aria-label="Close"
                        >
                          <X size={17} />
                        </button>
                      </div>

                      {/* SEARCH INSIDE SELECTOR */}
                      <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3">
                        <Search size={16} className="text-slate-400" />
                        <input
                          type="text"
                          value={midSearch}
                          onChange={(e) => setMidSearch(e.target.value)}
                          placeholder="Search MID..."
                          className="min-w-0 flex-1 bg-transparent py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                        />
                        {midSearch && (
                          <button
                            onClick={() => setMidSearch("")}
                            aria-label="Clear search"
                          >
                            <X size={14} className="text-slate-400" />
                          </button>
                        )}
                      </div>

                      {/* SELECT ALL / CLEAR */}
                      <div className="flex items-center justify-between py-3 text-xs">
                        <span className="text-slate-500">
                          {pendingMids.length} selected
                        </span>
                        <button
                          onClick={() =>
                            setPendingMids(
                              pendingMids.length === sampleData.length
                                ? []
                                : sampleData.map((row) => row.mid)
                            )
                          }
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {pendingMids.length === sampleData.length
                            ? "Clear all"
                            : "Select all"}
                        </button>
                      </div>

                      {/* MID CHECKBOXES */}
                      <div className="max-h-56 space-y-1 overflow-y-auto">
                        {matchingMids.map((row) => (
                          <label
                            key={row.mid}
                            className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-3 transition hover:bg-blue-50"
                          >
                            <input
                              type="checkbox"
                              checked={pendingMids.includes(row.mid)}
                              onChange={(e) =>
                                togglePendingMid(row.mid, e.target.checked)
                              }
                              className="h-4 w-4 accent-blue-600"
                            />
                            <span className="flex-1 text-sm text-slate-700">
                              {row.mid}
                            </span>
                            <span className="text-xs text-slate-500">
                              {number(row.total)}
                            </span>
                          </label>
                        ))}

                        {matchingMids.length === 0 && (
                          <p className="py-6 text-center text-sm text-slate-500">
                            No matching MIDs found.
                          </p>
                        )}
                      </div>

                      {/* APPLY */}
                      <div className="mt-3 flex gap-2 border-t border-slate-200 pt-4">
                        <button
                          onClick={() => {
                            setPendingMids([]);
                            setSelectedMids([]);
                            setMidFilterOpen(false);
                          }}
                          className="rounded-lg border border-slate-200 px-3 py-2.5 text-xs text-slate-600 hover:bg-slate-50"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => setMidFilterOpen(false)}
                          className="flex-1 rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={applyMidFilter}
                          className="flex-1 rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* APPLIED MID CHIPS */}
          <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200 pt-4">
            <span className="mr-1 text-xs text-slate-500">
              Active filter:
            </span>

            {allMids ? (
              <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs text-blue-700">
                All MIDs
              </span>
            ) : (
              selectedMids.map((mid) => (
                <button
                  key={mid}
                  onClick={() =>
                    setSelectedMids((previous) =>
                      previous.filter((item) => item !== mid)
                    )
                  }
                  title={`Remove ${mid}`}
                  className="flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs text-blue-700 transition hover:bg-blue-100"
                >
                  {mid}
                  <X size={12} />
                </button>
              ))
            )}

            {!allMids && (
              <button
                onClick={() => setSelectedMids([])}
                className="ml-1 flex items-center gap-1 text-xs text-slate-500 hover:text-blue-700"
              >
                <RefreshCw size={12} />
                Reset filters
              </button>
            )}
          </div>
        </section>

        {/* KPI CARDS */}
        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                Overall transaction health
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {allMids
                  ? "Combined across all MIDs"
                  : `Combined across ${selectedMids.length} selected MID(s)`}
              </p>
            </div>
            <span className="text-xs text-slate-500">
              {filteredData.length} MID(s)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-200"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm text-slate-500">
                      {metric.label}
                    </p>
                    <Icon size={19} className={metric.color} />
                  </div>
                  <p className="mt-4 text-2xl font-semibold tracking-tight tabular-nums text-slate-900">
                    {metric.value}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* LOGIN AND EXCEPTIONS */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Login distribution
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Pre-login versus post-login transactions
            </p>

            <div className="mt-5 space-y-5">
              {[
                {
                  label: "Pre-Login",
                  value: totals.preLogin,
                  color: "bg-blue-600",
                },
                {
                  label: "Post-Login",
                  value: totals.postLogin,
                  color: "bg-violet-500",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between gap-3 text-sm">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="text-slate-500">
                      {number(item.value)} · {pct(item.value, totals.total)}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: `${
                          totals.total
                            ? Math.min(
                                100,
                                (item.value / totals.total) * 100
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h3 className="text-sm font-semibold text-slate-900">
              Transaction exceptions
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Refunds, chargebacks and ECP returns
            </p>

            <div className="mt-5 divide-y divide-slate-100">
              {[
                {
                  label: "Refunds",
                  value: totals.refunds,
                  color: "text-amber-600",
                },
                {
                  label: "Chargebacks",
                  value: totals.chargebacks,
                  color: "text-orange-600",
                },
                {
                  label: "ECP Returns",
                  value: totals.ecpReturns,
                  color: "text-violet-600",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3"
                >
                  <span className="text-sm text-slate-500">
                    {item.label}
                  </span>
                  <span className={`text-sm font-semibold ${item.color}`}>
                    {number(item.value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MID TABLE */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-base font-semibold text-slate-900">
                MID-wise transaction details
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Individual performance for the applied MIDs
              </p>
            </div>

            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
              <Search size={16} className="text-slate-400" />
              <input
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Search table..."
                className="w-full bg-transparent py-2.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 md:w-48"
              />
              {tableSearch && (
                <button
                  onClick={() => setTableSearch("")}
                  aria-label="Clear table search"
                >
                  <X size={14} className="text-slate-400" />
                </button>
              )}
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1500px] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-blue-50 text-xs text-slate-600">
                  {columns.map(([heading]) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap border-b border-slate-200 px-4 py-4 font-medium"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {tableData.length > 0 ? (
                  tableData.map((row) => (
                    <tr
                      key={row.mid}
                      className="transition-colors hover:bg-blue-50/50"
                    >
                      {columns.map(([heading, getValue]) => (
                        <td
                          key={heading}
                          className={`whitespace-nowrap px-4 py-4 ${
                            heading === "MID"
                              ? "font-medium text-blue-700"
                              : heading === "Success"
                                ? "text-emerald-700"
                                : heading === "Failed"
                                  ? "text-rose-600"
                                  : [
                                      "Region",
                                      "Payment Method",
                                      "Channel",
                                      "Account Type",
                                    ].includes(heading)
                                    ? "text-slate-500"
                                    : "text-slate-700"
                          }`}
                        >
                          {getValue(row)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-12 text-center text-slate-500"
                    >
                      No matching MIDs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-5 py-4 text-xs text-slate-500">
            <span>
              Showing {tableData.length} of {filteredData.length} MID(s)
            </span>
            <span>Scroll horizontally to view all columns</span>
          </div>
        </section>

        <p className="pb-2 text-center text-xs text-slate-400">
          Transaction Health Report · Payment Monitoring Platform
        </p>
      </main>
    </div>
  );
}