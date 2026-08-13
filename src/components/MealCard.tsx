"use client";

import { addToCart } from "@/features/cart/cartSlice";
import Image from "next/image";
import { MdAdd } from "react-icons/md";
import { useDispatch } from "react-redux";

interface Meal {
  name: string;
  description: string;
  category: {
    id: number;
    name: string;
    createdAt: string;
  };
  price: number;
  image: string;
  quantity: number;
}

interface MealProps {
  data: Meal;
  isLCP?: boolean;
  isAuth: boolean;
}
const MealCard = ({ data, isLCP, isAuth }: MealProps) => {
  // const items = useSelector((state: RootState) => state.cart.cartItems);
  // console.log(items);
  const dispatch = useDispatch();
  return (
    <div className="flex w-full min-w-0 max-w-110 flex-col rounded-lg border border-gray-700 bg-[#0F172A] transition-all duration-200">
      <div className="relative flex h-52 w-full min-w-0 items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={data.image}
          fill
          alt={data.name}
          preload={isLCP}
          fetchPriority={isLCP ? "high" : "auto"}
          className="hover:scale-105 transition-all duration-300 rounded-t-lg object-cover"
        />
      </div>
      <div className="min-w-0 p-2">
        <p className="mt-1 wrap-break-word text-[18px] font-semibold text-white">
          {data.name}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-extrabold text-[#EC6D13]">
            ${Number(data.price).toFixed(0)}
          </span>
          <span className="shrink-0 font-bold text-[#EC6D13]">
            {data.category.name}
          </span>
        </div>
        {isAuth && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => dispatch(addToCart(data))}
              type="button"
              className="flex items-center justify-center space-x-1 cursor-pointer rounded-md bg-[#EC6D13] px-3 py-1 font-bold text-white"
            >
              <MdAdd size={25} />
              <span>Add</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCard;
