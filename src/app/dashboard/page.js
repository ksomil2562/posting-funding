"use client";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  BarChart3,
  Info,
  User,
  Activity,
  DollarSign,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();

  const cards = [
    {
      title: "Posting Monitoring",
      desc: "Track transaction posting status",
      icon: <Activity size={44} />,
      link: "/posting-monitoring",
    },
    {
      title: "Reconciliation Monitoring",
      desc: "Match and validate transactions",
      icon: <BarChart3 size={44} />,
      link: "/reconcilation-monitoring", // ✅ fixed typo
    },
    {
      title: "Funding Monitoring",
      desc: "Monitor fund flow and balances",
      icon: <DollarSign size={44} />,
      link: "/funding-monitoring",
    },
  ];

  const menu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    {
      name: "Analytics",
      icon: <BarChart3 size={18} />,
      path: "/analytics",
    },
    {
      name: "About",
      icon: <Info size={18} />,
      path: "/about",
    },
  ];

  return (
    
    <div className="flex min-h-screen bg-gray-950 text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-black/40 backdrop-blur-xl border-r border-gray-800 p-6 flex flex-col justify-between">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <img
              src="/logo.png"
              className="h-12 w-auto hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Menu */}
          <div className="space-y-3 text-sm">
            {menu.map((item, index) => (
              <div
                key={index}
                onClick={() => router.push(item.path)}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
                  pathname === item.path
                    ? "bg-blue-600/20 text-blue-400"
                    : "hover:bg-gray-800"
                }`}
              >
                {item.icon}
                {item.name}
              </div>
            ))}
          </div>
        </div>

        {/* Profile */}
    <div
  onClick={() => router.push("/profile")}
  className="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition hover:bg-gray-800"
>
  <User size={18} />
  Profile
</div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1">

        {/* TOP BAR */}
        <div className="flex justify-between items-center px-10 py-5 border-b border-gray-800">
          <h1 className="text-2xl font-semibold">
            Payment Monitoring Dashboard
          </h1>
          <div className="text-sm text-gray-400">
            Welcome, Somil
          </div>
        </div>

        {/* CARDS */}
        <div className="p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, y: -6 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push(card.link)} // ✅ no new tab
              className="cursor-pointer p-10 rounded-3xl bg-white/5 border border-white/10 shadow-xl hover:shadow-blue-500/30 transition-all min-h-[220px] flex flex-col justify-center"
            >
              <div className="mb-4">{card.icon}</div>
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="text-gray-400 mt-3 text-base">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}