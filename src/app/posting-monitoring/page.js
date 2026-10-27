
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

export default function PostingMonitoring() {
  const router = useRouter();

  const rawData = [
    { mid: "MID001", date: "2026-10-02", payment: 120, deposit: 120 },
    { mid: "MID001", date: "2026-10-03", payment: 200, deposit: 200 },
    { mid: "MID002", date: "2026-10-02", payment: 200, deposit: 180 },
    { mid: "MID002", date: "2026-10-03", payment: 100, deposit: 100 },
    { mid: "MID003", date: "2026-10-02", payment: 150, deposit: 150 },
    { mid: "MID003", date: "2026-10-04", payment: 250, deposit: 230 },
  ];

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortDirection, setSortDirection] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState("2026-10");
  const [selectingEnd, setSelectingEnd] = useState(false);

  const dateLabel =
    startDate && endDate
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

  // Filter by date, then combine records belonging to the same MID.
  const processedData = useMemo(() => {
    const grouped = {};

    rawData
      .filter(
        (row) =>
          (!startDate || row.date >= startDate) &&
          (!endDate || row.date <= endDate)
      )
      .forEach((row) => {
        if (!grouped[row.mid]) {
          grouped[row.mid] = {
            mid: row.mid,
            payment: 0,
            deposit: 0,
          };
        }

        grouped[row.mid].payment += row.payment;
        grouped[row.mid].deposit += row.deposit;
      });

    return Object.values(grouped).map((row) => {
      const discrepancy = row.payment - row.deposit;

      return {
        ...row,
        discrepancy,
        status: discrepancy === 0 ? "Success" : "Failed",
      };
    });
  }, [startDate, endDate]);

  const filteredData = useMemo(() => {
    const result = processedData.filter((row) => {
      const matchesFilter =
        filter === "All" || row.status === filter;

      const matchesSearch = row.mid
        .toLowerCase()
        .includes(search.trim().toLowerCase());

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
  }, [processedData, filter, search, sortDirection]);

  const total = processedData.length;
  const success = processedData.filter(
    (row) => row.status === "Success"
  ).length;
  const failed = processedData.filter(
    (row) => row.status === "Failed"
  ).length;
  const totalDiscrepancy = processedData.reduce(
    (sum, row) => sum + row.discrepancy,
    0
  );

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-4 text-slate-800 md:px-7 md:py-5">
      <div className="mx-auto max-w-[1500px]">

        {/* HEADER */}
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
              Posting Monitoring
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Payment Posting Reconciliation
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm transition hover:bg-blue-50 hover:text-blue-700"
          >
            <Home size={16} />
            Home
          </button>
        </div>

        {/* SUMMARY CARDS */}
        <div className="mb-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <p className="text-xs text-slate-500">Total MIDs</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-900">
              {total}
            </h2>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
            <p className="text-xs text-emerald-700">Success</p>
            <h2 className="mt-1 text-2xl font-semibold text-emerald-700">
              {success}
            </h2>
          </div>

          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-xs text-red-700">Failed</p>
            <h2 className="mt-1 text-2xl font-semibold text-red-700">
              {failed}
            </h2>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs text-amber-700">Total Discrepancy</p>
            <h2 className="mt-1 text-2xl font-semibold text-amber-700">
              {totalDiscrepancy}
            </h2>
          </div>
        </div>

        {/* DATE RANGE */}
        <div className="relative mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium">
            <CalendarDays size={18} className="text-blue-600" />
            Date Range
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCalendarOpen(!calendarOpen)}
              className="flex min-w-[240px] items-center justify-between gap-3 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm hover:border-blue-500"
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
                title="Clear dates"
                className="rounded-lg border border-slate-200 p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {calendarOpen && (
            <div className="absolute right-3 top-[calc(100%+6px)] z-20 w-[290px] rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
              <div className="mb-3 flex items-center justify-between">
                <button
                  onClick={() => changeMonth(-1)}
                  className="rounded p-1 hover:bg-slate-100"
                >
                  <ChevronLeft size={18} />
                </button>

                <p className="text-sm font-semibold">
                  {displayedMonth.toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })}
                </p>

                <button
                  onClick={() => changeMonth(1)}
                  className="rounded p-1 hover:bg-slate-100"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              <p className="mb-3 text-xs text-slate-500">
                {!startDate || endDate
                  ? "Select start date"
                  : "Select end date"}
              </p>

              <div className="grid grid-cols-7 gap-1 text-center">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                  <div key={day} className="py-1 text-xs text-slate-400">
                    {day}
                  </div>
                ))}

                {calendarDays.map((day, index) =>
                  day ? (
                    <button
                      key={index}
                      onClick={() => chooseDate(formatDate(day))}
                      className={`rounded-md py-2 text-xs hover:bg-blue-100 ${
                        formatDate(day) === startDate ||
                        formatDate(day) === endDate
                          ? "bg-blue-600 font-semibold text-white hover:bg-blue-700"
                          : startDate &&
                            endDate &&
                            formatDate(day) > startDate &&
                            formatDate(day) < endDate
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

        {/* SEARCH + STATUS FILTERS */}
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Search MID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-xs rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          <div className="flex flex-wrap gap-2">
            {["All", "Success", "Failed"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-lg px-3 py-2 text-sm transition ${
                  filter === f
                    ? "bg-blue-600 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:bg-blue-50 hover:text-blue-700"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
          <table className="w-full min-w-[850px] text-left text-xs">
            <thead className="bg-slate-100 text-slate-600">
              <tr>
                <th className="whitespace-nowrap px-4 py-3">MID</th>
                <th className="whitespace-nowrap px-4 py-3">
                  Payment Report Count
                </th>
                <th className="whitespace-nowrap px-4 py-3">
                  Deposit Count
                </th>
                <th className="whitespace-nowrap px-4 py-3">
                  <button
                    onClick={() =>
                      setSortDirection((current) =>
                        current === "asc" ? "desc" : "asc"
                      )
                    }
                    className="flex items-center gap-1 font-semibold hover:text-blue-700"
                    title="Sort discrepancy ascending or descending"
                  >
                    Posting Discrepancy
                    {sortDirection === "asc" ? (
                      <ArrowUp size={14} />
                    ) : sortDirection === "desc" ? (
                      <ArrowDown size={14} />
                    ) : (
                      <ArrowUpDown size={14} />
                    )}
                  </button>
                </th>
                <th className="whitespace-nowrap px-4 py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((row) => (
                <tr
                  key={row.mid}
                  className="border-t border-slate-100 transition hover:bg-blue-50/50"
                >
                  <td className="whitespace-nowrap px-4 py-3 font-semibold">
                    {row.mid}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.payment}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    {row.deposit}
                  </td>

                  <td
                    className={`whitespace-nowrap px-4 py-3 font-semibold ${
                      row.discrepancy === 0
                        ? "text-emerald-600"
                        : "cursor-pointer text-red-600 underline"
                    }`}
                    onClick={() =>
                      row.discrepancy !== 0 &&
                      window.open("/discrepancy-details", "_blank")
                    }
                  >
                    {row.discrepancy}
                  </td>

                  <td className="whitespace-nowrap px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-1 text-[11px] font-medium ${
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

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-sm text-slate-500">
                    No posting records found for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3 flex flex-wrap justify-between gap-2 text-xs text-slate-500">
          <span>
            Showing {filteredData.length} of {processedData.length} MIDs
          </span>
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
