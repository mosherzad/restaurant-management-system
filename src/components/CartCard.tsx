import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from "@/features/cart/cartSlice";
import Image from "next/image";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

interface Meal {
  menuItemId: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface MealProps {
  data: Meal;
}
const CartCard = ({ data }: MealProps) => {
  const dispatch = useDispatch();
  return (
    <div className="flex min-h-20 w-full items-stretch justify-between gap-2 rounded-lg border border-gray-700 bg-[#141d2d] p-2 sm:items-center sm:justify-around sm:p-0">
      <div className="flex min-w-0 flex-1 items-center space-x-2">
        <div className="relative p-10 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md sm:h-full sm:w-20 sm:rounded-none">
          <Image
            src={data.image}
            fill
            alt={data.name}
            className="object-cover"
          />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="truncate text-sm font-semibold text-white sm:text-base">
            {data.name}
          </h2>
          <span className="text-sm text-gray-500 sm:text-base">
            ${Number(data.price).toFixed(0)}
          </span>
          <div className="mt-1 flex w-[min(100px,100%)] items-center justify-between rounded-lg bg-[#1E293B] px-2">
            <button
              type="button"
              onClick={() => dispatch(decreaseQuantity(data.menuItemId))}
              className="text-white ml-1 text-lg cursor-pointer"
            >
              -
            </button>
            <span className="text-white ml-1 font-bold text-lg">
              {data.quantity}
            </span>
            <button
              type="button"
              onClick={() => dispatch(increaseQuantity(data.menuItemId))}
              className="text-white ml-1 text-lg cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div className="flex shrink-0 flex-col items-end justify-center gap-2 sm:m-3">
        <span className="font-bold text-white">
          ${Number(data.quantity * data.price).toFixed(0)}
        </span>
        <FaTrashAlt
          type="button"
          onClick={() => dispatch(removeFromCart(data.menuItemId))}
          className="text-gray-600 cursor-pointer"
          size={23}
        />
      </div>
    </div>
  );
};

export default CartCard;
