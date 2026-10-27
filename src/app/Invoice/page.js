"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CalendarDays,
  Search,
  ChevronDown,
  X,
  FileText,
  Receipt,
  DollarSign,
} from "lucide-react";
import { useRouter } from "next/navigation";

const invoiceData = {
  "2026-10": {
    "MID-1001": [
      {
        category: "Cards",
        accountType: "Residential",
        fee: 0.15,
        rate: "1.99%",
        transactions: 1500,
        amount: 100000,
        revenue: 2215,
      },
      {
        category: "Cards",
        accountType: "Commercial",
        fee: 0.15,
        rate: "1.99%",
        transactions: 0,
        amount: 0,
        revenue: 0,
      },
      {
        category: "Cards",
        accountType: "Residential",
        fee: 0.15,
        rate: "1.99%",
        transactions: 200,
        amount: 3000,
        revenue: 89.7,
        cardType: "Amex",
      },
      {
        category: "Cards",
        accountType: "Commercial",
        fee: 0.15,
        rate: "1.99%",
        transactions: 0,
        amount: 0,
        revenue: 0,
        cardType: "Amex",
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 150,
        amount: 20000,
        revenue: 420.5,
        paymentType: "ApplePay",
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 120,
        amount: 30000,
        revenue: 615,
        paymentType: "Venmo",
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 130,
        amount: 23300,
        revenue: 483.17,
        paymentType: "PayPal",
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 110,
        amount: 21000,
        revenue: 434.4,
        paymentType: "Googlepay",
      },
      {
        category: "E-checks",
        accountType: "Residential",
        fee: 0.75,
        rate: "0.75",
        transactions: 150,
        amount: 0,
        revenue: 112.5,
      },
      {
        category: "E-checks",
        accountType: "Commercial",
        fee: 0.75,
        rate: "0.75",
        transactions: 50,
        amount: 0,
        revenue: 37.5,
      },
      {
        category: "ACH Return Fees",
        accountType: "—",
        fee: 5,
        rate: "5",
        transactions: 12,
        amount: 0,
        revenue: 60,
      },
    ],

    "MID-1002": [
      {
        category: "Cards",
        accountType: "Residential",
        fee: 0.15,
        rate: "1.99%",
        transactions: 820,
        amount: 55000,
        revenue: 1224.5,
      },
      {
        category: "Cards",
        accountType: "Commercial",
        fee: 0.15,
        rate: "1.99%",
        transactions: 410,
        amount: 25000,
        revenue: 497.5,
      },
      {
        category: "Cards",
        accountType: "Residential",
        fee: 0.15,
        rate: "1.99%",
        transactions: 75,
        amount: 5000,
        revenue: 99.5,
        cardType: "Amex",
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 90,
        amount: 12000,
        revenue: 240,
        paymentType: "ApplePay",
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 65,
        amount: 9500,
        revenue: 189.05,
        paymentType: "Venmo",
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 80,
        amount: 11000,
        revenue: 219.9,
        paymentType: "PayPal",
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 60,
        amount: 8000,
        revenue: 159.2,
        paymentType: "Googlepay",
      },
      {
        category: "E-checks",
        accountType: "Residential",
        fee: 0.75,
        rate: "0.75",
        transactions: 90,
        amount: 0,
        revenue: 67.5,
      },
      {
        category: "E-checks",
        accountType: "Commercial",
        fee: 0.75,
        rate: "0.75",
        transactions: 35,
        amount: 0,
        revenue: 26.25,
      },
      {
        category: "ACH Return Fees",
        accountType: "—",
        fee: 5,
        rate: "5",
        transactions: 8,
        amount: 0,
        revenue: 40,
      },
    ],
  },

  "2026-09": {
    "MID-1001": [
      {
        category: "Cards",
        accountType: "Residential",
        fee: 0.15,
        rate: "1.99%",
        transactions: 1320,
        amount: 85000,
        revenue: 1691.5,
      },
      {
        category: "Cards",
        accountType: "Commercial",
        fee: 0.15,
        rate: "1.99%",
        transactions: 260,
        amount: 18000,
        revenue: 358.2,
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 140,
        amount: 18000,
        revenue: 358.2,
        paymentType: "ApplePay",
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 100,
        amount: 14000,
        revenue: 278.6,
        paymentType: "Venmo",
      },
      {
        category: "E-checks",
        accountType: "Residential",
        fee: 0.75,
        rate: "0.75",
        transactions: 100,
        amount: 0,
        revenue: 75,
      },
      {
        category: "E-checks",
        accountType: "Commercial",
        fee: 0.75,
        rate: "0.75",
        transactions: 30,
        amount: 0,
        revenue: 22.5,
      },
      {
        category: "ACH Return Fees",
        accountType: "—",
        fee: 5,
        rate: "5",
        transactions: 10,
        amount: 0,
        revenue: 50,
      },
    ],

    "MID-1003": [
      {
        category: "Cards",
        accountType: "Residential",
        fee: 0.15,
        rate: "1.99%",
        transactions: 950,
        amount: 62000,
        revenue: 1233.8,
      },
      {
        category: "Cards",
        accountType: "Commercial",
        fee: 0.15,
        rate: "1.99%",
        transactions: 220,
        amount: 16000,
        revenue: 318.4,
      },
      {
        category: "Wallets/Digital",
        accountType: "—",
        fee: 0.15,
        rate: "1.99%",
        transactions: 100,
        amount: 14000,
        revenue: 278.6,
        paymentType: "PayPal",
      },
      {
        category: "E-checks",
        accountType: "Residential",
        fee: 0.75,
        rate: "0.75",
        transactions: 80,
        amount: 0,
        revenue: 60,
      },
      {
        category: "ACH Return Fees",
        accountType: "—",
        fee: 5,
        rate: "5",
        transactions: 6,
        amount: 0,
        revenue: 30,
      },
    ],
  },
};

