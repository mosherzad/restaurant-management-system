import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { InputOrderItems } from "@/lib/types/menu";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { items: { include: { menuItem: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: body.items.map((item: InputOrderItems) => item.menuItemId),
        },
      },
    });

    console.log("menu item", menuItems);

    const total = body.items.reduce((sum: number, item: InputOrderItems) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId);

      return sum + menuItem!.price * item.quantity;
    }, 0);

    console.log("total", total);
    const newOrder = await prisma.order.create({
      data: {
        tableNumber: body.tableNumber,
        note: body.note,
        total,

        items: {
          create: body.items.map((item: InputOrderItems) => ({
            quantity: item.quantity,
            menuItemId: item.menuItemId,
          })),
        },
      },
    });

    return NextResponse.json(
      { message: "order was created", newOrder },
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
