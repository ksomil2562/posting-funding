"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";
import { UserRound, LockKeyhole, Eye, EyeOff, Sun, Moon, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const playSound = () => {
    const audio = new Audio("/click.mp3");
    audio.play().catch(() => {});
  };

  const handleLogin = (e) => {
    e.preventDefault();
    playSound();

    if (id === "somil" && password === "somil2026") {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-8 transition-colors duration-300 ${
        dark ? "bg-slate-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* SUBTLE BACKGROUND */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className={`absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl ${
            dark ? "bg-blue-600/15" : "bg-blue-200/40"
          }`}
        />
        <div
          className={`absolute -bottom-40 -right-32 h-96 w-96 rounded-full blur-3xl ${
            dark ? "bg-indigo-500/10" : "bg-indigo-100/70"
          }`}
        />
      </div>

      <Particles
        className="pointer-events-none absolute inset-0"
        options={{
          fullScreen: { enable: false },
          particles: {
            number: { value: 35, density: { enable: true, area: 900 } },
            color: { value: dark ? "#60a5fa" : "#93bdf9" },
            size: { value: { min: 1, max: 2 } },
            move: { enable: true, speed: 0.35 },
            opacity: { value: { min: 0.12, max: 0.35 } },
            links: { enable: false },
          },
          detectRetina: true,
        }}
      />

      {/* THEME TOGGLE */}
      <button
        type="button"
        onClick={() => setDark(!dark)}
        aria-label="Toggle theme"
        className={`absolute right-6 top-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border transition ${
          dark
            ? "border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800"
            : "border-slate-200 bg-white text-slate-600 shadow-sm hover:bg-slate-100"
        }`}
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      {/* LOGIN CARD */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`relative z-10 w-full max-w-[410px] rounded-3xl border p-8 shadow-xl sm:p-10 ${
          dark
            ? "border-slate-800 bg-slate-900/90 shadow-black/20"
            : "border-slate-200/80 bg-white/95 shadow-slate-200/70"
        }`}
      >
        {/* LOGO */}
        <div className="mb-8 flex flex-col items-center text-center">
          <img
            src="/logo.png"
            alt="Payments Logo"
            className="mb-5 h-14 max-w-[180px] object-contain"
          />

          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back
          </h1>

          <p
            className={`mt-2 text-sm ${
              dark ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Sign in to your payment monitoring system
          </p>
        </div>

        {/* LOGIN FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* USER ID */}
          <div>
            <label
              htmlFor="userId"
              className={`mb-2 block text-sm font-medium ${
                dark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              User ID
            </label>

            <div
              className={`flex items-center rounded-xl border transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
                dark
                  ? "border-slate-700 bg-slate-950"
                  : "border-slate-200 bg-white"
              }`}
            >
              <UserRound
                size={18}
                className={`ml-4 shrink-0 ${
                  dark ? "text-slate-500" : "text-slate-400"
                }`}
              />

              <input
                id="userId"
                type="text"
                placeholder="Enter your user ID"
                autoComplete="username"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  setError("");
                }}
                className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div>
            <label
              htmlFor="password"
              className={`mb-2 block text-sm font-medium ${
                dark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Password
            </label>

            <div
              className={`flex items-center rounded-xl border transition focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 ${
                dark
                  ? "border-slate-700 bg-slate-950"
                  : "border-slate-200 bg-white"
              }`}
            >
              <LockKeyhole
                size={18}
                className={`ml-4 shrink-0 ${
                  dark ? "text-slate-500" : "text-slate-400"
                }`}
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-slate-400"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className={`mr-3 rounded-md p-1.5 transition ${
                  dark
                    ? "text-slate-400 hover:text-white"
                    : "text-slate-400 hover:text-slate-700"
                }`}
              >
                {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
              </button>
            </div>
          </div>

          {/* REMEMBER ME */}
          <div className="flex items-center justify-between text-sm">
            <label
              className={`flex cursor-pointer items-center gap-2 ${
                dark ? "text-slate-400" : "text-slate-600"
              }`}
            >
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
                className="h-4 w-4 rounded border-slate-300 accent-blue-600"
              />
              Remember me
            </label>
          </div>

          {/* ERROR */}
          {error && (
            <p
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600"
            >
              {error}
            </p>
          )}

          {/* SIGN IN BUTTON */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/20"
          >
            Sign in
            <ArrowRight size={17} />
          </motion.button>
        </form>

        {/* FOOTER */}
        <div
          className={`mt-7 border-t pt-5 text-center text-xs ${
            dark
              ? "border-slate-800 text-slate-500"
              : "border-slate-100 text-slate-400"
          }`}
        >
          Secure access to your payment operations
        </div>
      </motion.div>
    </div>
  );
}