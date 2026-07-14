"use client";

import { addToCart } from "@/features/cart/cartSlice";
import { RootState } from "@/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

interface Meal {
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

interface MealProps {
  data: Meal;
}
const MealCard = ({ data }: MealProps) => {
  const items = useSelector((state: RootState) => state.cart.cartItems);
  // console.log(items);
  const dispatch = useDispatch();
  return (
    <div className="flex w-full min-w-0 max-w-110 flex-col rounded-lg border border-gray-700 bg-[#0F172A] transition-all duration-200">
      <div className="relative flex h-52 w-full min-w-0 items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={data.image}
          fill
          alt="meal-image"
          className="hover:scale-105 transition-all duration-300 rounded-t-lg object-cover"
        />
      </div>
      <div className="min-w-0 p-2">
        <p className="mt-1 wrap-break-word text-[18px] font-semibold text-white">
          {data.name}
        </p>
        <p className="mt-1 wrap-break-word text-sm font-semibold text-gray-500">
          {data.description}
        </p>
        <div className="flex items-center justify-between gap-2">
          <span className="font-extrabold text-[#EC6D13]">
            ${Number(data.price).toFixed(0)}
          </span>
          <span className="shrink-0 font-bold text-[#EC6D13]">
            {data.category}
          </span>
        </div>
        <div className="mt-3 flex justify-end">
          <button
            onClick={() => dispatch(addToCart(data))}
            type="button"
            className="cursor-pointer rounded-lg bg-[#EC6D13] px-4 py-2 font-bold text-white"
          >
            Add to dish
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
