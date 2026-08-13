import { setCookie } from "@/lib/jwt/generateToken";
import prisma from "@/lib/prisma";
import { jwtPayload } from "@/lib/types";
import { loginSchema } from "@/lib/validationSchema";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const validation = loginSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(
        {
          message: "validation error",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!existingUser)
      return NextResponse.json(
        { message: "user does not exist" },
        { status: 404 },
      );

    const isMatchPassword = await bcrypt.compare(
      body.password,
      existingUser.password,
    );

    if (!isMatchPassword)
      return NextResponse.json(
        { message: "invalid credentials " },
        { status: 400 },
      );

    const jwtPaylod: jwtPayload = {
      id: existingUser.id,
      role: existingUser.role,
      name: existingUser.name,
    };

    await setCookie(jwtPaylod);

    return NextResponse.json({ message: "logged in" }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
