"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaXmark,
  FaFloppyDisk,
  FaUtensils,
  FaTag,
  FaDollarSign,
} from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type MenuItem = {
  id: number;
  name: string;
  price: number;
  image: string;
  available: boolean;
  category: {
    id: number;
    name: string;
    createdAt: string;
  };
  categoryId: number;
};

interface UpdateMenuProp {
  data: MenuItem;
  isOpenModal: boolean;
  onClose: () => void;
}

type Category = {
  id: number;
  name: string;
};

const UpdateMenuForm = ({ data, isOpenModal, onClose }: UpdateMenuProp) => {
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [categoryId, setCategoryId] = useState(data.categoryId);
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState(data.image);
  const [availability, setAvailability] = useState<boolean>(data.available);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  console.log(data);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`);

        if (!res.ok) {
          const error = await res.text();
          console.error("fetch category error", error);
        }
        const data = await res.json();

        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/menu/${data.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            price,
            categoryId,
            image,
            available: availability,
          }),
        },
      );

      if (!res.ok) {
        const error = await res.text();
        console.error("Update meal error", error);
        console.error("Status", res.status);

        throw new Error("failed to update meal");
      }

      toast.success("The item updated successfully");
      onClose();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm ${isOpenModal ? "flex" : "hidden"}`}
    >
      <div className="flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-[#0F172A] shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EC6D13]/10 text-[#EC6D13] ring-1 ring-[#EC6D13]/10">
              <FaUtensils size={17} />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Update Menu Item
              </h2>

              <p className="mt-0.5 text-sm text-white/50">
                Update your menu item information
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white"
          >
            <FaXmark onClick={onClose} size={18} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
        >
          <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-[1fr_300px]">
            <div className="space-y-6 p-6 sm:p-8">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">
                  Item Name
                </label>

                <div className="relative">
                  <FaUtensils
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Margherita Pizza"
                    className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-[#EC6D13] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#EC6D13]/10"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">
                    Category
                  </label>

                  <div className="relative">
                    <FaTag
                      size={14}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    />

                    <select
                      value={categoryId}
                      onChange={(e) => setCategoryId(Number(e.target.value))}
                      className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition hover:border-white/15 focus:border-[#EC6D13] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#EC6D13]/10"
                      required
                    >
                      <option className="bg-[#0F172A] text-white">
                        Select category
                      </option>

                      {categories.map((category) => (
                        <option
                          key={category.id}
                          value={category.id}
                          className="bg-[#0F172A] text-white"
                        >
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">
                    Price
                  </label>

                  <div className="relative">
                    <FaDollarSign
                      size={14}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    />

                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition hover:border-white/15 focus:border-[#EC6D13] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#EC6D13]/10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-white/80">
                    Availability
                  </label>

                  <div className="relative">
                    <MdEventAvailable
                      size={14}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                    />

                    <select
                      name="availability"
                      onChange={(e) =>
                        setAvailability(e.target.value === "true")
                      }
                      value={String(availability)}
                      className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition hover:border-white/15 focus:border-[#EC6D13] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#EC6D13]/10"
                    >
                      <option className="bg-[#0F172A] text-white">
                        Select availability
                      </option>

                      <option value="true" className="bg-[#0F172A]">
                        Yes
                      </option>
                      <option value="false" className="bg-[#0F172A]">
                        No
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-semibold text-white/80">
                  Meal Image
                </label>

                {image && (
                  <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <Image
                      src={image}
                      alt={name || "Menu item"}
                      fill
                      sizes="500px"
                      className="object-cover"
                    />

                    <div className="absolute bottom-3 left-3 rounded-lg bg-[#0F172A]/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
                      Current Image
                    </div>
                  </div>
                )}

                <UploadDropzone
                  endpoint="imageUploader"
                  appearance={{
                    container:
                      "w-full rounded-xl border border-white/10 bg-white/5 py-4 transition hover:border-white/15",
                    label: "text-white/70",
                    uploadIcon: "h-8 text-white/30",
                    allowedContent: "text-white/30",
                    button:
                      "bg-[#EC6D13] hover:bg-[#EC6D13]/90 text-white px-4 py-2 text-sm font-semibold",
                  }}
                  onClientUploadComplete={(res) => {
                    setImage(res[0].url);
                    toast.success("New image uploaded");
                  }}
                  onUploadError={(error) => {
                    toast.error(error.message);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/10 bg-[#0F172A] px-6 py-4 sm:flex-row sm:justify-end sm:px-8">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="h-11 rounded-xl border border-white/10 px-6 text-sm font-semibold text-white/60 transition hover:border-white/20 hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#EC6D13] px-7 text-sm font-semibold text-white shadow-lg shadow-[#EC6D13]/20 transition hover:bg-[#EC6D13]/90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaFloppyDisk size={14} />

              {loading ? "Updating..." : "Update Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenuForm;
