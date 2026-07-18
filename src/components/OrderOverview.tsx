import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

export const OrderOverview = () => {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0F172A] p-5 w-full">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">Orders Overview</h2>

          <p className="mt-1 text-sm text-slate-400">
            Track restaurant performance over time.
          </p>
        </div>

        <select className="rounded-xl border border-white/10 bg-[#111C31] px-4 py-2 text-sm text-white outline-none transition focus:border-orange-400">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="flex h-80 items-center justify-center rounded-xl border border-dashed border-slate-700 bg-[#111827]">
        <div className="text-center">
          <FaArrowTrendUp size={40} className="mx-auto text-orange-400" />

          <h3 className="mt-4 text-lg font-semibold text-white">
            Chart Coming Soon
          </h3>

          <p className="mt-2 text-sm text-slate-400">
            Connect Recharts or Chart.js to display orders, revenue and sales.
          </p>
        </div>
      </div>

      {/* <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-sm text-slate-400">Orders</p>

          <h3 className="mt-2 text-2xl font-bold text-white">124</h3>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-sm text-slate-400">Revenue</p>

          <h3 className="mt-2 text-2xl font-bold text-green-400">$3,250</h3>
        </div>

        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-sm text-slate-400">Growth</p>

          <h3 className="mt-2 text-2xl font-bold text-orange-400">+18%</h3>
        </div>
      </div> */}
    </section>
  );
};
