"use client";
import { FaBasketShopping, FaTrash } from "react-icons/fa6";
import { MdPendingActions } from "react-icons/md";
import { FaCheckCircle, FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import EditOrderModel from "@/components/EditOrderModel";
import { Order } from "@/lib/types/menu";
import { deleteOrderById } from "@/api-calls/orderApiCall";

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const cardStyle = "p-4 rounded-md border border-white/20 text-white";

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.status === "PENDING",
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "COMPLETED",
  ).length;

  const handleDeleteOrder = async (orderId: number) => {
    try {
      await deleteOrderById(orderId);

      setOrders((prev) => prev.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/order`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        setOrders(data.orders);
        console.log(data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="w-full space-y-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className={cardStyle + " bg-blue-500/20"}>
          <div className="flex items-center gap-2 mb-2">
            <FaBasketShopping size={20} />
            <h3 className="font-semibold">Total Orders</h3>
          </div>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className={cardStyle + " bg-orange-500/20"}>
          <div className="flex items-center gap-2 mb-2">
            <MdPendingActions size={20} />
            <h3 className="font-semibold">Pending</h3>
          </div>
          <p className="text-2xl font-bold">{pendingOrders}</p>
        </div>

        <div className={cardStyle + " bg-green-500/20"}>
          <div className="flex items-center gap-2 mb-2">
            <FaCheckCircle size={20} />
            <h3 className="font-semibold">Completed</h3>
          </div>
          <p className="text-2xl font-bold">{completedOrders}</p>
        </div>
      </div>

      <div className="p-4 rounded-md border border-white/20 bg-white/5 text-white h-115 overflow-y-auto">
        <h2 className="font-semibold text-lg mb-4">Recent Orders</h2>

        <div className="space-y-3">
          {orders.map((order, index) => {
            return (
              <div
                key={order.id}
                className="flex justify-between items-center border-b border-white/10 pb-2"
              >
                <div>
                  <span className="font-semibold"> #{index + 1}</span> -{" "}
                  <span className="text-md">
                    {" "}
                    {order.items.map((item) => item.menuItem.name).join(", ")}
                  </span>
                  {order.note && (
                    <span className="text-gray-300"> ({order.note})</span>
                  )}
                  <h1 className="text-gray-300 text-md">
                    Table {order.tableNumber}
                  </h1>
                  <h6 className="text-gray-300 text-sm font-semibold">
                    ${order.total}
                  </h6>
                </div>
                <div className="flex items-center space-x-3">
                  <span
                    className={`font-semibold text-sm ${order.status === "READY" ? "text-green-500" : order.status === "PENDING" ? "text-red-500" : order.status === "COOKING" ? "text-yellow-400" : "text-blue-500"}`}
                  >
                    {order.status}
                  </span>
                  <FaEdit
                    onClick={() => {
                      setSelectedOrder(order);
                      setIsOpen(true);
                    }}
                    size={20}
                    className="hover:text-[#EC6D13] transition-all duration-200 cursor-pointer"
                  />
                  <FaTrash
                    onClick={() => handleDeleteOrder(order.id)}
                    size={20}
                    className="hover:text-[#EC6D13] transition-all duration-200 cursor-pointer"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {selectedOrder && (
          <EditOrderModel
            isOpen={isOpen}
            key={selectedOrder?.id}
            order={selectedOrder}
            onClose={() => setIsOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Orders;
