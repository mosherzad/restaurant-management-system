import { cookies } from "next/headers";

export const getAllOrders = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwtToken")?.value;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
      headers: {
        Cookie: `jwtToken=${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("API ERROR", error);

      throw new Error("failed to fetch meals");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getOrderById = async (orderId: number | null) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
    );

    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }

    return await res.json();
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrderById = async (orderId: number) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update order");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
