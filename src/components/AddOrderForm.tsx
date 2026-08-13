import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CartCard from "./CartCard";
import { TbTrashFilled } from "react-icons/tb";
import { RootState } from "@/store";
import { clearCart } from "@/features/cart/cartSlice";

const AddOrderForm = ({ onCloseMobile }: { onCloseMobile?: () => void }) => {
  const items = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();

  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const [tableNumber, setTableNumber] = useState(0);
  const [note, setNote] = useState("");
  console.log(items);

  const handleSendOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tableNumber) return toast.error("Please select table number");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber,
          note,
          items: items.map((item) => ({
            menuItemId: item.id,
            quantity: item.quantity,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Order API error:", data);
        throw new Error(data.message || "Failed to send order");
      }

      toast.success("Order was send to kitchen");
      dispatch(clearCart());
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form onSubmit={handleSendOrder} className="flex h-full flex-col">
      <div className="flex shrink-0 flex-wrap items-center justify-between gap-2">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {onCloseMobile ? (
            <button
              type="button"
              onClick={onCloseMobile}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
              aria-label="Close cart"
            >
              <FaTimes className="text-xl" />
            </button>
          ) : null}
          <h1 className="truncate text-sm lg:text-lg md:text-md font-bold text-white md:text-xl">
            Current Orders
          </h1>
        </div>
      </div>
      <hr className="my-4 text-gray-700 md:my-5" />
      <div className="flex flex-col gap-4 md:gap-5 h-120 overflow-auto">
        {items.map((item) => (
          <CartCard key={item.id} data={item} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <h1 className="text-white font-light mt-4">
          Total <span className="font-bold">${Number(total).toFixed(0)}</span>
        </h1>
        <button
          type="button"
          onClick={() => dispatch(clearCart())}
          className="text-white px-2 mx-1 py-1 hover:bg-[#EC6D13] rounded-lg flex items-center space-x-1 transition-all duration-200"
        >
          <TbTrashFilled size={20} />
        </button>
      </div>
      <div className="flex flex-col mt-4">
        <label htmlFor="table-number" className="text-white">
          Table Number
        </label>
        <input
          type="number"
          required
          value={tableNumber}
          onChange={(e) => setTableNumber(Number(e.target.value))}
          placeholder="Table number"
          className="rounded-sm bg-[#313c4d] px-3 py-1 my-1 text-sm text-gray-100 md:px-5 w-32 outline-none"
        />
        <textarea
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="No Onion"
          className="bg-[#273141] resize-none text-gray-100 px-4 py-2 outline-0"
        ></textarea>
        <button
          type="submit"
          className="bg-[#EC6D13] px-4 py-2 text-white rounded-lg font-bold"
        >
          Send to kitchen
        </button>
      </div>
    </form>
  );
};

export default AddOrderForm;
