"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Particles from "@tsparticles/react";

export default function LoginPage() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [dark, setDark] = useState(true);
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  const playSound = () => {
    const audio = new Audio("/click.mp3");
    audio.play();
  };

  const handleLogin = () => {
    playSound();
    if (id === "somil" && password === "somil2026") {
      router.push("/dashboard");
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className={`${
        dark ? "bg-black text-white" : "bg-white text-black"
      } min-h-screen flex items-center justify-center relative overflow-hidden`}
    >
      {/* SIMPLE PARTICLES (Stable) */}
      <Particles
        className="absolute inset-0"
        options={{
          particles: {
            number: { value: 40 },
            size: { value: 2 },
            move: { enable: true, speed: 0.8 },
            opacity: { value: 0.4 },
          },
        }}
      />

      {/* Theme Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-5 right-5 px-3 py-1 bg-gray-700 rounded-lg text-sm"
      >
        Toggle Theme
      </button>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 p-8 rounded-2xl shadow-2xl w-[360px] z-10"
      >
        {/* Logo */}
        <motion.h1
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-3xl font-bold text-center"
        >
          SEW
        </motion.h1>

        {/* Subtitle */}
        <p className="text-center text-sm mt-2 text-gray-300 animate-pulse">
          Payment Monitoring System
        </p>

        {/* Inputs */}
        <input
          type="text"
          placeholder="User ID"
          className="w-full mt-6 mb-3 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-3 px-4 py-2 rounded-lg bg-gray-800 border border-gray-600 focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Remember Me */}
        <div className="flex items-center justify-between text-sm mb-3">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Remember Me
          </label>
        </div>

        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

        {/* Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-700 font-semibold"
        >
          Login
        </motion.button>
      </motion.div>
    </div>
  );
}