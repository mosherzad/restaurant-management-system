import { cookies } from "next/headers";

export const fetchDashboardData = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard`, {
      headers: {
        Cookie: `jwtToken=${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Dashboard API error:", error);

      throw new Error("Failed to fetch dashboard data");
    }

    return await res.json();
  } catch (error) {
    console.error("fetchDashboardData:", error);
    throw error;
  }
};
