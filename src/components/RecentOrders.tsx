import { getAllOrders } from "@/api-calls/orderApiCall";
import Link from "next/link";
import { MdListAlt } from "react-icons/md";

type Orders = {
  id: number;
  tableNumber: number;
  status: string;
  total: number;
  createdAt: string;
};
const RecentOrders = async () => {
  const { orders } = await getAllOrders();

  function getTimeAgo(date: string) {
    const createdAt = new Date(date);
    const now = new Date();

    const diffInMinutes = Math.floor(
      (now.getTime() - createdAt.getTime()) / (1000 * 60),
    );

    if (diffInMinutes < 60) {
      return `${diffInMinutes} mins ago`;
    }

    const hours = Math.floor(diffInMinutes / 60);

    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  }
  return (
    <section className="bg-[#0F172A] p-5 w-full border border-white/10 rounded-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-white font-semibold text-lg">Recent Orders</h1>
        <Link href={"/orders"} className="text-white">
          View All{" "}
        </Link>
      </div>
      <hr className="text-gray-700 my-3" />
      <div className="flex flex-col gap-3">
        {orders.slice(0, 6).map((order: Orders) => {
          return (
            <div key={order.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <MdListAlt
                    size={35}
                    className="text-gray-300 bg-[#33456f] rounded-xl text-xl p-1"
                  />
                  <div className="flex flex-col">
                    <h1 className="text-white text-sm lg:text-md">
                      #ORD-{order.id}
                    </h1>
                    <span className="text-gray-300 text-sm">
                      Table {order.tableNumber}
                    </span>
                  </div>
                </div>
                <span
                  className={`text-sm lg:text-md px-2 rounded-md ${order.status === "READY" ? "text-green-300 bg-green-800" : order.status === "PENDING" ? "text-red-300 bg-red-800" : order.status === "COOKING" ? "text-yellow-300 bg-yellow-800" : "text-blue-300 bg-blue-800"}`}
                >
                  {order.status}
                </span>
                <span className="text-gray-300 text-sm lg:text-md">
                  {getTimeAgo(order.createdAt)}
                </span>
                <span className="text-gray-300 text-sm lg:text-md">
                  ${order.total}
                </span>
              </div>
              <hr className="text-gray-700 my-1" />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default RecentOrders;
