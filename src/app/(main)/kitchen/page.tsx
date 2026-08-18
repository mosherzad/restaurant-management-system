"use client";
import { useEffect, useState } from "react";
import { MdPendingActions } from "react-icons/md";
import { FaFire, FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";

type Order = {
  id: number;
  tableNumber: number;
  status: string;
  note: string;
  items: {
    quantity: number;
    menuItem: {
      name: string;
    };
  }[];
};

const Kitchen = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const readyOrders = orders.filter((order) => order.status === "READY").length;
  const cookingOrders = orders.filter(
    (order) => order.status === "COOKING",
  ).length;
  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING",
  ).length;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data.orders);
        console.log(data.orders);
      } catch (error) {
        console.error(error);
        toast.error(
          error instanceof Error ? error.message : "Failed to fetch orders",
        );
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (
    orderId: number,
    status: "PENDING" | "COOKING" | "READY" | "COMPLETED",
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "failed to fetch data");

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order,
        ),
      );
      toast.success("Order status updated");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update order status",
      );
    }
  };
  const cardStyle =
    "p-4 rounded-md border border-white/20 text-white bg-white/5";
  return (
    <div className="w-full space-y-6">
      <div className="text-white">
        <h1 className="text-2xl font-bold">Kitchen Dashboard</h1>
        <p className="text-white/60">Manage all incoming orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={cardStyle + " bg-orange-500/20"}>
          <div className="flex items-center gap-2 mb-2">
            <MdPendingActions size={20} className="text-orange-400" />
            <h3 className="font-semibold">Pending Orders</h3>
          </div>
          <p className="text-2xl font-bold">{pendingOrders}</p>
        </div>

        <div className={cardStyle + " bg-yellow-500/20"}>
          <div className="flex items-center gap-2 mb-2">
            <FaFire size={18} className="text-yellow-400" />
            <h3 className="font-semibold">In Progress</h3>
          </div>
          <p className="text-2xl font-bold">{cookingOrders}</p>
        </div>

        <div className={cardStyle + " bg-green-500/20"}>
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle size={18} className="text-green-500" />
            <h3 className="font-semibold">Ready</h3>
          </div>
          <p className="text-2xl font-bold">{readyOrders}</p>
        </div>
      </div>

      <div className="p-4 rounded-md border border-white/20 bg-white/5 text-white h-115 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Active Orders</h2>

        <div className="space-y-3">
          {orders.map((order) => {
            return (
              <div
                key={order.id}
                className="flex justify-between items-center border-b border-white/10 pb-2"
              >
                <div>
                  <span className="font-medium">
                    #1023 -{" "}
                    <span className="text-sm text-slate-700">
                      {order.items.map((item, index) => (
                        <span
                          key={index}
                          className="mr-2 inline-flex items-center gap-1"
                        >
                          <span className="rounded-md bg-amber-100 px-1.5 py-0.5 text-sm font-semibold text-amber-700">
                            ×{item.quantity}
                          </span>
                          <span className="text-white">
                            {item.menuItem.name}
                          </span>
                        </span>
                      ))}
                    </span>{" "}
                  </span>
                  {order.note && (
                    <span className="text-gray-300"> ({order.note}) </span>
                  )}
                  <p className="text-white/60 text-sm">
                    Table {order.tableNumber}
                  </p>
                </div>
                <select
                  name="status"
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value as
                        | "PENDING"
                        | "COOKING"
                        | "READY"
                        | "COMPLETED",
                    )
                  }
                  className={`rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium ${order.status === "READY" ? "text-green-500" : order.status === "PENDING" ? "text-red-400" : order.status === "COOKING" ? "text-yellow-400" : "text-blue-500"} outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-400/30`}
                >
                  <option
                    className="bg-[#1f2937] text-orange-400"
                    value="PENDING"
                  >
                    Pending
                  </option>
                  <option
                    className="bg-[#1f2937] text-yellow-400"
                    value="COOKING"
                  >
                    Cooking
                  </option>
                  <option className="bg-[#1f2937] text-green-400" value="READY">
                    Ready
                  </option>
                  <option
                    className="bg-[#1f2937] text-blue-400"
                    value="COMPLETED"
                  >
                    Completed
                  </option>
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Kitchen;
