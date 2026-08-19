import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { cookies } from "next/headers";
import { verifyTokenFromToken } from "@/lib/jwt/verifyToken";

export default async function DashboardHeader() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;

  if (!token) return null;
  const payload = verifyTokenFromToken(token);

  if (!payload) return null;
  return (
    <header className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between bg-[#0F172A] mb-3 p-5">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <p className="mt-1 text-sm text-slate-400">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>

        <p className="mt-2 text-xs text-slate-500">{today}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between lg:gap-4">
        <div className="flex items-center gap-3  rounded-xl border border-white/10 bg-white/5 px-4 py-2">
          <FaUserCircle size={42} className="text-orange-400" />

          <div>
            <h3 className="text-sm font-semibold text-white">Admin</h3>

            <p className="text-xs text-slate-400 capitalize">{payload.name}</p>
          </div>
        </div>
        <Link
          href={"/dashboard/add-user"}
          className="text-white bg-[#EC6D13] rounded-xl px-3 py-1 font-semibold"
        >
          Add user
        </Link>
      </div>
    </header>
  );
}
