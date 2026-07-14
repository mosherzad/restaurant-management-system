import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const getItemId = (id: string) => {
  const menuId = Number(id);

  if (isNaN(menuId)) return null;

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

    if (menuId === null)
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    const existingMenuItem = await prisma.menuItem.findUnique({
      where: { id: menuId },
    });

    if (!existingMenuItem)
      return NextResponse.json(
        { message: "item does not exists" },
        { status: 404 },
      );

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
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  reques: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (isNaN(Number(id)))
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    await prisma.menuItem.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "item deleted" }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
