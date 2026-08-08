import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { InputOrderItems } from "@/lib/types/menu";
import { verifyToken } from "@/lib/jwt/verifyToken";
import { createOrderSchema } from "@/lib/validationSchema";

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

    const userPayload = verifyToken(request);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    if (userPayload.role !== "STAFF")
      return NextResponse.json({ message: "access denied" }, { status: 403 });

    const validation = createOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = validation.data;

    const menuItems = await prisma.menuItem.findMany({
      where: {
        id: {
          in: body.items.map((item: InputOrderItems) => item.menuItemId),
        },
      },
    });

    console.log("menu item", menuItems);

    const total = data.items.reduce((sum: number, item: InputOrderItems) => {
      const menuItem = menuItems.find((m) => m.id === item.menuItemId);

      return sum + menuItem!.price * item.quantity;
    }, 0);

    console.log("total", total);
    const newOrder = await prisma.order.create({
      data: {
        tableNumber: data.tableNumber,
        // TODO Make note optional in prisma model
        note: data.note,
        total,

        items: {
          create: data.items.map((item: InputOrderItems) => ({
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
