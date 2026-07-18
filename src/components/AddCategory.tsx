"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";

const AddCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      return toast.error("Category name is required");
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) throw new Error();

      toast.success("Category added");

      setName("");
    } catch {
      toast.error("Failed to add category");
    }
  };

  return (
    <section className="rounded-2xl w-[50%] border border-white/10 p-6">
      <h2 className="mb-6 text-md lg:text-xl font-semibold text-white">
        Add Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-gray-300">
            Category Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Pizza"
            className="w-full rounded-xl border border-white/10 bg-[#111827] px-4 py-3 text-white outline-none focus:border-orange-400"
          />
        </div>

        <button className="flex w-full items-center text-sm md:text-lg justify-center gap-2 rounded-xl bg-orange-500 py-2 font-semibold text-white transition hover:bg-orange-600">
          <FaPlus />
          Add Category
        </button>
      </form>
    </section>
  );
};

export default AddCategory;
