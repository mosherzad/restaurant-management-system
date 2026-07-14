"use client";

import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { FaTimes } from "react-icons/fa";
import { RootState } from "@/store";
import { TbTrash } from "react-icons/tb";
import { clearCart } from "@/features/cart/cartSlice";
import { API_URL } from "@/lib/constants";
import { useState } from "react";
import { toast } from "react-toastify";

function CartInner({ onCloseMobile }: { onCloseMobile?: () => void }) {
  const items = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const [tableNumber, setTableNumber] = useState<number | 0>(0);
  const [note, setNote] = useState("");
  console.log(items);

  const handleSendOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!tableNumber) return toast.error("Please select table number");
    try {
      const response = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tableNumber,
          note,
          items,
        }),
      });

      if (!response.ok) throw new Error("failed to send data");

      toast.success("Order was send to kitchen");
      const data = await response.json();

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
          <h1 className="truncate text-lg font-bold text-white md:text-xl">
            Current Orders
          </h1>
        </div>
        <input
          type="number"
          required
          value={tableNumber}
          onChange={(e) => setTableNumber(Number(e.target.value))}
          placeholder="Table number"
          className="rounded-md bg-[#ff6d04]/50 px-3 py-1 text-sm text-white md:px-5 w-32 outline-none"
        />
      </div>
      <hr className="my-4 text-gray-700 md:my-5" />
      <div className="flex flex-col gap-4 md:gap-5 h-120 overflow-auto">
        {items.map((item) => (
          <CartCard key={item.menuItemId} data={item} />
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
          <TbTrash size={20} />
        </button>
      </div>
      <div className="flex flex-col mt-4">
        <textarea
          name="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="No Onion"
          className="bg-[#1E293B] resize-none text-gray-500 px-4 py-2 outline-0"
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
}

type RightbarProps = {
  mobileOpen: boolean;
  onMobileClose: () => void;
};

const Rightbar = ({ mobileOpen, onMobileClose }: RightbarProps) => {
  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!mobileOpen}
        onClick={onMobileClose}
      />
      <aside
        className={`fixed top-0 right-0 z-50 flex h-full max-h-screen w-[min(360px,100vw)] flex-col overflow-y-auto overscroll-contain border-l border-white/10 bg-[#141d2d] p-5 shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen
            ? "pointer-events-auto translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <CartInner onCloseMobile={onMobileClose} />
      </aside>

      <aside className="hidden lg:flex lg:fixed lg:top-0 lg:right-0 lg:z-30 lg:h-screen lg:w-90 lg:max-w-[100vw] lg:flex-col lg:overflow-y-auto lg:overscroll-contain lg:border-l lg:border-white/10 lg:bg-[#141d2d] lg:p-5 lg:shadow-2xl">
        <CartInner />
      </aside>
    </>
  );
};

export default Rightbar;
