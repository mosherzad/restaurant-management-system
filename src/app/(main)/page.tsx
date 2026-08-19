import { getAllMeals } from "@/api-calls/mealApiCall";
import HomeContent from "@/components/HomeContent";
import SplashScreen from "@/components/SplashScreen";
import { verifyTokenFromToken } from "@/lib/jwt/verifyToken";
import { cookies } from "next/headers";

export default async function Home() {
  const { menuItems } = await getAllMeals();
  const cookieStore = await cookies();
  const token = cookieStore.get("jwtToken")?.value;

  const payload = token ? verifyTokenFromToken(token) : null;
  return (
    <div className="relative no-scrollbar w-full min-w-0 overflow-x-hidden lg:pr-98">
      <HomeContent menuItems={menuItems} payload={payload} />
      <SplashScreen />
    </div>
  );
}
