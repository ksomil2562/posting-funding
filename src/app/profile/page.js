"use client";
import { motion } from "framer-motion";
import { User, Briefcase, Shield, Home } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-10 relative">

      {/* HOME BUTTON */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-gray-800 transition text-sm"
        >
          <Home size={16} />
          Home
        </button>
      </div>

      {/* PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-xl"
      >

        {/* HEADER */}
        <div className="flex items-center gap-6 mb-8">

          {/* Avatar */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
            SK
          </div>

          {/* Info */}
          <div>
            <h1 className="text-2xl font-semibold">
              Somil Kumar
            </h1>
            <p className="text-gray-400">
              Trainee - Product Management
            </p>
            <p className="text-blue-400 text-sm mt-1">
              Payments Team
            </p>
          </div>
        </div>

        {/* DETAILS */}
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <User size={16} />
              <p className="text-sm text-gray-400">Role</p>
            </div>
            <h3 className="font-medium">
              Product Management Trainee
            </h3>
          </div>

          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Briefcase size={16} />
              <p className="text-sm text-gray-400">Team</p>
            </div>
            <h3 className="font-medium">
              Payments Team
            </h3>
          </div>

          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Shield size={16} />
              <p className="text-sm text-gray-400">Access</p>
            </div>
            <h3 className="font-medium">
              Internal Dashboard User
            </h3>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          Managing payment monitoring, reconciliation, and funding workflows.
        </div>

      </motion.div>
    </div>
  );
}