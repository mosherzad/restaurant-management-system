import { FaShoppingCart } from "react-icons/fa";

type MenuCategoryProps = {
  onOpenCart?: () => void;
};

const MenuCategory = ({ onOpenCart }: MenuCategoryProps) => {
  return (
    <div className="flex items-center justify-between max-w-[900px]  bg-[#0F172A] overflow-hidden px-3 py-2 sm:justify-center sm:gap-4 md:gap-5 md:px-4 md:justify-start">
      <div className="no-scrollbar flex items-center justify-center gap-2 overflow-x-auto  rounded-lg w-full ">
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
      </div>
      <button
        type="button"
        onClick={onOpenCart}
        className="flex shrink-0 ml-4 items-center text-3xl text-[#EC6D13] transition-opacity hover:opacity-90 lg:hidden"
        aria-label="Open cart"
      >
        <FaShoppingCart />
      </button>
    </div>
  );
};

export default MenuCategory;
