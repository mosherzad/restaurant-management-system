"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type OrderOverviewProp = {
  statics: {
    totalOrders: number;
    pendingOrders: number;
    cookingOrders: number;
    readyOrders: number;
  };
};

export const OrderOverview = ({ statics }: OrderOverviewProp) => {
  const data = [
    { name: "Pending", orders: statics.pendingOrders },
    { name: "Cooking", orders: statics.cookingOrders },
    { name: "Ready", orders: statics.readyOrders },
    { name: "Total", orders: statics.totalOrders },
  ];
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

      <div className="w-full h-75">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="orders"
              fill="#EC6D13"
              label={({ x, y, width, value }) => (
                <text
                  x={Number(x) + Number(width) / 2}
                  y={Number(y) - 6}
                  textAnchor="middle"
                  fill="#666"
                >
                  {value}
                </text>
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
