import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { jwtPayload } from "../types";

export const generateToken = (jwtToken: JwtPayload) => {
  const token = jwt.sign(jwtToken, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });

  return token;
};

export const setCookie = async (jwtToken: jwtPayload) => {
  const token = generateToken(jwtToken);

  const cookieStore = await cookies();

  cookieStore.set("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};
