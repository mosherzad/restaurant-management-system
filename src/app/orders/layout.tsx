import OrdersPageLinks from "@/components/OrdersPageLinks";
import React from "react";
import { FaBasketShopping } from "react-icons/fa6";

const OrdersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <FaBasketShopping
          size={24}
          className="shrink-0 text-[#EC6D13] sm:h-6.25 sm:w-6.25"
        />
        <h1 className="min-w-0 text-lg font-bold text-white sm:text-xl">
          Orders Management
        </h1>
      </div>
      <OrdersPageLinks />
      <main>{children}</main>
    </div>
  );
};

export default OrdersLayout;
