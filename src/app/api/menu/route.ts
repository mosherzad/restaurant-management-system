import { verifyToken } from "@/lib/jwt/verifyToken";
import prisma from "@/lib/prisma";
import { menuItemSchema } from "@/lib/validationSchema";
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

    const validation = menuItemSchema.safeParse(body);

    if (!validation.success)
      return NextResponse.json(
        {
          message: "validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );

    const data = validation.data;

    await prisma.menuItem.create({
      data: {
        name: data.name,
        price: data.price,
        image: data.image,
        categoryId: data.categoryId,
        available: data.available,
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
