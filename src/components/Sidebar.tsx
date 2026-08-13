import { verifyTokenFromToken } from "@/lib/jwt/verifyToken";
import SidebarLinks from "./SidebarLinks";
import { cookies } from "next/headers";
const Sidebar = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;

  if (!token) return null;

  const userPayload = verifyTokenFromToken(token);

  if (!userPayload) return null;
  return (
    <aside className="fixed z-50 flex h-18 w-full flex-row items-center justify-stretch border-t border-white/10 bg-[#0F172A] shadow-[0_-8px_24px_rgba(0,0,0,0.35)] bottom-0 left-0 right-0 md:bottom-auto md:left-0 md:right-auto md:top-0 md:h-screen md:w-50 md:flex-col md:items-center md:justify-start md:border-t-0 md:border-r md:p-2 md:shadow-2xl">
      <SidebarLinks />
    </aside>
  );
};

export default Sidebar;
