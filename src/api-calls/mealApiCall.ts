import { cookies } from "next/headers";

export const getAllMeals = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`, {
      headers: {
        Cookie: `jwtToken=${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("API ERROR", error);

      throw new Error("failed to fetch orders");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMealById = async (menuId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/menu/${menuId}`,
    );

    if (!res.ok) {
      const error = await res.text();
      console.error("Error", error);

      throw new Error("failed to fetch menu");
    }

    return await res.json();
  } catch (error) {
    console.error("fetch menu error", error);
    throw error;
  }
};
