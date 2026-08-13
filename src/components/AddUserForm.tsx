"use client";

import { FormEvent, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaUserShield } from "react-icons/fa6";
import { MdPersonAdd } from "react-icons/md";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const roles = [
  {
    value: "STAFF",
    label: "Staff",
    description: "General restaurant staff",
  },
  {
    value: "KITCHEN",
    label: "Kitchen",
    description: "Manages kitchen orders",
  },
  {
    value: "CASHIER",
    label: "Cashier",
    description: "Handles payments",
  },
  {
    value: "ADMIN",
    label: "Administrator",
    description: "Full system access",
  },
];

const AddUserForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "STAFF",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Failed to create user");
        return;
      }

      toast.success("User created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "STAFF",
      });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0F172A] shadow-2xl shadow-black/20">
      <div className="h-px w-full bg-linear-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="grid lg:grid-cols-[1fr_320px]">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10">
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white">
              Account Information
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Enter the user&apos;s personal and login information.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-white/75"
              >
                Full Name
              </label>

              <div className="relative">
                <FaUser
                  size={15}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-white/30"
                />

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="h-13 w-full rounded-xl border border-white/10 bg-black/15 pr-4 pl-11 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-500/50 focus:bg-black/20 focus:ring-4 focus:ring-amber-500/5"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-white/75"
              >
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope
                  size={15}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-white/30"
                />

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@restaurant.com"
                  required
                  className="h-13 w-full rounded-xl border border-white/10 bg-black/15 pr-4 pl-11 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-500/50 focus:bg-black/20 focus:ring-4 focus:ring-amber-500/5"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-white/75"
              >
                Password
              </label>

              <div className="relative">
                <FaLock
                  size={15}
                  className="absolute top-1/2 left-4 -translate-y-1/2 text-white/30"
                />

                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a secure password"
                  required
                  minLength={6}
                  className="h-13 w-full rounded-xl border border-white/10 bg-black/15 pr-4 pl-11 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-500/50 focus:bg-black/20 focus:ring-4 focus:ring-amber-500/5"
                />
              </div>

              <p className="mt-2 text-xs text-white/30">
                Use at least 8 characters.
              </p>
            </div>

            <div>
              <label
                htmlFor="role"
                className="mb-2 block text-sm font-medium text-white/75"
              >
                User Role
              </label>

              <div className="relative">
                <FaUserShield
                  size={15}
                  className="absolute top-1/2 left-4 z-10 -translate-y-1/2 text-white/30"
                />

                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="h-13 w-full appearance-none rounded-xl border border-white/10 bg-black/15 pr-4 pl-11 text-sm text-white outline-none transition focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/5"
                >
                  {roles.map((role) => (
                    <option
                      key={role.value}
                      value={role.value}
                      className="bg-[#2b2019]"
                    >
                      {role.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => router.back()}
              className="h-12 rounded-xl border border-white/10 px-6 text-sm font-medium text-white/60 transition hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#EC6D13] px-7 text-md font-semibold text-[#221810] shadow-lg shadow-amber-500/10 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <MdPersonAdd size={19} />

              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>

        <div className="hidden lg:block border-t border-white/10 bg-black/10 p-6 sm:p-8 lg:border-t-0 lg:border-l">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10">
              <FaUserShield className="text-[#EC6D13]" size={17} />
            </div>

            <div>
              <h3 className="text-sm font-semibold text-white">
                Role Permissions
              </h3>

              <p className="text-xs text-white/35">Access level overview</p>
            </div>
          </div>

          <div className="space-y-2">
            {roles.map((role) => {
              const active = formData.role === role.value;

              return (
                <button
                  type="button"
                  key={role.value}
                  onClick={() =>
                    setFormData({
                      ...formData,
                      role: role.value,
                    })
                  }
                  className={`w-full rounded-xl border p-4 text-left transition ${
                    active
                      ? "border-amber-500/30 bg-amber-500/10"
                      : "border-white/5 bg-white/3 hover:border-white/10 hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-medium ${
                        active ? "text-[#EC6D13]" : "text-white/70"
                      }`}
                    >
                      {role.label}
                    </span>

                    {active && (
                      <span className="h-2 w-2 rounded-full bg-[#EC6D13] shadow-[0_0_10px_rgba(245,158,11,0.8)]" />
                    )}
                  </div>

                  <p className="mt-1 text-xs text-white/30">
                    {role.description}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl border border-amber-500/10 bg-amber-500/5 p-4">
            <p className="text-xs leading-5 text-white/40">
              The selected role determines which parts of the restaurant
              management system this user can access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserForm;
