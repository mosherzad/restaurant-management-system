/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyToken } from "@/lib/jwt/verifyToken";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const getItemId = (id: string) => {
  const menuId = Number(id);

  if (!Number.isInteger(menuId) || menuId <= 0) return null;

  return menuId;
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    console.log(id);
    const menuId = getItemId(id);

    if (menuId === null)
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    const item = await prisma.menuItem.findUnique({
      where: { id: menuId },
    });

    if (!item)
      return NextResponse.json({ message: "item not found" }, { status: 404 });

    return NextResponse.json({ data: item }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const body = await request.json();
    const { id } = await params;

    const menuId = getItemId(id);

    const userPayload = verifyToken(request);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    if (userPayload.role !== "ADMIN")
      return NextResponse.json({ message: "access denied" }, { status: 403 });

    if (menuId === null)
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    const updatedMenuItem = await prisma.menuItem.update({
      where: { id: menuId },
      data: {
        name: body.name,
        price: body.price,
        image: body.image,
        categoryId: body.categoryId,
        available: body.available,
      },
    });

    return NextResponse.json(
      { message: "Menu item updated successfully", data: updatedMenuItem },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025")
      return NextResponse.json({ message: "item not found" }, { status: 404 });
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (isNaN(Number(id)))
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    const userPayload = verifyToken(request);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    if (userPayload.role !== "ADMIN")
      return NextResponse.json({ message: "access denied" }, { status: 403 });

    await prisma.menuItem.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "item deleted" }, { status: 200 });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025")
      return NextResponse.json({ message: "item not found" }, { status: 404 });
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
