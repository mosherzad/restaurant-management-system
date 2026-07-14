import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
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
