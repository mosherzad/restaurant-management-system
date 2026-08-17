import { jwtPayload } from "@/lib/types";
import { FaShoppingCart } from "react-icons/fa";

type MenuCategoryProps = {
  payload: jwtPayload | null;
  onOpenCart?: () => void;
};

const MenuCategory = ({ payload, onOpenCart }: MenuCategoryProps) => {
  return (
    <div className="flex items-center w-full bg-[#0F172A] overflow-hidden px-3 py-2 sm:gap-4 md:gap-5 md:px-4 ">
      <div className="no-scrollbar flex gap-2 overflow-x-auto  rounded-lg min-w-0 ">
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>All</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Pizza</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Burger</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Drink</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Appetizers</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Pizza</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Burger</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Drink</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Appetizers</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Pizza</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Burger</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Drink</span>
        </div>
        <div className="flex shrink-0 cursor-pointer items-center space-x-1 rounded-full bg-[#1E293B] px-3 py-1.5 text-sm text-white transition-all duration-300 hover:bg-[#EC6D13] sm:text-base md:text-lg">
          <span>Appetizers</span>
        </div>
      </div>
      {payload && (
        <button
          type="button"
          onClick={onOpenCart}
          className="flex shrink-0 ml-4 items-center text-2xl text-[#EC6D13] transition-opacity hover:opacity-90 lg:hidden"
          aria-label="Open cart"
        >
          <FaShoppingCart />
        </button>
      )}
    </div>
  );
};

export default MenuCategory;
