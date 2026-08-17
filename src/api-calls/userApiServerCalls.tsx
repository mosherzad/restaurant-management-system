import { cookies } from "next/headers";

const getToken = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwtToken")?.value;

  return token;
};
export const getUsers = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        Cookie: `jwtToken=${await getToken()}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      console.error(error);
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
