"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Info,
  User,
  Activity,
  DollarSign,
  ChevronRight,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();

  const cards = [
    {
      title: "Monthly Invoice Report",
      desc: "View monthly invoice reports and summaries",
      icon: <Activity size={26} />,
      link: "/Invoice",
    },
    {
      title: "Transfer Summary Report",
      desc: "Monitor fund flow and balances",
      icon: <DollarSign size={26} />,
      link: "/funding-monitoring",
    },
    {
      title: "Transaction Health Report",
      desc: "View all records and monitor transaction health",
      icon: <BarChart3 size={26} />,
      link: "/reconcilation-monitoring",
    },
    {
      title: "Posting Monitoring Report",
      desc: "Track transaction posting status",
      icon: <Activity size={26} />,
      link: "/posting-monitoring",
    },
  ];

  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={19} />,
      path: "/dashboard",
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={19} />,
      path: "/analytics",
    },
    {
      name: "About",
      icon: <Info size={19} />,
      path: "/about",
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
      {/* SIDEBAR */}
      <aside className="flex w-60 shrink-0 flex-col justify-between border-r border-slate-200 bg-white px-4 py-5">
        <div>
          {/* LOGO */}
          <div
            onClick={() => router.push("/dashboard")}
            className="mb-7 flex cursor-pointer items-center gap-3 px-2"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="h-9 w-auto object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* NAVIGATION */}
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Main Menu
          </p>

          <nav className="space-y-2">
            {menu.map((item) => {
              const isActive = pathname === item.path;

              return (
                <button
                  key={item.path}
                  type="button"
                  onClick={() => router.push(item.path)}
                  className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                  }`}
                >
                  <span
                    className={
                      isActive ? "text-blue-600" : "text-slate-400"
                    }
                  >
                    {item.icon}
                  </span>

                  <span className="flex-1">{item.name}</span>

                  {isActive && (
                    <span className="h-5 w-1 rounded-full bg-blue-600" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* PROFILE */}
        <button
          type="button"
          onClick={() => router.push("/profile")}
          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 text-left transition hover:border-blue-200 hover:bg-blue-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <User size={19} />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-800">Profile</p>
            <p className="text-xs text-slate-500">Account settings</p>
          </div>

          <ChevronRight size={17} className="text-slate-400" />
        </button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
        {/* TOP BAR */}
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 bg-white px-6 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              Payment Monitoring Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor your payment operations and reports in one place.
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3 rounded-full border border-blue-100 bg-blue-50 px-4 py-2">
            <div className="h-2 w-2 rounded-full bg-blue-600" />
            <span className="text-sm font-medium text-slate-700">
              Welcome, Somil
            </span>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className="flex flex-1 flex-col justify-center px-6 py-5">
          {/* INTRODUCTION */}
          <section className="mb-6 shrink-0">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-7 w-1 rounded-full bg-blue-600" />
              <h2 className="text-lg font-bold text-slate-900">
                Reports Overview
              </h2>
            </div>

            <p className="ml-3 text-sm text-slate-500">
              Select a report below to view details and track payment activity.
            </p>
          </section>

          {/* REPORT CARDS */}
          <section className="grid shrink-0 grid-cols-1 gap-4 sm:grid-cols-2">
            {cards.map((card) => (
              <motion.button
                key={card.link}
                type="button"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.2 }}
                onClick={() => router.push(card.link)}
                className="group flex min-h-[170px] flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all duration-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-100/60 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <div className="mb-4 flex w-full items-start justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700 transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white">
                    {card.icon}
                  </div>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-all duration-200 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white">
                    <ChevronRight size={17} />
                  </span>
                </div>

                <h3 className="text-base font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                  {card.title}
                </h3>

                <p className="mt-2 flex-1 text-sm leading-5 text-slate-500">
                  {card.desc}
                </p>

                <div className="mt-4 h-1 w-10 rounded-full bg-blue-100 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-600" />
              </motion.button>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}