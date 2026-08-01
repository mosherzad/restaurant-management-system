import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt/verifyToken";
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: { menuItem: true },
    });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const userPayload = verifyToken(req);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    if (userPayload.role !== "ADMIN")
      return NextResponse.json({ message: "access denied" }, { status: 403 });

    const name = body?.name?.trim();

    if (!name) {
      return NextResponse.json(
        { message: "Invalid category name" },
        { status: 400 },
      );
    }
    const newCategory = await prisma.category.create({
      data: {
        name,
      },
    });

    return NextResponse.json(
      { message: "Category added", newCategory },
      { status: 201 },
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Category already exists" },
        { status: 409 },
      );
    }
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
