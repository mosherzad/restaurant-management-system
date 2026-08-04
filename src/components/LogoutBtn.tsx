"use client";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
const LogoutBtn = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/logout`);

      await res.json();

      if (!res.ok) throw new Error("something went wrong");

      router.push("/login");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className={`flex min-w-0 flex-1 flex-col items-center justify-center gap-0.5 rounded-lg border-none px-2 py-2 text-[11px] font-bold text-white outline-none transition-all duration-300 hover:bg-[#EC6D13] sm:text-xs md:flex-initial md:flex-row md:gap-0 md:space-x-2 md:px-3 md:text-base`}
    >
      <MdLogout className="h-5 w-5 shrink-0 md:h-5 md:w-5" />
      <span className="max-w-18 truncate capitalize md:max-w-none">Logout</span>
    </button>
  );
};

export default LogoutBtn;
