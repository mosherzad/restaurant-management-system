"use client";

import Image from "next/image";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { UploadDropzone } from "@/lib/uploadthing";

type Category = {
  id: number;
  name: string;
};

type AddMealProps = {
  categories: Category[];
};

const AddMeal = ({ categories }: AddMealProps) => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImage] = useState("");
  const [categoryId, setCategoryId] = useState(Number);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl) {
      return toast.error("Please upload an image");
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
          image: imageUrl,
          categoryId: Number(categoryId),
        }),
      });

      if (!res.ok) {
        return toast.error("Failed to add meal");
      }

      toast.success("Meal added");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <section className="rounded-2xl border border-white/10 w-[50%] p-6">
      <h2 className=" text-md lg:text-xl font-semibold text-white">Add Meal</h2>
      <span className="mb-6 text-sm text-gray-400">Add new menu item</span>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="mt-4">
          <label
            htmlFor="name"
            id="name"
            className="text-white font-semibold text-sm"
          >
            Meal Name
          </label>
          <input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Meal name"
            className="w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white outline-none focus:border-orange-400"
          />
        </div>
        <div>
          <label
            htmlFor="price"
            id="price"
            className="text-white font-semibold text-sm"
          >
            Price
          </label>
          <input
            name="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white outline-none focus:border-orange-400"
          />
        </div>

        <div className="flex">
          <UploadDropzone
            endpoint="imageUploader"
            appearance={{
              container:
                "w-full border border-white/10 bg-[#111827] rounded-xl py-2",
              label: "text-gray-300",
              uploadIcon: "h-8",
              allowedContent: "text-gray-500",
              button:
                "bg-orange-500 hover:bg-orange-600 text-white ut-readying:bg-orange-500 px-2 text-sm font-semibold",
            }}
            onClientUploadComplete={(res) => {
              setImage(res[0].url);
              toast.success("Image uploaded");
            }}
            onUploadError={(error) => {
              toast.error(error.message);
            }}
          />
        </div>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt="Preview"
            width={160}
            height={160}
            className="rounded-lg object-cover"
          />
        )}

        <div>
          <label
            htmlFor="category"
            id="category"
            className="text-white font-semibold text-sm"
          >
            Category
          </label>
          <select
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full rounded-xl border border-white/10 bg-[#111827] p-3 text-white outline-none focus:border-orange-400"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button className="flex w-full items-center text-sm md:text-lg justify-center gap-2 rounded-xl bg-orange-500 py-3 font-semibold text-white transition hover:bg-orange-600">
          <FaPlus />
          Add Meal
        </button>
      </form>
    </section>
  );
};

export default AddMeal;
