
"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  CalendarDays,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function FundingMonitoring() {
  const router = useRouter();

  const rawData = [
    { mid: "MID001", date: "2026-10-02", deposit: 10000, ecp: 500, chargeback: 200, previousDue: 300, actual: 9000 },
    { mid: "MID001", date: "2026-10-03", deposit: 5000, ecp: 200, chargeback: 100, previousDue: 200, actual: 4500 },
    { mid: "MID001", date: "2026-10-04", deposit: 7000, ecp: 300, chargeback: 200, previousDue: 100, actual: 6400 },
    { mid: "MID002", date: "2026-10-02", deposit: 8000, ecp: 300, chargeback: 100, previousDue: 200, actual: 7400 },
    { mid: "MID002", date: "2026-10-03", deposit: 6000, ecp: 200, chargeback: 100, previousDue: 100, actual: 5000 },
    { mid: "MID002", date: "2026-10-04", deposit: 4000, ecp: 100, chargeback: 100, previousDue: 0, actual: 4000 },
    { mid: "MID003", date: "2026-10-02", deposit: 12000, ecp: 1000, chargeback: 500, previousDue: 500, actual: 10000 },
    { mid: "MID003", date: "2026-10-03", deposit: 9000, ecp: 400, chargeback: 200, previousDue: 300, actual: 8100 },
  ];

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortDirection, setSortDirection] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState("2026-10");
  const [selectingEnd, setSelectingEnd] = useState(false);

  const money = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(amount);

  const dateLabel = startDate && endDate
    ? `${startDate} – ${endDate}`
    : startDate
    ? `${startDate} – Select end date`
    : endDate
    ? `Select start date – ${endDate}`
    : "Select date range";

  const displayedMonth = new Date(`${calendarMonth}-01T12:00:00`);
  const year = displayedMonth.getFullYear();
  const month = displayedMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const formatDate = (day) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const chooseDate = (date) => {
    if (!startDate || (startDate && endDate) || !selectingEnd) {
      setStartDate(date);
      setEndDate("");
      setSelectingEnd(true);
      return;
    }

    if (date < startDate) {
      setStartDate(date);
      setEndDate("");
      setSelectingEnd(true);
    } else {
      setEndDate(date);
      setSelectingEnd(false);
      setCalendarOpen(false);
    }
  };

  const changeMonth = (amount) => {
    const next = new Date(year, month + amount, 1);
    setCalendarMonth(
      `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`
    );
  };

  const processed = useMemo(() => {
    const grouped = {};

    rawData
      .filter((row) =>
        (!startDate || row.date >= startDate) &&
        (!endDate || row.date <= endDate)
      )
      .forEach((row) => {
        if (!grouped[row.mid]) {
          grouped[row.mid] = {
            mid: row.mid,
            deposit: 0,
            ecp: 0,
            chargeback: 0,
            previousDue: 0,
            actual: 0,
          };
        }

        const item = grouped[row.mid];
        item.deposit += row.deposit;
        item.ecp += row.ecp;
        item.chargeback += row.chargeback;
        item.previousDue += row.previousDue;
        item.actual += row.actual;
      });

    return Object.values(grouped).map((row) => {
      const expected = row.deposit - row.ecp - row.chargeback;
      const discrepancy = expected - row.previousDue - row.actual;

      return {
        ...row,
        expected,
        discrepancy,
        status: discrepancy === 0 ? "Successful" : "Mismatch",
      };
    });
  }, [startDate, endDate]);

  const filtered = useMemo(() => {
    const result = processed.filter((row) => {
      const matchesFilter = filter === "All" || row.status === filter;
      const matchesSearch = row.mid.toLowerCase().includes(search.toLowerCase().trim());
      return matchesFilter && matchesSearch;
    });

    if (sortDirection) {
      result.sort((a, b) =>
        sortDirection === "asc"
          ? a.discrepancy - b.discrepancy
          : b.discrepancy - a.discrepancy
      );
    }

    return result;
  }, [processed, filter, search, sortDirection]);

  const success = processed.filter((row) => row.status === "Successful").length;
  const mismatch = processed.filter((row) => row.status === "Mismatch").length;
  const totalGap = processed.reduce((sum, row) => sum + row.discrepancy, 0);

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-4 text-slate-800 md:px-7 md:py-5">
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Funding Monitoring
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Settlement Reconciliation Overview
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-blue-50"
          >
            <Home size={16} />
            Home
          </button>
        </div>

        {/* Summary cards */}
        <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Total MIDs</p>
            <p className="mt-1 text-2xl font-semibold">{processed.length}</p>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-xs text-emerald-700">Successful</p>
            <p className="mt-1 text-2xl font-semibold text-emerald-700">{success}</p>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-xs text-red-700">Mismatch</p>
            <p className="mt-1 text-2xl font-semibold text-red-700">{mismatch}</p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs text-amber-700">Net Discrepancy</p>
            <p className="mt-1 text-2xl font-semibold text-amber-700">{money(totalGap)}</p>
          </div>
        </div>

        {/* One date-range field */}
        <div className="relative mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CalendarDays size={18} className="text-blue-600" />
            Funding Date Range
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setCalendarOpen(!calendarOpen)}
              className="flex min-w-[245px] items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:border-blue-500"
            >
              <span className={startDate ? "text-slate-800" : "text-slate-500"}>
                {dateLabel}
              </span>
              <CalendarDays size={16} className="shrink-0 text-slate-500" />
            </button>

            {(startDate || endDate) && (
              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setSelectingEnd(false);
                }}
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
                title="Clear date range"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {calendarOpen && (
            <div className="absolute right-3 top-[calc(100%+6px)] z-20 w-[290px] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <button onClick={() => changeMonth(-1)} className="rounded p-1 hover:bg-slate-100">
                  <ChevronLeft size={18} />
                </button>

                <p className="text-sm font-semibold">
                  {displayedMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <button onClick={() => changeMonth(1)} className="rounded p-1 hover:bg-slate-100">
                  <ChevronRight size={18} />
                </button>
              </div>

              <p className="mb-3 text-xs text-slate-500">
                {!startDate || (startDate && endDate)
                  ? "Select start date"
                  : "Now select end date"}
              </p>

              <div className="grid grid-cols-7 gap-1 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="py-1 text-xs text-slate-400">{day}</div>
                ))}

                {calendarDays.map((day, index) =>
                  day ? (
                    <button
                      key={index}
                      onClick={() => chooseDate(formatDate(day))}
                      className={`rounded-md py-2 text-xs hover:bg-blue-100 ${
                        formatDate(day) === startDate || formatDate(day) === endDate
                          ? "bg-blue-600 font-semibold text-white hover:bg-blue-700"
                          : startDate && endDate && formatDate(day) > startDate && formatDate(day) < endDate
                          ? "bg-blue-50 text-blue-700"
                          : "text-slate-700"
                      }`}
                    >
                      {day}
                    </button>
                  ) : (
                    <div key={index} />
                  )
                )}
              </div>

              <button
                onClick={() => {
                  setStartDate("");
                  setEndDate("");
                  setSelectingEnd(false);
                }}
                className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-xs text-slate-600 hover:bg-slate-50"
              >
                Clear dates
              </button>
            </div>
          )}
        </div>

        {/* Search and filters */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Search MID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <div className="flex flex-wrap gap-2">
            {["All", "Successful", "Mismatch"].map((item) => (
              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`rounded-lg px-3 py-2 text-sm ${
                  filter === item
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white hover:bg-blue-50"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Compact table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[1050px] table-auto text-left text-xs">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="whitespace-nowrap px-3 py-3">MID</th>
                <th className="whitespace-nowrap px-3 py-3">Deposit</th>
                <th className="whitespace-nowrap px-3 py-3">ECP Return</th>
                <th className="whitespace-nowrap px-3 py-3">Chargeback</th>
                <th className="whitespace-nowrap px-3 py-3">Expected Funding</th>
                <th className="whitespace-nowrap px-3 py-3">Previous Due Balance</th>
                <th className="whitespace-nowrap px-3 py-3">Actual Funding</th>
                <th className="whitespace-nowrap px-3 py-3">
                  <button
                    onClick={() =>
                      setSortDirection((current) =>
                        current === "asc" ? "desc" : "asc"
                      )
                    }
                    className="flex items-center gap-1 font-semibold hover:text-blue-700"
                  >
                    Discrepancy
                    {sortDirection === "asc" ? (
                      <ArrowUp size={14} />
                    ) : sortDirection === "desc" ? (
                      <ArrowDown size={14} />
                    ) : (
                      <ArrowUpDown size={14} />
                    )}
                  </button>
                </th>
                <th className="whitespace-nowrap px-3 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((row) => (
                <tr key={row.mid} className="border-t border-slate-100 hover:bg-blue-50/40">
                  <td className="whitespace-nowrap px-3 py-3 font-semibold">{row.mid}</td>
                  <td className="whitespace-nowrap px-3 py-3">{money(row.deposit)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{money(row.ecp)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{money(row.chargeback)}</td>
                  <td className="whitespace-nowrap px-3 py-3 font-medium">{money(row.expected)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{money(row.previousDue)}</td>
                  <td className="whitespace-nowrap px-3 py-3">{money(row.actual)}</td>

                  <td className={`whitespace-nowrap px-3 py-3 font-semibold ${
                    row.discrepancy === 0
                      ? "text-emerald-600"
                      : row.discrepancy > 0
                      ? "text-red-600"
                      : "text-amber-600"
                  }`}>
                    {money(row.discrepancy)}
                  </td>

                  <td className="whitespace-nowrap px-3 py-3">
                    <span className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                      row.status === "Successful"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-sm text-slate-500">
                    No funding records found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
          <span>Showing {filtered.length} of {processed.length} MIDs</span>
          <span>
            {startDate && endDate
              ? `${startDate} to ${endDate}`
              : startDate
              ? `From ${startDate}`
              : endDate
              ? `Through ${endDate}`
              : "All dates"}
          </span>
        </div>
      </div>
    </main>
  );
}
