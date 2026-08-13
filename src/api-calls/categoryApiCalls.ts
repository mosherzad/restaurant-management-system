import { cookies } from "next/headers";

export const getAllCategories = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
      headers: {
        Cookie: `jwtToken=${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("API ERROR", error);

      throw new Error("failed to fetch categories");
    }

    return await res.json();
  } catch (error) {
    console.error(error);

    throw error;
  }
};
