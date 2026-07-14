"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type OrderLinks = {
  path: string;
  label: string;
};

const OrdersPageLinks = () => {
  const pathname = usePathname();
  const links: OrderLinks[] = [
    { path: "/orders/pending", label: "Pending" },
    { path: "/orders/preparing", label: "Preparing" },
    { path: "/orders/ready", label: "Ready" },
    { path: "/orders/delivered", label: "Delivered" },
  ];
  return (
    <div className="my-4 flex flex-wrap items-center gap-3 overflow-x-auto pb-1 sm:my-5 sm:gap-4 md:gap-5 no-scrollbar">
      {links.map((link) => {
        const isActive =
          pathname === link.path ||
          pathname.startsWith(`${link.path}/`);
        return (
        <Link
          href={link.path}
          key={link.path}
          className={`whitespace-nowrap text-base transition-all duration-200 hover:text-[#EC6D13] sm:text-lg ${
            isActive
              ? "text-[#EC6D13] font-semibold border-b-2 border-[#EC6D13] pb-0.5"
              : "text-white"
          }`}
        >
          {link.label}
        </Link>
        );
      })}
    </div>
  );
};

export default OrdersPageLinks;
