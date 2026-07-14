import { Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";
import { InputOrderItems } from "@/lib/types/menu";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  response: NextResponse,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { items: true },
    });

    if (!id)
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    if (!order)
      return NextResponse.json({ message: "order not found" }, { status: 404 });

    return NextResponse.json({ order }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const body = await request.json();

    if (!id)
      return NextResponse.json({ message: "invalid ID" }, { status: 404 });

    const existingOrder = await prisma.order.findUnique({
      where: { id: parseInt(id) },
      include: { items: true },
    });

    if (!existingOrder)
      return NextResponse.json({ message: "order not found" }, { status: 404 });

    const data: Prisma.OrderUpdateInput = {};

    if (body.status !== undefined) {
      data.status = body.status;
    }

    if (body.tableNumber !== undefined) {
      data.tableNumber = body.tableNumber;
    }

    if (body.note !== undefined) {
      data.note = body.note;
    }

    if (body.paymentStatus !== undefined) {
      data.paymentStatus = body.paymentStatus;
    }

    if (body.items) {
      const menuItems = await prisma.menuItem.findMany({
        where: {
          id: {
            in: body.items.map((item: InputOrderItems) => item.menuItemId),
          },
        },
      });

      const total = menuItems.reduce((sum, menuItem) => {
        const orderItem = body.items.find(
          (item: InputOrderItems) => item.menuItemId === menuItem.id,
        );

        return sum + menuItem.price * (orderItem?.quantity ?? 0);
      }, 0);

      data.total = total;

      data.items = {
        deleteMany: {},
        create: body.items.map((item: InputOrderItems) => ({
          quantity: item.quantity,
          menuItemId: item.menuItemId,
        })),
      };
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: parseInt(id),
      },
      data,
    });

    return NextResponse.json(
      { message: "success", updatedOrder },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  response: NextResponse,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const selectedOrder = await prisma.order.findUnique({
      where: { id: parseInt(id) },
    });

    if (!selectedOrder)
      return NextResponse.json({ message: "order not found" }, { status: 404 });

    await prisma.order.delete({ where: { id: selectedOrder.id } });

    return NextResponse.json(null, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
