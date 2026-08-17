"use client";

import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import ConfirmModal from "./ConfirmModalBox";
import { deleteUserById } from "@/api-calls/userApiClientCalls";

interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "STAFF" | "KITCHEN" | "CASHIER";
  active: boolean;
  createdAt: string;
}

interface UserTableProps {
  users: User[];
}

const UserTable = ({ users }: UserTableProps) => {
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const handleDeleteUser = async (userId: number | null) => {
    try {
      if (userId === null) return null;

      await deleteUserById(userId);

      setIsOpenConfirm(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#0F172A]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-175 text-left">
          <thead className="border-b border-slate-700 bg-slate-800/50">
            <tr>
              <th className="px-6 py-4 text-sm font-medium text-slate-300">
                User
              </th>

              <th className="px-6 py-4 text-sm font-medium text-slate-300">
                Role
              </th>

              <th className="px-6 py-4 text-sm font-medium text-slate-300">
                Status
              </th>

              <th className="px-6 py-4 text-sm font-medium text-slate-300">
                Created
              </th>

              <th className="px-6 py-4 text-right text-sm font-medium text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-slate-700/70 last:border-0 hover:bg-slate-800/30"
              >
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-white capitalize">
                      {user.name}
                    </p>

                    <p className="text-sm text-slate-400">{user.email}</p>
                  </div>
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-md bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-200">
                    {user.role}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-2 text-sm ${
                      user.active ? "text-green-400" : "text-slate-400"
                    }`}
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${
                        user.active ? "bg-green-400" : "bg-slate-500"
                      }`}
                    />

                    {user.active ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      //   onClick={() => onEdit(user)}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-700 hover:text-white"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setIsOpenConfirm(true);
                      }}
                      className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 hover:text-red-300"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ConfirmModal
          isOpenConfirm={isOpenConfirm}
          onConfirm={async () => {
            await handleDeleteUser(selectedUserId);

            setSelectedUserId(null);
          }}
          onCancel={() => {
            setIsOpenConfirm(false);
            setSelectedUserId(null);
          }}
        />
      </div>

      {users.length === 0 && (
        <div className="py-12 text-center text-sm text-slate-400">
          No users found.
        </div>
      )}
    </div>
  );
};

export default UserTable;
