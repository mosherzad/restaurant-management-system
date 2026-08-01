import { setCookie } from "@/lib/jwt/generateToken";
import prisma from "@/lib/prisma";
import { jwtPayload } from "@/lib/types";
import bcrypt from "bcrypt";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
      },
    });

    const jwtPayload: jwtPayload = {
      id: newUser.id,
      role: newUser.role,
      name: newUser.name,
    };

    const token = setCookie(jwtPayload);

    return NextResponse.json({ newUser, token }, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
