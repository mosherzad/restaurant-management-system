import HomeContent from "@/components/HomeContent";
import { verifyTokenFromToken } from "@/lib/jwt/verifyToken";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;

  const isAuth = Boolean(token && verifyTokenFromToken(token));

  return (
    <div className="relative no-scrollbar w-full min-w-0 overflow-x-hidden lg:pr-98">
      <HomeContent isAuth={isAuth} />
    </div>
  );
}
