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
  ChevronUp,
  X,
  Filter,
  RefreshCw,
  Smartphone,
  Globe,
  CreditCard,
  MapPinned,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";

const CHANNELS = ["iOS", "Android", "Web"];

const PAYMENT_METHODS = [
  "Bank",
  "Card",
  "PayPal",
  "Venmo",
  "Apple Pay",
  "GPay",
];

// Grouped, illustrative decline categories inspired by common Braintree
// processor response texts/codes. Replace with actual gateway response data
// (e.g. processorResponseCode / processorResponseText) in production.
const DECLINE_REASONS = [
  { key: "doNotHonor", label: "Do Not Honor", color: "bg-rose-500" },
  { key: "insufficientFunds", label: "Insufficient Funds", color: "bg-amber-500" },
  { key: "expiredCard", label: "Expired Card", color: "bg-violet-500" },
  { key: "verificationFailed", label: "CVV / Verification Failed", color: "bg-blue-500" },
];

const REGIONS = ["North America", "Europe", "Asia Pacific"];

// Illustrative data. Replace with your API response when integrating.
const sampleData = [
  {
    mid: "MID-1001",
    date: "2026-10-02",
    total: 12500,
    success: 11900,
    declined: 600,
    declineReasons: { doNotHonor: 200, insufficientFunds: 180, expiredCard: 120, verificationFailed: 100 },
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
    date: "2026-10-03",
    total: 9800,
    success: 9212,
    declined: 588,
    declineReasons: { doNotHonor: 180, insufficientFunds: 190, expiredCard: 100, verificationFailed: 118 },
    refunds: 145,
    chargebacks: 7,
    ecpReturns: 11,
    tokenized: 5900,
    preLogin: 6100,
    postLogin: 3700,
    region: "North America",
    paymentMethod: "Bank",
    channel: "iOS",
    accountType: "Commercial",
  },
  {
    mid: "MID-1003",
    date: "2026-10-04",
    total: 7600,
    success: 7144,
    declined: 456,
    declineReasons: { doNotHonor: 140, insufficientFunds: 150, expiredCard: 80, verificationFailed: 86 },
    refunds: 96,
    chargebacks: 4,
    ecpReturns: 5,
    tokenized: 4200,
    preLogin: 4800,
    postLogin: 2800,
    region: "Europe",
    paymentMethod: "Apple Pay",
    channel: "iOS",
    accountType: "Residential",
  },
  {
    mid: "MID-1004",
    date: "2026-10-05",
    total: 6400,
    success: 6080,
    declined: 320,
    declineReasons: { doNotHonor: 90, insufficientFunds: 110, expiredCard: 50, verificationFailed: 70 },
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
  {
    mid: "MID-1005",
    date: "2026-10-06",
    total: 8700,
    success: 8178,
    declined: 522,
    declineReasons: { doNotHonor: 160, insufficientFunds: 170, expiredCard: 90, verificationFailed: 102 },
    refunds: 120,
    chargebacks: 6,
    ecpReturns: 7,
    tokenized: 5700,
    preLogin: 5200,
    postLogin: 3500,
    region: "Asia Pacific",
    paymentMethod: "Venmo",
    channel: "Android",
    accountType: "Residential",
  },
  {
    mid: "MID-1006",
    date: "2026-10-07",
    total: 9200,
    success: 8650,
    declined: 550,
    declineReasons: { doNotHonor: 170, insufficientFunds: 180, expiredCard: 80, verificationFailed: 120 },
    refunds: 135,
    chargebacks: 5,
    ecpReturns: 9,
    tokenized: 6200,
    preLogin: 5700,
    postLogin: 3500,
    region: "Asia Pacific",
    paymentMethod: "GPay",
    channel: "Android",
    accountType: "Commercial",
  },
];

const number = (value) =>
  Number(value || 0).toLocaleString("en-US");

const pct = (value, total) =>
  total ? `${((value / total) * 100).toFixed(1)}%` : "—";

const ratio = (value, total) =>
  total ? (value / total) * 100 : 0;

const formatDate = (date) => {
  if (!date) return "";
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const CHANNEL_STYLES = {
  iOS: {
    color: "bg-blue-500",
    light: "bg-blue-50",
    text: "text-blue-700",
    icon: Smartphone,
  },
  Android: {
    color: "bg-emerald-500",
    light: "bg-emerald-50",
    text: "text-emerald-700",
    icon: Smartphone,
  },
  Web: {
    color: "bg-violet-500",
    light: "bg-violet-50",
    text: "text-violet-700",
    icon: Globe,
  },
};

const PAYMENT_STYLES = {
  Bank: "bg-amber-50 text-amber-700",
  Card: "bg-blue-50 text-blue-700",
  PayPal: "bg-indigo-50 text-indigo-700",
  Venmo: "bg-sky-50 text-sky-700",
  "Apple Pay": "bg-slate-100 text-slate-700",
  GPay: "bg-emerald-50 text-emerald-700",
};

export default function TransactionHealthReport() {
  const router = useRouter();

  const [selectedMids, setSelectedMids] = useState([]);
  const [pendingMids, setPendingMids] = useState([]);
  const [midSearch, setMidSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [midFilterOpen, setMidFilterOpen] = useState(false);

  // Regional explorer filters are independent of the main date/MID filters.
  const [regionFilter, setRegionFilter] = useState("All regions");
  const [channelFilter, setChannelFilter] = useState("All channels");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("All methods");

  const [startDate, setStartDate] = useState("2026-10-02");
  const [endDate, setEndDate] = useState("2026-10-07");

  const [sortConfig, setSortConfig] = useState({
    key: "total",
    direction: "desc",
  });

  const allMids = selectedMids.length === 0;

  // Date and MID filters affect the dashboard metrics and charts.
  const filteredData = useMemo(() => {
    return sampleData.filter((row) => {
      const matchesMID =
        selectedMids.length === 0 || selectedMids.includes(row.mid);

      const matchesStart = !startDate || row.date >= startDate;
      const matchesEnd = !endDate || row.date <= endDate;

      return matchesMID && matchesStart && matchesEnd;
    });
  }, [selectedMids, startDate, endDate]);

  // Search filters only the table, not the overall KPIs.
  const tableData = useMemo(() => {
    const query = tableSearch.trim().toLowerCase();

    return filteredData.filter((row) =>
      [
        row.mid,
        row.date,
        row.region,
        row.paymentMethod,
        row.channel,
        row.accountType,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query)
    );
  }, [filteredData, tableSearch]);

  const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, row) => {
        acc.total += row.total;
        acc.success += row.success;
        acc.declined += row.declined;
        acc.refunds += row.refunds;
        acc.chargebacks += row.chargebacks;
        acc.ecpReturns += row.ecpReturns;
        acc.tokenized += row.tokenized;
        acc.preLogin += row.preLogin;
        acc.postLogin += row.postLogin;

        return acc;
      },
      {
        total: 0,
        success: 0,
        declined: 0,
        refunds: 0,
        chargebacks: 0,
        ecpReturns: 0,
        tokenized: 0,
        preLogin: 0,
        postLogin: 0,
      }
    );
  }, [filteredData]);

  const nonTokenized = Math.max(0, totals.total - totals.tokenized);

  // Aggregate payment-method distribution.
  const paymentDistribution = useMemo(() => {
    const result = Object.fromEntries(
      PAYMENT_METHODS.map((method) => [method, 0])
    );

    filteredData.forEach((row) => {
      if (result[row.paymentMethod] !== undefined) {
        result[row.paymentMethod] += row.total;
      }
    });

    return result;
  }, [filteredData]);

  // Aggregate channel distribution, including Android.
  const channelDistribution = useMemo(() => {
    const result = Object.fromEntries(
      CHANNELS.map((channel) => [channel, 0])
    );

    filteredData.forEach((row) => {
      if (result[row.channel] !== undefined) {
        result[row.channel] += row.total;
      }
    });

    return result;
  }, [filteredData]);

  // Decline reason distribution uses only the currently selected date/MID data.
  const declineReasonDistribution = useMemo(() => {
    const result = Object.fromEntries(
      DECLINE_REASONS.map((reason) => [reason.key, 0])
    );

    filteredData.forEach((row) => {
      DECLINE_REASONS.forEach((reason) => {
        result[reason.key] += row.declineReasons?.[reason.key] || 0;
      });
    });

    return result;
  }, [filteredData]);

  // Regional explorer combines the main date/MID selection with its own
  // region, channel and payment-method filters.
  const regionalData = useMemo(() => {
    return filteredData.filter((row) =>
      (regionFilter === "All regions" || row.region === regionFilter) &&
      (channelFilter === "All channels" || row.channel === channelFilter) &&
      (paymentMethodFilter === "All methods" || row.paymentMethod === paymentMethodFilter)
    );
  }, [filteredData, regionFilter, channelFilter, paymentMethodFilter]);

  const regionalSummary = useMemo(() => {
    return regionalData.reduce((acc, row) => {
      acc.total += row.total;
      acc.success += row.success;
      acc.declined += row.declined;
      return acc;
    }, { total: 0, success: 0, declined: 0 });
  }, [regionalData]);

  const regionalChartData = useMemo(() => {
    const grouped = Object.fromEntries(
      REGIONS.map((region) => [region, { region, total: 0, success: 0, declined: 0 }])
    );

    regionalData.forEach((row) => {
      if (grouped[row.region]) {
        grouped[row.region].total += row.total;
        grouped[row.region].success += row.success;
        grouped[row.region].declined += row.declined;
      }
    });

    return Object.values(grouped).filter((item) =>
      regionFilter === "All regions" ? true : item.region === regionFilter
    );
  }, [regionalData, regionFilter]);

  const maxRegionalTotal = Math.max(1, ...regionalChartData.map((item) => item.total));

  const resetRegionalFilters = () => {
    setRegionFilter("All regions");
    setChannelFilter("All channels");
    setPaymentMethodFilter("All methods");
  };

  const metrics = [
    {
      label: "Total Transactions",
      value: number(totals.total),
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Success Rate",
      value: pct(totals.success, totals.total),
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Decline Rate",
      value: pct(totals.declined, totals.total),
      icon: XCircle,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Refund Rate",
      value: pct(totals.refunds, totals.total),
      icon: RotateCcw,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Chargebacks",
      value: number(totals.chargebacks),
      icon: ShieldAlert,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    {
      label: "ECP Returns",
      value: number(totals.ecpReturns),
      icon: Wallet,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Tokenized Payments",
      value: pct(totals.tokenized, totals.total),
      icon: CheckCircle2,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      label: "Non-Tokenized Payments",
      value: pct(nonTokenized, totals.total),
      icon: CreditCard,
      color: "text-slate-600",
      bg: "bg-slate-100",
    },
  ];

  // Every table column is sortable.
  const columns = [
    {
      key: "mid",
      label: "MID",
      value: (r) => r.mid,
      sortValue: (r) => r.mid,
    },
    {
      key: "date",
      label: "Date",
      value: (r) => formatDate(r.date),
      sortValue: (r) => r.date,
    },
    {
      key: "total",
      label: "Total",
      value: (r) => number(r.total),
      sortValue: (r) => r.total,
    },
    {
      key: "success",
      label: "Success",
      value: (r) => number(r.success),
      sortValue: (r) => r.success,
    },
    {
      key: "successRate",
      label: "Success %",
      value: (r) => pct(r.success, r.total),
      sortValue: (r) => ratio(r.success, r.total),
    },
    {
      key: "declined",
      label: "Declined",
      value: (r) => number(r.declined),
      sortValue: (r) => r.declined,
    },
    {
      key: "declineRate",
      label: "Decline %",
      value: (r) => pct(r.declined, r.total),
      sortValue: (r) => ratio(r.declined, r.total),
    },
    {
      key: "refunds",
      label: "Refunds",
      value: (r) => number(r.refunds),
      sortValue: (r) => r.refunds,
    },
    {
      key: "refundRate",
      label: "Refund %",
      value: (r) => pct(r.refunds, r.total),
      sortValue: (r) => ratio(r.refunds, r.total),
    },
    {
      key: "chargebacks",
      label: "Chargebacks",
      value: (r) => number(r.chargebacks),
      sortValue: (r) => r.chargebacks,
    },
    {
      key: "ecpReturns",
      label: "ECP Returns",
      value: (r) => number(r.ecpReturns),
      sortValue: (r) => r.ecpReturns,
    },
    {
      key: "tokenized",
      label: "Tokenized %",
      value: (r) => pct(r.tokenized, r.total),
      sortValue: (r) => ratio(r.tokenized, r.total),
    },
    {
      key: "nonTokenized",
      label: "Non-Tokenized %",
      value: (r) => pct(r.total - r.tokenized, r.total),
      sortValue: (r) => ratio(r.total - r.tokenized, r.total),
    },
    {
      key: "preLogin",
      label: "Pre-Login %",
      value: (r) => pct(r.preLogin, r.total),
      sortValue: (r) => ratio(r.preLogin, r.total),
    },
    {
      key: "postLogin",
      label: "Post-Login %",
      value: (r) => pct(r.postLogin, r.total),
      sortValue: (r) => ratio(r.postLogin, r.total),
    },
    {
      key: "region",
      label: "Region",
      value: (r) => r.region,
      sortValue: (r) => r.region,
    },
    {
      key: "paymentMethod",
      label: "Payment Method",
      value: (r) => r.paymentMethod,
      sortValue: (r) => r.paymentMethod,
    },
    {
      key: "channel",
      label: "Channel",
      value: (r) => r.channel,
      sortValue: (r) => r.channel,
    },
    {
      key: "accountType",
      label: "Account Type",
      value: (r) => r.accountType,
      sortValue: (r) => r.accountType,
    },
  ];

  const sortedTableData = useMemo(() => {
    const selectedColumn = columns.find(
      (column) => column.key === sortConfig.key
    );

    if (!selectedColumn) return tableData;

    return [...tableData].sort((a, b) => {
      const first = selectedColumn.sortValue(a);
      const second = selectedColumn.sortValue(b);

      let comparison;

      if (typeof first === "number" && typeof second === "number") {
        comparison = first - second;
      } else {
        comparison = String(first).localeCompare(String(second));
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });
  }, [tableData, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((current) => ({
      key,
      direction:
        current.key === key && current.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

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

  const resetFilters = () => {
    setSelectedMids([]);
    setPendingMids([]);
    setStartDate("");
    setEndDate("");
    setTableSearch("");
  };

  const setQuickDateRange = (days) => {
    const end = new Date();
    const start = new Date();

    start.setDate(end.getDate() - (days - 1));

    const toLocalISO = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    setStartDate(toLocalISO(start));
    setEndDate(toLocalISO(end));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* HEADER */}
      <header className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b border-slate-200 bg-white/95 px-4 py-3 backdrop-blur md:px-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/dashboard")}
            aria-label="Back to dashboard"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              Transaction Health
            </h1>
            <p className="text-xs text-slate-500">
              Payment Monitoring / Health Report
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-2 text-sm text-slate-500 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          {allMids ? "All MIDs" : `${selectedMids.length} selected`}
        </div>
      </header>

      <main className="mx-auto max-w-[1700px] space-y-5 p-4 md:p-6">
        {/* FILTER TOOLBAR */}
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Transaction Health Overview
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Filter by date range and MID to review transaction performance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                <CalendarDays size={15} className="shrink-0 text-slate-400" />
                <span className="text-xs text-slate-500">From</span>
                <input
                  type="date"
                  value={startDate}
                  max={endDate || undefined}
                  onChange={(e) => setStartDate(e.target.value)}
                  aria-label="Start date"
                  className="w-[125px] bg-transparent text-xs text-slate-700 outline-none"
                />
              </label>

              <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2">
                <span className="text-xs text-slate-500">To</span>
                <input
                  type="date"
                  value={endDate}
                  min={startDate || undefined}
                  onChange={(e) => setEndDate(e.target.value)}
                  aria-label="End date"
                  className="w-[125px] bg-transparent text-xs text-slate-700 outline-none"
                />
              </label>

              <button
                onClick={() => setQuickDateRange(7)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 transition hover:border-blue-300 hover:bg-blue-50"
              >
                Last 7 days
              </button>

              <button
                onClick={() => setQuickDateRange(30)}
                className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 transition hover:border-blue-300 hover:bg-blue-50"
              >
                Last 30 days
              </button>

              {/* MID SELECTOR */}
              <div className="relative">
                <button
                  onClick={openMidFilter}
                  aria-expanded={midFilterOpen}
                  className={`flex min-w-[155px] items-center justify-between gap-3 rounded-lg border px-3 py-2 text-xs transition ${
                    midFilterOpen
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-200 bg-white hover:border-blue-300"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Filter size={14} className="text-blue-600" />
                    {allMids ? "All MIDs" : `${selectedMids.length} selected`}
                  </span>
                  <ChevronDown size={14} className="text-slate-400" />
                </button>

                {midFilterOpen && (
                  <>
                    <button
                      aria-label="Close MID selector"
                      className="fixed inset-0 z-20 cursor-default"
                      onClick={() => setMidFilterOpen(false)}
                    />

                    <div className="absolute right-0 top-full z-30 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                      <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-slate-800">
                          Select MIDs
                        </h3>
                        <button
                          onClick={() => setPendingMids([])}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Clear selection
                        </button>
                      </div>

                      <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-200 px-3">
                        <Search size={14} className="text-slate-400" />
                        <input
                          value={midSearch}
                          onChange={(e) => setMidSearch(e.target.value)}
                          placeholder="Search MID..."
                          className="w-full py-2 text-xs outline-none"
                        />
                      </div>

                      <div className="max-h-48 space-y-1 overflow-y-auto">
                        {matchingMids.map((row) => (
                          <label
                            key={row.mid}
                            className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-2 text-xs hover:bg-slate-50"
                          >
                            <input
                              type="checkbox"
                              checked={pendingMids.includes(row.mid)}
                              onChange={(e) =>
                                togglePendingMid(row.mid, e.target.checked)
                              }
                              className="accent-blue-600"
                            />
                            <span>{row.mid}</span>
                          </label>
                        ))}
                      </div>

                      <button
                        onClick={applyMidFilter}
                        className="mt-3 w-full rounded-lg bg-blue-600 py-2 text-xs font-medium text-white transition hover:bg-blue-700"
                      >
                        Apply Filter
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
            <span className="text-xs text-slate-500">Active filters:</span>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700">
              {startDate ? formatDate(startDate) : "Any start date"}
              {" — "}
              {endDate ? formatDate(endDate) : "Any end date"}
            </span>

            {allMids ? (
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
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
                  className="flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700 hover:bg-blue-100"
                >
                  {mid}
                  <X size={11} />
                </button>
              ))
            )}

            <button
              onClick={resetFilters}
              className="ml-auto flex items-center gap-1 text-xs text-slate-500 hover:text-blue-700"
            >
              <RefreshCw size={12} />
              Reset filters
            </button>
          </div>
        </section>

        {/* KPI CARDS */}
        <section>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                Overall Transaction Health
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                {allMids
                  ? "Combined across all MIDs"
                  : `Combined across ${selectedMids.length} selected MIDs`}
              </p>
            </div>
            <span className="text-xs text-slate-500">
              {filteredData.length} MID(s)
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-8">
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <div
                  key={metric.label}
                  className="rounded-xl border border-slate-200 bg-white p-3 transition hover:border-blue-200"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs leading-4 text-slate-500">
                      {metric.label}
                    </p>
                    <span className={`rounded-lg p-1.5 ${metric.bg}`}>
                      <Icon size={15} className={metric.color} />
                    </span>
                  </div>
                  <p className="mt-3 text-xl font-semibold tracking-tight tabular-nums text-slate-900">
                    {metric.value}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* DISTRIBUTION CHARTS */}
        <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {/* LOGIN DISTRIBUTION */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Login Distribution
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Pre-login versus post-login transactions
            </p>

            <div className="mt-5 space-y-5">
              {[
                {
                  label: "Pre-Login",
                  value: totals.preLogin,
                  color: "bg-blue-500",
                },
                {
                  label: "Post-Login",
                  value: totals.postLogin,
                  color: "bg-violet-500",
                },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex justify-between gap-3 text-xs">
                    <span className="text-slate-600">{item.label}</span>
                    <span className="font-medium text-slate-800">
                      {number(item.value)}{" "}
                      <span className="font-normal text-slate-400">
                        ({pct(item.value, totals.total)})
                      </span>
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: `${Math.min(
                          100,
                          ratio(item.value, totals.total)
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT METHOD DISTRIBUTION */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Payment Method Distribution
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Transaction volume by payment method
            </p>

            <div className="mt-4 space-y-3">
              {PAYMENT_METHODS.map((method, index) => {
                const value = paymentDistribution[method] || 0;
                const colors = [
                  "bg-blue-500",
                  "bg-emerald-500",
                  "bg-indigo-500",
                  "bg-sky-500",
                  "bg-slate-500",
                  "bg-amber-500",
                ];

                return (
                  <div key={method}>
                    <div className="mb-1 flex items-center justify-between gap-2">
                      <span
                        className={`rounded-md px-2 py-1 text-[11px] font-medium ${
                          PAYMENT_STYLES[method] ||
                          "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {method}
                      </span>
                      <span className="text-xs font-medium text-slate-700">
                        {number(value)}
                        <span className="ml-1 text-slate-400">
                          ({pct(value, totals.total)})
                        </span>
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${colors[index]}`}
                        style={{
                          width: `${Math.min(
                            100,
                            ratio(value, totals.total)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CHANNEL DISTRIBUTION */}
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Channel Distribution
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Transaction volume by channel
            </p>

            <div className="mt-5 space-y-5">
              {CHANNELS.map((channel) => {
                const value = channelDistribution[channel] || 0;
                const style = CHANNEL_STYLES[channel];
                const Icon = style.icon;

                return (
                  <div key={channel}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className={`rounded-lg p-2 ${style.light}`}>
                          <Icon size={16} className={style.text} />
                        </span>
                        <span className="text-sm font-medium text-slate-700">
                          {channel}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-semibold text-slate-900">
                          {number(value)}
                        </p>
                        <p className="text-xs text-slate-400">
                          {pct(value, totals.total)}
                        </p>
                      </div>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${style.color} transition-all duration-300`}
                        style={{
                          width: `${Math.min(
                            100,
                            ratio(value, totals.total)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
              {CHANNELS.map((channel) => (
                <span
                  key={channel}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${CHANNEL_STYLES[channel].light} ${CHANNEL_STYLES[channel].text}`}
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* DECLINE REASON KPI */}
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <ShieldAlert size={17} className="text-rose-600" />
                <h2 className="text-sm font-semibold text-slate-900">Decline Reason Analysis</h2>
              </div>
              <p className="mt-1 text-xs text-slate-500">
                Common grouped Braintree-style processor decline reasons for the selected dates and MIDs.
              </p>
            </div>
            <span className="text-xs text-slate-500">
              {number(totals.declined)} declined transactions
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {DECLINE_REASONS.map((reason) => {
              const value = declineReasonDistribution[reason.key] || 0;
              const share = totals.declined ? (value / totals.declined) * 100 : 0;

              return (
                <div key={reason.key} className="rounded-xl border border-slate-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-medium text-slate-600">{reason.label}</p>
                    <span className="text-xs font-semibold tabular-nums text-slate-500">
                      {share.toFixed(1)}%
                    </span>
                  </div>
                  <p className="mt-2 text-2xl font-semibold tabular-nums text-slate-900">
                    {number(value)}
                  </p>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full ${reason.color}`}
                      style={{ width: `${Math.min(100, share)}%` }}
                    />
                  </div>
                  <p className="mt-2 text-[11px] text-slate-400">Share of declined transactions</p>
                </div>
              );
            })}
          </div>
          <p className="mt-3 text-[11px] leading-5 text-slate-400">
            Note: these are illustrative grouped categories, not live Braintree SDK data. In production,
            populate them from each transaction’s processor response code/text; exact decline wording can vary by processor.
          </p>
        </section>

        {/* REGIONAL KPI EXPLORER: REGION + CHANNEL + PAYMENT METHOD */}
        <section className="rounded-xl border border-slate-200 bg-white p-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <MapPinned size={17} className="text-blue-600" />
                <h2 className="text-sm font-semibold text-slate-900">Regional Transaction Performance</h2>
              </div>
              <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500">
                Compare transaction volume by region, then narrow the view by channel and payment method.
                These filters combine with the date and MID filters above.
              </p>
            </div>

            <button
              onClick={resetRegionalFilters}
              className="inline-flex items-center gap-1.5 self-start rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 transition hover:border-blue-300 hover:bg-blue-50"
            >
              <RefreshCw size={13} />
              Reset regional filters
            </button>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-600">Region</span>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-blue-500"
              >
                <option>All regions</option>
                {REGIONS.map((region) => <option key={region}>{region}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-600">Channel</span>
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-blue-500"
              >
                <option>All channels</option>
                {CHANNELS.map((channel) => <option key={channel}>{channel}</option>)}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-medium text-slate-600">Payment method</span>
              <select
                value={paymentMethodFilter}
                onChange={(e) => setPaymentMethodFilter(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-xs outline-none focus:border-blue-500"
              >
                <option>All methods</option>
                {PAYMENT_METHODS.map((method) => <option key={method}>{method}</option>)}
              </select>
            </label>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-blue-50 p-3">
              <p className="text-xs text-blue-700">Filtered Transaction Volume</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-blue-900">{number(regionalSummary.total)}</p>
            </div>
            <div className="rounded-xl bg-emerald-50 p-3">
              <p className="text-xs text-emerald-700">Filtered Success Rate</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-emerald-900">{pct(regionalSummary.success, regionalSummary.total)}</p>
            </div>
            <div className="rounded-xl bg-rose-50 p-3">
              <p className="text-xs text-rose-700">Filtered Decline Rate</p>
              <p className="mt-1 text-2xl font-semibold tabular-nums text-rose-900">{pct(regionalSummary.declined, regionalSummary.total)}</p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-100 p-3 sm:p-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-slate-800">Transaction Volume by Region</h3>
                <p className="mt-1 text-xs text-slate-500">Bar length represents total transactions; successful and declined amounts are shown below each bar.</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] text-slate-600">
                {regionalData.length} matching record(s)
              </span>
            </div>

            <div className="space-y-5">
              {regionalChartData.map((item) => {
                const share = (item.total / maxRegionalTotal) * 100;
                return (
                  <div key={item.region}>
                    <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-medium text-slate-700">{item.region}</span>
                      <span className="font-semibold tabular-nums text-slate-900">{number(item.total)}</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${share}%` }}
                      />
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-slate-500">
                      <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-emerald-500" />Success: {number(item.success)} ({pct(item.success, item.total)})</span>
                      <span><span className="mr-1 inline-block h-2 w-2 rounded-full bg-rose-500" />Declined: {number(item.declined)} ({pct(item.declined, item.total)})</span>
                    </div>
                  </div>
                );
              })}
              {regionalChartData.every((item) => item.total === 0) && (
                <p className="py-8 text-center text-xs text-slate-500">
                  No regional transactions match these filters. Try another channel or payment method.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* MID-WISE TRANSACTION TABLE */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">
                MID-wise Transaction Details
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Select any column heading to sort ascending or descending.
              </p>
            </div>

            <label className="flex items-center gap-2 rounded-lg border border-slate-200 px-3">
              <Search size={15} className="text-slate-400" />
              <input
                value={tableSearch}
                onChange={(e) => setTableSearch(e.target.value)}
                placeholder="Search table..."
                className="w-full bg-transparent py-2 text-xs outline-none placeholder:text-slate-400 md:w-52"
              />
              {tableSearch && (
                <button
                  onClick={() => setTableSearch("")}
                  aria-label="Clear table search"
                >
                  <X size={13} className="text-slate-400" />
                </button>
              )}
            </label>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1700px] border-collapse text-left text-xs">
              <thead className="sticky top-0 z-10 bg-slate-50">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className="whitespace-nowrap border-b border-slate-200 px-3 py-3 font-semibold text-slate-600"
                    >
                      <button
                        onClick={() => handleSort(column.key)}
                        className="flex items-center gap-1.5 transition hover:text-blue-700"
                      >
                        {column.label}
                        {sortConfig.key === column.key ? (
                          sortConfig.direction === "asc" ? (
                            <ChevronUp size={13} className="text-blue-600" />
                          ) : (
                            <ChevronDown
                              size={13}
                              className="text-blue-600"
                            />
                          )
                        ) : (
                          <ChevronDown
                            size={12}
                            className="text-slate-300"
                          />
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {sortedTableData.length > 0 ? (
                  sortedTableData.map((row) => (
                    <tr
                      key={`${row.mid}-${row.date}`}
                      className="transition-colors hover:bg-blue-50/40"
                    >
                      {columns.map((column) => {
                        let cellClass = "text-slate-700";

                        if (column.key === "mid") {
                          cellClass = "font-semibold text-blue-700";
                        } else if (column.key === "success") {
                          cellClass = "font-medium text-emerald-700";
                        } else if (column.key === "declined") {
                          cellClass = "font-medium text-rose-600";
                        }

                        return (
                          <td
                            key={column.key}
                            className={`whitespace-nowrap px-3 py-3 ${cellClass}`}
                          >
                            {column.key === "channel" ? (
                              <span
                                className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                                  CHANNEL_STYLES[row.channel]?.light ||
                                  "bg-slate-100"
                                } ${
                                  CHANNEL_STYLES[row.channel]?.text ||
                                  "text-slate-600"
                                }`}
                              >
                                {column.value(row)}
                              </span>
                            ) : column.key === "paymentMethod" ? (
                              <span
                                className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                                  PAYMENT_STYLES[row.paymentMethod] ||
                                  "bg-slate-100 text-slate-600"
                                }`}
                              >
                                {column.value(row)}
                              </span>
                            ) : (
                              column.value(row)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="px-4 py-12 text-center text-slate-500"
                    >
                      No transaction records match the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 px-4 py-3 text-xs text-slate-500">
            <span>
              Showing {sortedTableData.length} of {filteredData.length} MID
              record(s)
            </span>
            <span>Scroll horizontally to view all columns</span>
          </div>
        </section>

        <p className="pb-1 text-center text-[11px] text-slate-400">
          Transaction Health Report · Payment Monitoring Platform
        </p>
      </main>
    </div>
  );
}