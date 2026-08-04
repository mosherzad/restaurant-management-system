import { verifyToken } from "@/lib/jwt/verifyToken";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany({
      include: { category: true },
    });

    return NextResponse.json({ data: menuItems }, { status: 200 });
  } catch (error) {
    console.error(error);
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

    await prisma.menuItem.create({
      data: {
        name: body.name,
        price: body.price,
        image: body.image,
        categoryId: body.categoryId,
        available: body.available,
      },
    });

    return NextResponse.json(
      { message: "item added successfully" },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
