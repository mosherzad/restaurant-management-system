import { jwtPayload } from "@/lib/types";
import { FaShoppingCart } from "react-icons/fa";

type MenuCategoryProps = {
  payload: jwtPayload | null;
  onOpenCart?: () => void;
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
  categories: {
    id: number;
    name: string;
    createdAt: string;
  }[];
};

const MenuCategory = ({
  payload,
  onOpenCart,
  selectedCategory,
  categories,
  onCategoryChange,
}: MenuCategoryProps) => {
  return (
    <div className="flex items-center justify-between w-full  overflow-hidden px-3 py-2 sm:gap-4 md:gap-5 md:px-4 ">
      <div className="no-scrollbar flex gap-2 overflow-x-auto justify-center rounded-lg w-full ">
        <button
          type="button"
          onClick={() => onCategoryChange(null)}
          className={`shrink-0 rounded-full font-semibold transition-all duration-200 bg-[#0F172A] px-3 py-1.5 text-sm text-white hover:bg-[#EC6D13] ${selectedCategory === null ? "bg-[#EC6D13]" : "bg-[#1E293B]"}`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => onCategoryChange(category.id)}
            className={`shrink-0 rounded-full capitalize font-semibold transition-all duration-200 bg-[#0F172A] px-3 py-1.5 text-sm text-white hover:bg-[#EC6D13] ${category.id === selectedCategory ? "bg-[#EC6D13]" : "bg-[#1E293B] hover:bg-[#EC6D13]"}`}
          >
            {category.name}
          </button>
        ))}
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
