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
  Home,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";

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

const integer = (value) =>
  Number(value || 0).toLocaleString("en-US");

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

  const invoiceRows = useMemo(
    () => (selectedMID ? invoiceData[month]?.[selectedMID] || [] : []),
    [month, selectedMID]
  );

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

  // Export the selected invoice into a properly structured Excel workbook.
  const exportToExcel = () => {
    if (!selectedMID || invoiceRows.length === 0) return;

    const rows = [
      ["Monthly Invoice Report"],
      ["Month", monthOptions.find((m) => m.value === month)?.label || month],
      ["MID", selectedMID],
      [],
      [
        "Category",
        "Payment Type",
        "Account Type",
        "Fee per Transaction",
        "Rate",
        "# Transactions",
        "# Transaction Amount",
        "Invoice Amount",
      ],
    ];

    groupedRows.forEach(({ category, rows: categoryRows }) => {
      categoryRows.forEach((row) => {
        rows.push([
          category,
          row.cardType ||
            row.paymentType ||
            (category === "Cards"
              ? "Card"
              : category === "E-checks"
                ? "E-check"
                : category === "ACH Return Fees"
                  ? "ACH Return"
                  : "Digital Wallet"),
          row.accountType,
          row.fee,
          row.rate,
          row.transactions,
          row.amount,
          row.revenue,
        ]);
      });
    });

    rows.push([
      "TOTAL",
      "",
      "",
      "",
      "",
      totalTransactions,
      totalAmount,
      totalRevenue,
    ]);

    const worksheet = XLSX.utils.aoa_to_sheet(rows);

    worksheet["!cols"] = [
      { wch: 22 },
      { wch: 20 },
      { wch: 18 },
      { wch: 22 },
      { wch: 12 },
      { wch: 18 },
      { wch: 24 },
      { wch: 20 },
    ];

    // Format transaction amounts and invoice amounts as currency.
    for (let r = 5; r < rows.length; r++) {
      const amountCell = XLSX.utils.encode_cell({ r, c: 6 });
      const invoiceCell = XLSX.utils.encode_cell({ r, c: 7 });

      if (worksheet[amountCell] && typeof worksheet[amountCell].v === "number") {
        worksheet[amountCell].z = '"$"#,##0.00';
      }

      if (worksheet[invoiceCell] && typeof worksheet[invoiceCell].v === "number") {
        worksheet[invoiceCell].z = '"$"#,##0.00';
      }

      const feeCell = XLSX.utils.encode_cell({ r, c: 3 });
      if (worksheet[feeCell] && typeof worksheet[feeCell].v === "number") {
        worksheet[feeCell].z = '"$"#,##0.00';
      }
    }

    worksheet["!autofilter"] = {
      ref: `A5:H${rows.length - 1}`,
    };

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Monthly Invoice");

    XLSX.writeFile(
      workbook,
      `Invoice_${selectedMID}_${month}.xlsx`
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* TOP BAR — NO SIDEBAR */}
      <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 md:px-7">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
            <FileText size={19} />
          </div>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-slate-900 md:text-lg">
              Monthly Invoice Report
            </h1>
            <p className="hidden text-xs text-slate-500 sm:block">
              Monthly billing and invoice summary
            </p>
          </div>
        </div>

        <button
          onClick={() => router.push("/dashboard")}
          className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <Home size={16} />
          <span>Home</span>
        </button>
      </header>

      <main className="mx-auto max-w-[1500px] space-y-4 p-3 sm:p-5 lg:p-6">
        {/* FILTERS */}
        <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="mb-3">
            <h2 className="text-sm font-semibold text-slate-900">
              Invoice Filters
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Select a month and one MID to view its invoice.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            {/* MONTH */}
            <div>
              <label
                htmlFor="invoice-month"
                className="mb-1.5 block text-xs font-medium text-slate-600"
              >
                Invoice Month
              </label>

              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 focus-within:border-blue-400">
                <CalendarDays size={16} className="text-blue-600" />
                <select
                  id="invoice-month"
                  value={month}
                  onChange={(e) => handleMonthChange(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
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
                className="mb-1.5 block text-xs font-medium text-slate-600"
              >
                Search MID
              </label>

              <div
                className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 ${
                  midDropdownOpen
                    ? "border-blue-400 ring-2 ring-blue-50"
                    : "border-slate-200"
                }`}
              >
                <Search size={16} className="shrink-0 text-blue-600" />

                <input
                  id="invoice-mid-search"
                  value={midSearch}
                  onFocus={() => setMidDropdownOpen(true)}
                  onChange={(e) => {
                    setMidSearch(e.target.value);
                    setSelectedMID("");
                    setMidDropdownOpen(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setMidDropdownOpen(false);
                    if (e.key === "Enter" && matchingMIDs.length) {
                      handleMIDSelect(matchingMIDs[0]);
                    }
                  }}
                  placeholder="Search and select one MID..."
                  autoComplete="off"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />

                {midSearch && (
                  <button
                    onClick={clearMID}
                    aria-label="Clear MID"
                    className="text-slate-400 hover:text-slate-700"
                  >
                    <X size={15} />
                  </button>
                )}

                <button
                  onClick={() => setMidDropdownOpen((open) => !open)}
                  aria-label="Toggle MID list"
                  className="text-slate-400"
                >
                  <ChevronDown size={15} />
                </button>
              </div>

              {midDropdownOpen && (
                <>
                  <button
                    aria-label="Close MID dropdown"
                    onClick={() => setMidDropdownOpen(false)}
                    className="fixed inset-0 z-10 cursor-default"
                  />

                  <div className="absolute left-0 right-0 top-full z-20 mt-1 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
                    <p className="border-b border-slate-100 px-3 py-2 text-xs text-slate-500">
                      Available MIDs ({matchingMIDs.length})
                    </p>

                    <div className="max-h-48 overflow-y-auto p-1">
                      {matchingMIDs.length ? (
                        matchingMIDs.map((mid) => (
                          <button
                            key={mid}
                            onClick={() => handleMIDSelect(mid)}
                            className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                          >
                            {mid}
                            {selectedMID === mid && (
                              <span className="text-xs text-blue-600">
                                Selected
                              </span>
                            )}
                          </button>
                        ))
                      ) : (
                        <p className="px-3 py-4 text-center text-xs text-slate-500">
                          No matching MIDs found.
                        </p>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* NO MID SELECTED */}
        {!selectedMID && (
          <motion.section
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center"
          >
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
              <Receipt size={23} />
            </div>
            <h2 className="text-sm font-semibold text-slate-800">
              No MID selected
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Select a MID above to display the monthly invoice.
            </p>
          </motion.section>
        )}

        {/* SELECTED INVOICE */}
        {selectedMID && (
          <motion.section
            key={`${month}-${selectedMID}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {/* SUMMARY */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                <p className="text-xs text-slate-500">Selected MID</p>
                <p className="mt-1.5 text-base font-semibold text-slate-900">
                  {selectedMID}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                <p className="text-xs text-slate-500">Total Transactions</p>
                <p className="mt-1.5 text-base font-semibold text-slate-900">
                  {integer(totalTransactions)}
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-3.5">
                <p className="text-xs text-slate-500">Invoice Amount</p>
                <p className="mt-1.5 text-base font-bold text-emerald-700">
                  {currency(totalRevenue)}
                </p>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">
                    Monthly Invoice
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {monthOptions.find((option) => option.value === month)?.label}
                    {" · "}
                    {selectedMID}
                  </p>
                </div>

                <button
                  onClick={exportToExcel}
                  disabled={!invoiceRows.length}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Download size={15} />
                  Export to Excel
                </button>
              </div>

              {invoiceRows.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[760px] table-fixed border-collapse text-center text-xs">
                    <colgroup>
                      <col className="w-[16%]" />
                      <col className="w-[14%]" />
                      <col className="w-[13%]" />
                      <col className="w-[10%]" />
                      <col className="w-[13%]" />
                      <col className="w-[17%]" />
                      <col className="w-[17%]" />
                    </colgroup>

                    <thead>
                      <tr className="bg-[#365984] text-white">
                        {[
                          "Category",
                          "Account Type",
                          "Fee per Transaction",
                          "Rate",
                          "# Transactions",
                          "# Transaction Amount",
                          "Invoice Amount",
                        ].map((heading) => (
                          <th
                            key={heading}
                            className={`border border-slate-300 px-2 py-2.5 text-center text-[11px] font-semibold ${
                              heading === "Invoice Amount" ? "font-extrabold" : ""
                            }`}
                          >
                            {heading}
                          </th>
                        ))}
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
                              className="border border-slate-300 px-2 py-1.5 text-center text-[11px] font-bold text-slate-700"
                            >
                              {group.category}
                            </td>
                          </tr>

                          {group.rows.map((row, index) => (
                            <tr
                              key={`${group.category}-${row.paymentType || row.cardType || row.accountType}-${index}`}
                              className="transition-colors hover:bg-blue-50/50"
                            >
                              <td className="border border-slate-200 px-2 py-2 text-center">
                                {row.cardType ||
                                  row.paymentType ||
                                  (group.category === "Cards"
                                    ? "Card"
                                    : group.category === "E-checks"
                                      ? "E-check"
                                      : group.category === "ACH Return Fees"
                                        ? "ACH Return"
                                        : "Digital Wallet")}
                              </td>

                              <td className="border border-slate-200 px-2 py-2 text-center">
                                {row.accountType}
                              </td>

                              <td className="border border-slate-200 px-2 py-2 text-center whitespace-nowrap">
                                {currency(row.fee)}
                              </td>

                              <td className="border border-slate-200 px-2 py-2 text-center whitespace-nowrap">
                                {row.rate}
                              </td>

                              <td className="border border-slate-200 px-2 py-2 text-center tabular-nums">
                                {integer(row.transactions)}
                              </td>

                              <td className="border border-slate-200 px-2 py-2 text-center tabular-nums whitespace-nowrap">
                                {currency(row.amount)}
                              </td>

                              <td className="border border-slate-200 px-2 py-2 text-center font-bold tabular-nums whitespace-nowrap">
                                {currency(row.revenue)}
                              </td>
                            </tr>
                          ))}
                        </>
                      ))}

                      <tr className="bg-[#365984] font-bold text-white">
                        <td
                          colSpan={4}
                          className="border border-slate-300 px-2 py-2.5 text-center"
                        >
                          TOTAL
                        </td>
                        <td className="border border-slate-300 px-2 py-2.5 text-center tabular-nums">
                          {integer(totalTransactions)}
                        </td>
                        <td className="border border-slate-300 px-2 py-2.5 text-center tabular-nums">
                          {currency(totalAmount)}
                        </td>
                        <td className="border border-slate-300 px-2 py-2.5 text-center font-extrabold tabular-nums whitespace-nowrap">
                          {currency(totalRevenue)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="px-5 py-10 text-center text-sm text-slate-500">
                  No invoice data available for this MID and month.
                </div>
              )}

              <div className="flex items-center justify-between gap-2 border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-[11px] text-slate-500">
                <span>{selectedMID}</span>
                <span>
                  {monthOptions.find((option) => option.value === month)?.label}
                </span>
              </div>
            </div>
          </motion.section>
        )}
      </main>
    </div>
  );
}
