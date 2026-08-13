import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest } from "next/server";

export const verifyToken = (request: NextRequest) => {
  try {
    const cookie = request.cookies.get("jwtToken");
    const token = cookie?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    if (typeof decoded === "string") return null;

    return decoded;
  } catch {
    return null;
  }
};

export function verifyTokenFromToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    if (typeof decoded === "string") {
      return null;
    }

    return decoded;
  } catch {
    return null;
  }
}
