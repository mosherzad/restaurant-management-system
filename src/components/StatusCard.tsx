"use client";

import { FaShoppingBag, FaClock, FaFire, FaDollarSign } from "react-icons/fa";

type StatusCardProps = {
  statics: {
    totalOrders: number;
    pendingOrders: number;
    cookingOrders: number;
    readyOrders: number;
    totalRevenue: number;
    totalMeals: number;
    totalCategories: number;
  };
};

const StatusCard = ({ statics }: StatusCardProps) => {
  const stats = [
    {
      title: "Total Orders",
      value: statics.totalOrders,
      icon: FaShoppingBag,
      color: "text-blue-400",
      bg: "bg-blue-500/15",
      border: "border-blue-500/20",
    },
    {
      title: "Pending Orders",
      value: statics.pendingOrders,
      icon: FaClock,
      color: "text-orange-400",
      bg: "bg-orange-500/15",
      border: "border-orange-500/20",
    },
    {
      title: "Cooking",
      value: statics.cookingOrders,
      icon: FaFire,
      color: "text-yellow-400",
      bg: "bg-yellow-500/15",
      border: "border-yellow-500/20",
    },
    {
      title: "Revenue",
      value: `$${statics.totalRevenue}`,
      icon: FaDollarSign,
      color: "text-green-400",
      bg: "bg-green-500/15",
      border: "border-green-500/20",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className={`group rounded-2xl border ${card.border} bg-[#0F172A] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-orange-400/40 hover:bg-white/10`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-slate-400">{card.title}</p>

                <h2 className="mt-3 text-3xl font-bold text-white">
                  {card.value}
                </h2>
              </div>

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${card.bg}`}
              >
                <Icon
                  size={24}
                  className={`${card.color} transition-transform duration-300 group-hover:scale-110`}
                />
              </div>
            </div>

            <div className="mt-6 h-1 w-full rounded-full bg-white/5">
              <div
                className={`h-full rounded-full ${card.bg.replace("/15", "/80")}`}
                style={{ width: "70%" }}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default StatusCard;
