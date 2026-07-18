"use client";

import { FiBell, FiSearch } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

export default function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between bg-[#0F172A] mb-3 p-5">
      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-400">
          Welcome back! Here's what's happening today.
        </p>

        <p className="mt-2 text-xs text-slate-500">{today}</p>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2">
          <FaUserCircle size={42} className="text-orange-400" />

          <div>
            <h3 className="text-sm font-semibold text-white">Admin</h3>

            <p className="text-xs text-slate-400">Restaurant Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}
