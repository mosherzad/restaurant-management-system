import { verifyToken } from "@/lib/jwt/verifyToken";
import prisma from "@/lib/prisma";
import { createUserSchema } from "@/lib/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userPayload = verifyToken(request);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    const users = await prisma.user.findMany();

    if (!users)
      return NextResponse.json(
        { message: "failed to fetch data" },
        { status: 400 },
      );

    return NextResponse.json({ data: users }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const userPayload = verifyToken(request);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    if (userPayload.role !== "ADMIN")
      return NextResponse.json({ message: "access denied" }, { status: 403 });

    const validation = createUserSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(
        {
          message: "validation error",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );

    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
        role: body.role,
      },
    });

    return NextResponse.json(
      { message: "User created successfully", data: newUser },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
