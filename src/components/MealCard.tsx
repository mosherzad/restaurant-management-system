"use client";

import { addToCart } from "@/features/cart/cartSlice";
import { jwtPayload } from "@/lib/types";
import Image from "next/image";
import { useState } from "react";
import { MdAdd, MdDelete, MdEdit } from "react-icons/md";
import { useDispatch } from "react-redux";
import UpdateMenuForm from "./UpdateMenuForm";
import { toast } from "react-toastify";
import ConfirmModal from "./ConfirmModalBox";

interface Meal {
  id: number;
  name: string;
  description: string;
  available: boolean;
  categoryId: number;
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
  payload: jwtPayload | null;
}
const MealCard = ({ data, isLCP, payload }: MealProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteItem = async (menuId: number) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/${menuId}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok) throw new Error("failed to delete item");

      toast.success("Item deleted");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex w-full min-w-0 max-w-110 flex-col rounded-lg border border-gray-700 bg-[#0F172A] transition-all duration-200">
      <div className="relative flex h-52 w-full min-w-0 items-center justify-center overflow-hidden rounded-lg">
        <Image
          src={data.image}
          fill
          alt={data.name}
          preload={isLCP}
          fetchPriority={isLCP ? "high" : "auto"}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 463px"
          className="hover:scale-105 transition-all duration-300 rounded-t-lg object-cover"
        />
      </div>
      <div className="min-w-0 p-2">
        <p className="mt-1 wrap-break-word text-[18px] font-semibold text-white line-clamp-1">
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
        {payload && (
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

        {payload?.role === "ADMIN" && (
          <div>
            <div className="flex justify-start text-[#EC6D13]">
              <MdEdit
                onClick={() => setIsOpenModal(true)}
                size={25}
                className="hover:bg-[#EC6D13] hover:text-white duration-350 transition-all rounded"
              />
              <MdDelete
                onClick={() => setIsOpenConfirm(true)}
                size={25}
                className="hover:bg-[#EC6D13] hover:text-white duration-350 transition-all rounded"
              />
            </div>
            <UpdateMenuForm
              isOpenModal={isOpenModal}
              data={data}
              onClose={() => setIsOpenModal(false)}
            />
            <ConfirmModal
              isOpenConfirm={isOpenConfirm}
              onConfirm={() => handleDeleteItem(data.id)}
              onCancel={() => setIsOpenConfirm(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default MealCard;
