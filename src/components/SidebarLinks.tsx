"use client";
import Link from "next/link";
import { IconType } from "react-icons";
import { MdDashboard, MdFastfood, MdFoodBank, MdLogout } from "react-icons/md";
import { usePathname } from "next/navigation";
import { FaBasketShopping, FaKitchenSet } from "react-icons/fa6";
import LogoutBtn from "./LogoutBtn";

type LinkItem = {
  label: string;
  path: string;
  icon: IconType;
};

const SidebarLinks = () => {
  const pathname = usePathname();
  const navLinks: LinkItem[] = [
    {
      path: "/",
      label: "menu",
      icon: MdFastfood,
    },
    {
      path: "/orders",
      label: "orders",
      icon: FaBasketShopping,
    },
    {
      path: "/kitchen",
      label: "kitchen",
      icon: FaKitchenSet,
    },
    {
      path: "/dashboard",
      label: "dashboard",
      icon: MdDashboard,
    },
  ];
  return (
    <>
      <div className="mb-0 py-4 hidden cursor-pointer items-center space-x-1 text-xl font-bold text-white md:mb-10 md:flex relative">
        <MdFoodBank className="text-[#EC6D13]" size={30} />
        Fair<span className="text-[#EC6D13]">Plate</span>
        <div className="absolute -bottom-1 left-10 h-1 w-10 bg-[#EC6D13]"></div>
      </div>
      <nav className="flex w-full flex-1 flex-row items-stretch justify-around gap-1 px-1 md:flex-col md:justify-start md:gap-7 md:px-0">
        {navLinks.map((link, index) => {
          const active =
            link.path === "/"
              ? pathname === "/"
              : pathname === link.path || pathname.startsWith(`${link.path}/`);
          return (
            <Link
              key={index}
              href={link.path}
              className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border-none px-2 py-2 text-[11px] font-bold text-white outline-none transition-all duration-300 hover:bg-[#EC6D13] sm:text-xs md:flex-initial md:flex-row md:gap-0 md:space-x-2 md:px-3 md:text-base ${
                active ? "bg-[#EC6D13] text-white" : ""
              }`}
            >
              <link.icon className="h-5 w-5 shrink-0 md:h-5 md:w-5" />
              <span className="max-w-18 truncate capitalize md:max-w-none">
                {link.label}
              </span>
            </Link>
          );
        })}

        <LogoutBtn />
      </nav>
    </>
  );
};

export default SidebarLinks;
