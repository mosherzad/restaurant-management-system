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
