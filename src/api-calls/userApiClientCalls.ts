import { toast } from "react-toastify";

export const deleteUserById = async (userId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.text();
    console.error(error);
    throw new Error("failed to delete user");
  }
  toast.success("User deleted");
};
