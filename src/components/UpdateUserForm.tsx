"use client";

import { useEffect, useState } from "react";
import {
  FaXmark,
  FaFloppyDisk,
  FaUser,
  FaEnvelope,
  FaUserShield,
} from "react-icons/fa6";
import { MdEventAvailable } from "react-icons/md";
import { toast } from "react-toastify";

type User = {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF" | "KITCHEN" | "CASHIER";
  active: boolean;
};

interface UpdateUserFormProps {
  data: User;
  isOpenModal: boolean;
  onClose: () => void;
  onUpdated?: () => void;
}

const UpdateUserForm = ({
  data,
  isOpenModal,
  onClose,
  onUpdated,
}: UpdateUserFormProps) => {
  const [name, setName] = useState(data.name ?? "");
  const [email, setEmail] = useState(data.email ?? "");
  const [role, setRole] = useState<User["role"]>(data.role);
  const [active, setActive] = useState(data.active);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(data.name ?? "");
    setEmail(data.email ?? "");
    setRole(data.role);
    setActive(data.active);
  }, [data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${data.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            role,
          }),
        },
      );

      if (!res.ok) {
        const error = await res.text();
        console.error("Update user error:", error);
        throw new Error("Failed to update user");
      }

      toast.success("User updated successfully");

      onClose();
      onUpdated?.();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 items-center justify-center bg-black/50 p-4 backdrop-blur-sm ${
        isOpenModal ? "flex" : "hidden"
      }`}
    >
      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-[#0F172A] shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EC6D13]/10 text-[#EC6D13] ring-1 ring-[#EC6D13]/10">
              <FaUser size={17} />
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
                Update User
              </h2>

              <p className="mt-0.5 text-sm text-white/50">
                Update user account information
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white/40 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
          >
            <FaXmark size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="space-y-6 overflow-y-auto p-6 sm:p-8">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white/80">
                Full Name
              </label>

              <div className="relative">
                <FaUser
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="User name"
                  required
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-[#EC6D13] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#EC6D13]/10"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white/80">
                Email Address
              </label>

              <div className="relative">
                <FaEnvelope
                  size={14}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  required
                  className="h-12 w-full rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 hover:border-white/15 focus:border-[#EC6D13] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#EC6D13]/10"
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">
                  Role
                </label>

                <div className="relative">
                  <FaUserShield
                    size={14}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as User["role"])}
                    className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition hover:border-white/15 focus:border-[#EC6D13] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#EC6D13]/10"
                    required
                  >
                    <option value="ADMIN" className="bg-[#0F172A] text-white">
                      Admin
                    </option>

                    <option value="STAFF" className="bg-[#0F172A] text-white">
                      Staff
                    </option>

                    <option value="KITCHEN" className="bg-[#0F172A] text-white">
                      Kitchen
                    </option>

                    <option value="CASHIER" className="bg-[#0F172A] text-white">
                      Cashier
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white/80">
                  Status
                </label>

                <div className="relative">
                  <MdEventAvailable
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"
                  />

                  <select
                    value={String(active)}
                    onChange={(e) => setActive(e.target.value === "true")}
                    className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 pl-11 pr-4 text-sm text-white outline-none transition hover:border-white/15 focus:border-[#EC6D13] focus:bg-white/[0.07] focus:ring-4 focus:ring-[#EC6D13]/10"
                  >
                    <option value="true" className="bg-[#0F172A] text-white">
                      Active
                    </option>

                    <option value="false" className="bg-[#0F172A] text-white">
                      Inactive
                    </option>
                  </select>
                </div>
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

              {loading ? "Updating..." : "Update User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserForm;