const categoryOrder = [
  "Cards",
  "Wallets/Digital",
  "E-checks",
  "ACH Return Fees",
];

const monthOptions = [
  { value: "2026-10", label: "October 2026" },
  { value: "2026-09", label: "September 2026" },
];

const currency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);

const integer = (value) => Number(value || 0).toLocaleString("en-US");

export default function MonthlyInvoiceReport() {
  const router = useRouter();

  const [month, setMonth] = useState("2026-10");
  const [selectedMID, setSelectedMID] = useState("");
  const [midSearch, setMidSearch] = useState("");
  const [midDropdownOpen, setMidDropdownOpen] = useState(false);

  const availableMIDs = useMemo(
    () => Object.keys(invoiceData[month] || {}),
    [month]
  );

  const matchingMIDs = availableMIDs.filter((mid) =>
    mid.toLowerCase().includes(midSearch.toLowerCase())
  );

  const invoiceRows = useMemo(() => {
    if (!selectedMID) return [];

    return invoiceData[month]?.[selectedMID] || [];
  }, [month, selectedMID]);

  const totalRevenue = invoiceRows.reduce(
    (sum, row) => sum + row.revenue,
    0
  );

  const totalTransactions = invoiceRows.reduce(
    (sum, row) => sum + row.transactions,
    0
  );

  const totalAmount = invoiceRows.reduce(
    (sum, row) => sum + row.amount,
    0
  );

  const groupedRows = categoryOrder
    .map((category) => ({
      category,
      rows: invoiceRows.filter((row) => row.category === category),
    }))
    .filter((group) => group.rows.length > 0);

  const handleMonthChange = (value) => {
    setMonth(value);
    setSelectedMID("");
    setMidSearch("");
    setMidDropdownOpen(false);
  };

  const handleMIDSelect = (mid) => {
    setSelectedMID(mid);
    setMidSearch(mid);
    setMidDropdownOpen(false);
  };

  const clearMID = () => {
    setSelectedMID("");
    setMidSearch("");
    setMidDropdownOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-800">
      {/* SIDEBAR */}
      <aside className="hidden w-56 shrink-0 border-r border-slate-200 bg-white px-5 py-6 md:block">
        <img
          src="/llogo.png"
          alt="Logo"
          className="mb-10 h-10 w-auto"
        />

        <button
          onClick={() => router.push("/dashboard")}
          className="flex w-full items-center gap-3 rounded-lg p-3 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-blue-700"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="min-w-0 flex-1">
        {/* TOP BAR */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              aria-label="Back to dashboard"
              className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-700 md:hidden"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="text-lg font-semibold text-slate-900 md:text-xl">
                Monthly Invoice Report
              </h1>
              <p className="mt-1 text-xs text-slate-500">
                Monthly revenue and transaction fee breakdown
              </p>
            </div>
          </div>

          <span className="hidden text-sm text-slate-500 sm:block">
            Welcome, Somil
          </span>
        </header>

        <div className="space-y-5 p-4 md:p-8">
          {/* FILTERS */}
          <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
            <div className="mb-4">
              <h2 className="text-sm font-semibold text-slate-900">
                Invoice Filters
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Choose a month, then search and select one MID to view its invoice.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* MONTH FILTER */}
              <div>
                <label
                  htmlFor="invoice-month"
                  className="mb-2 block text-xs font-medium text-slate-600"
                >
                  Invoice Month
                </label>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-3 transition focus-within:border-blue-400">
                  <CalendarDays size={17} className="text-blue-600" />

                  <select
                    id="invoice-month"
                    value={month}
                    onChange={(e) => handleMonthChange(e.target.value)}
                    className="w-full bg-transparent text-sm text-slate-800 outline-none"
                  >
                    {monthOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* MID SEARCH */}
              <div className="relative">
                <label
                  htmlFor="invoice-mid-search"
                  className="mb-2 block text-xs font-medium text-slate-600"
                >
                  Search MID
                </label>

                <div
                  className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition ${
                    midDropdownOpen
                      ? "border-blue-400 ring-2 ring-blue-50"
                      : "border-slate-200"
                  }`}
                >
                  <Search size={17} className="shrink-0 text-blue-600" />

                  <input
                    id="invoice-mid-search"
                    value={midSearch}
                    onFocus={() => {
                      setMidSearch(selectedMID ? "" : midSearch);
                      setMidDropdownOpen(true);
                    }}
                    onChange={(e) => {
                      setMidSearch(e.target.value);
                      setSelectedMID("");
                      setMidDropdownOpen(true);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") {
                        setMidDropdownOpen(false);
                      }

                      if (e.key === "Enter" && matchingMIDs.length > 0) {
                        handleMIDSelect(matchingMIDs[0]);
                      }
                    }}
                    placeholder="Search by MID..."
                    autoComplete="off"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />

                  {selectedMID && (
                    <button
                      onClick={clearMID}
                      aria-label="Clear selected MID"
                      className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                      <X size={15} />
                    </button>
                  )}

                  <button
                    onClick={() => setMidDropdownOpen((open) => !open)}
                    aria-label="Toggle MID list"
                    className="text-slate-400"
                  >
                    <ChevronDown size={16} />
                  </button>
                </div>

                {midDropdownOpen && (
                  <>
                    <button
                      aria-label="Close MID search"
                      onClick={() => setMidDropdownOpen(false)}
                      className="fixed inset-0 z-10 cursor-default"
                    />

                    <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">
                      <div className="border-b border-slate-100 px-3 py-2">
                        <p className="text-xs text-slate-500">
                          {matchingMIDs.length} MID(s) available
                        </p>
                      </div>

                      <div className="max-h-56 overflow-y-auto p-1">
                        {matchingMIDs.length > 0 ? (
                          matchingMIDs.map((mid) => (
                            <button
                              key={mid}
                              onClick={() => handleMIDSelect(mid)}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition hover:bg-blue-50 ${
                                selectedMID === mid
                                  ? "bg-blue-50 font-medium text-blue-700"
                                  : "text-slate-700"
                              }`}
                            >
                              <span>{mid}</span>

                              {selectedMID === mid && (
                                <span className="text-xs text-blue-600">
                                  Selected
                                </span>
                              )}
                            </button>
                          ))
                        ) : (
                          <p className="px-3 py-5 text-center text-sm text-slate-500">
                            No matching MIDs found.
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {selectedMID && (
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-4">
                <span className="text-xs text-slate-500">
                  Current selection:
                </span>
                <span className="rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700">
                  {selectedMID}
                </span>
                <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-600">
                  {monthOptions.find((option) => option.value === month)?.label}
                </span>
              </div>
            )}
          </section>

          {/* EMPTY STATE */}
          {!selectedMID && (
            <motion.section
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                <FileText size={27} />
              </div>

              <h2 className="text-base font-semibold text-slate-900">
                Select a MID to view the invoice
              </h2>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Select the invoice month above, then search for a MID. The
                invoice breakdown and total revenue will appear here.
              </p>
            </motion.section>
          )}

          {/* INVOICE SUMMARY AND TABLE */}
          {selectedMID && (
            <motion.section
              key={`${month}-${selectedMID}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              {/* SUMMARY CARDS */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Receipt size={15} className="text-blue-600" />
                    Selected MID
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {selectedMID}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <FileText size={15} className="text-violet-600" />
                    Total Transactions
                  </div>
                  <p className="mt-2 text-lg font-semibold text-slate-900">
                    {integer(totalTransactions)}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <DollarSign size={15} className="text-emerald-600" />
                    Total Revenue
                  </div>
                  <p className="mt-2 text-lg font-semibold text-emerald-700">
                    {currency(totalRevenue)}
                  </p>
                </div>
              </div>

              {/* INVOICE TABLE */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="flex flex-col gap-2 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-5">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Monthly Invoice
                    </h2>
                    <p className="mt-1 text-xs text-slate-500">
                      {monthOptions.find((option) => option.value === month)?.label}
                      {" · "}
                      {selectedMID}
                    </p>
                  </div>

                  <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
                    Invoice Data
                  </span>
                </div>

                {invoiceRows.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[850px] border-collapse text-sm">
                      <thead>
                        <tr className="bg-[#365984] text-white">
                          <th className="w-[165px] border border-slate-300 px-3 py-3 text-left text-xs font-semibold">
                            Category
                          </th>
                          <th className="border border-slate-300 px-3 py-3 text-left text-xs font-semibold">
                            Account Type
                          </th>
                          <th className="border border-slate-300 px-3 py-3 text-right text-xs font-semibold">
                            Fee per Transaction
                          </th>
                          <th className="border border-slate-300 px-3 py-3 text-right text-xs font-semibold">
                            Rate
                          </th>
                          <th className="border border-slate-300 px-3 py-3 text-right text-xs font-semibold">
                            # Transactions
                          </th>
                          <th className="border border-slate-300 px-3 py-3 text-right text-xs font-semibold">
                            # Transaction Amount
                          </th>
                          <th className="border border-slate-300 px-3 py-3 text-right text-xs font-semibold">
                            Revenue
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {groupedRows.map((group) => (
                          <>
                            <tr
                              key={`${group.category}-heading`}
                              className="bg-slate-100"
                            >
                              <td
                                colSpan={7}
                                className="border-x border-b border-slate-300 px-3 py-2 text-xs font-semibold text-slate-800"
                              >
                                {group.category}
                              </td>
                            </tr>

                            {group.rows.map((row, index) => (
                              <tr
                                key={`${group.category}-${row.paymentType || row.cardType || row.accountType}-${index}`}
                                className="transition-colors hover:bg-blue-50/40"
                              >
                                <td className="border border-slate-200 px-3 py-3 text-xs text-slate-600">
                                  {row.cardType ||
                                    row.paymentType ||
                                    (group.category === "Cards"
                                      ? "Card"
                                      : group.category === "Wallets/Digital"
                                        ? "Digital Wallet"
                                        : group.category === "E-checks"
                                          ? "E-check"
                                          : "ACH Return")}
                                </td>

                                <td className="border border-slate-200 px-3 py-3 text-xs text-slate-700">
                                  {row.accountType}
                                </td>

                                <td className="whitespace-nowrap border border-slate-200 px-3 py-3 text-right text-xs text-slate-700">
                                  {currency(row.fee)}
                                </td>

                                <td className="whitespace-nowrap border border-slate-200 px-3 py-3 text-right text-xs text-slate-700">
                                  {row.rate}
                                </td>

                                <td className="whitespace-nowrap border border-slate-200 px-3 py-3 text-right text-xs tabular-nums text-slate-700">
                                  {integer(row.transactions)}
                                </td>

                                <td className="whitespace-nowrap border border-slate-200 px-3 py-3 text-right text-xs tabular-nums text-slate-700">
                                  {currency(row.amount)}
                                </td>

                                <td className="whitespace-nowrap border border-slate-200 px-3 py-3 text-right text-xs font-medium tabular-nums text-slate-800">
                                  {currency(row.revenue)}
                                </td>
                              </tr>
                            ))}
                          </>
                        ))}

                        <tr className="bg-[#365984] font-semibold text-white">
                          <td
                            colSpan={4}
                            className="border border-slate-300 px-3 py-3 text-sm"
                          >
                            TOTAL
                          </td>
                          <td className="border border-slate-300 px-3 py-3 text-right text-xs tabular-nums">
                            {integer(totalTransactions)}
                          </td>
                          <td className="border border-slate-300 px-3 py-3 text-right text-xs tabular-nums">
                            {currency(totalAmount)}
                          </td>
                          <td className="border border-slate-300 px-3 py-3 text-right text-sm tabular-nums">
                            {currency(totalRevenue)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="px-6 py-12 text-center">
                    <FileText
                      size={28}
                      className="mx-auto mb-3 text-slate-300"
                    />
                    <p className="text-sm font-medium text-slate-700">
                      No invoice data available
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      There are no invoice records for this MID and month.
                    </p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-500 md:px-5">
                  <span>Monthly Invoice Report</span>
                  <span>
                    {monthOptions.find((option) => option.value === month)?.label}
                  </span>
                </div>
              </div>
            </motion.section>
          )}
        </div>
      </main>
    </div>
  );
}