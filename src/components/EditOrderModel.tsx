import { Order } from "@/lib/types/menu";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";

interface EditOrderModeProp {
  isOpen: boolean;
  order: Order;
  onClose: () => void;
}

const EditOrderModel = ({ isOpen, order, onClose }: EditOrderModeProp) => {
  const [formData, setFormData] = useState({
    tableNumber: String(order.tableNumber),
    note: order.note ?? "",
    items: order.items.map((item) => ({
      menuItemId: item.menuItemId,
      quantity: item.quantity,
      menuItem: {
        name: item.menuItem.name,
        price: item.menuItem.price,
        image: item.menuItem.image,
      },
    })),
  });

  const router = useRouter();

  const handleUpdateOrder = async (
    e: React.MouseEvent<HTMLButtonElement>,
    orderId: number,
  ) => {
    e.preventDefault();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            ...formData,
            tableNumber: Number(formData.tableNumber),
          }),
        },
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to update order");
      }
      await res.json();

      toast.success("The order updated successfully");

      router.refresh();

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncreaseItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemMenuId: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((currentItem) =>
        currentItem.menuItemId === itemMenuId
          ? {
              ...currentItem,
              quantity: currentItem.quantity + 1,
            }
          : currentItem,
      ),
    }));
  };

  const handleDecreaseItem = (
    e: React.MouseEvent<HTMLButtonElement>,
    itemMenuId: number,
  ) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((currentItem) =>
        currentItem.menuItemId === itemMenuId
          ? {
              ...currentItem,
              quantity: Math.max(1, currentItem.quantity - 1),
            }
          : currentItem,
      ),
    }));
  };

  console.log(order);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0F172A] shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <div>
            <h2 className="text-xl font-semibold text-white">Edit Order</h2>
            <p className="mt-1 text-sm text-slate-400">
              Update order details and menu items
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-white"
          >
            <MdClose size={22} />
          </button>
        </div>

        <form className="max-h-[70vh] overflow-y-auto px-6 py-6">
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
                Order Information
              </h3>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="table-number"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Table Number
                  </label>

                  <input
                    id="table-number"
                    type="number"
                    value={formData?.tableNumber ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        tableNumber: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none transition placeholder:text-slate-500 focus:border-[#EC6D13] focus:ring-1 focus:ring-[#EC6D13]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="note"
                    className="mb-2 block text-sm font-medium text-slate-200"
                  >
                    Note
                  </label>

                  <textarea
                    name="note"
                    id="note"
                    rows={3}
                    value={formData?.note ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        note: e.target.value,
                      })
                    }
                    placeholder="Add a note for this order..."
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-[#EC6D13] focus:ring-1 focus:ring-[#EC6D13]"
                  />
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                    Menu Items
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    Adjust quantities or remove items
                  </p>
                </div>

                <span className="rounded-full bg-[#EC6D13]/10 px-3 py-1 text-xs font-medium text-[#EC6D13]">
                  {formData.items.length} items
                </span>
              </div>

              <div className="space-y-2">
                {formData?.items?.map((item) => (
                  <div
                    key={item.menuItemId}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/3 p-4 transition hover:border-white/20 hover:bg-white/5"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-white/5">
                        <Image
                          src={"/"}
                          alt={item.menuItem.name}
                          className="object-cover"
                          fill
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-medium text-white">
                          {item.menuItem.name}
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          ${item.menuItem.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="ml-4 flex items-center gap-2">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                        onClick={(e) => handleDecreaseItem(e, item.menuItemId)}
                      >
                        −
                      </button>

                      <span className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-white/10 px-2 text-sm font-semibold text-white">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EC6D13] text-white transition hover:bg-[#d85f0c]"
                        onClick={(e) => handleIncreaseItem(e, item.menuItemId)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-dashed border-white/15 bg-white/2 py-3 text-sm font-medium text-slate-400 transition hover:border-[#EC6D13]/50 hover:bg-[#EC6D13]/5 hover:text-[#EC6D13]"
              >
                + Add Menu Item
              </button>
            </div>
          </div>
        </form>

        <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-black/10 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={(e) => handleUpdateOrder(e, order.id)}
            className="rounded-lg bg-[#EC6D13] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#EC6D13]/20 transition hover:bg-[#d85f0c] hover:shadow-[#EC6D13]/30"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModel;
