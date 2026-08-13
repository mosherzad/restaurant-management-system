import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value;

  if (!token) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
      role: "ADMIN" | "STAFF" | "KITCHEN" | "CASHIER";
    };

    const { pathname } = request.nextUrl;

    //admin only pages
    if (pathname.startsWith("/dashboard") && payload.role !== "ADMIN")
      return NextResponse.redirect(new URL("/unauthorized", request.url));

    // pages that kitchen staff should not access
    if (pathname.startsWith("/order") && payload.role === "KITCHEN")
      return NextResponse.redirect(new URL("/unauthorized", request.url));

    return NextResponse.next();
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/order/:path*", "/kitchen/:path*"],
};
