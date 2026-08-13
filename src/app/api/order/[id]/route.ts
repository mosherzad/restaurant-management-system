import { Prisma } from "@/generated/prisma/client";
import { verifyToken } from "@/lib/jwt/verifyToken";
import prisma from "@/lib/prisma";
import { InputOrderItems } from "@/lib/types/menu";
import { updateOrderSchema } from "@/lib/validationSchema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const orderId = Number(id);
  try {
    const userPayload = verifyToken(request);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (isNaN(orderId))
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

    const userPayload = verifyToken(request);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    const orderId = Number(id);
    if (isNaN(orderId))
      return NextResponse.json({ message: "invalid ID" }, { status: 404 });

    const validation = updateOrderSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          message: "Validation failed",
          errors: validation.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const data = validation.data;

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { message: "No fields provided to update." },
        { status: 400 },
      );
    }

    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!existingOrder)
      return NextResponse.json({ message: "order not found" }, { status: 404 });

    const dataToUpdate: Prisma.OrderUpdateInput = {};

    if (data.status !== undefined) {
      if (userPayload.role !== "KITCHEN" && userPayload.role !== "ADMIN")
        return NextResponse.json(
          {
            message: "you don't have permission to update status",
          },
          { status: 403 },
        );
      dataToUpdate.status = data.status;
    }

    if (data.tableNumber !== undefined || data.note !== undefined) {
      if (userPayload.role !== "STAFF" && userPayload.role !== "ADMIN")
        return NextResponse.json(
          {
            message:
              "you don't have permission to update note and table number",
          },
          { status: 403 },
        );
      dataToUpdate.tableNumber = data.tableNumber;
      dataToUpdate.note = data.note;
    }

    if (data.paymentStatus !== undefined) {
      if (userPayload.role !== "CASHER" && userPayload.role !== "ADMIN")
        return NextResponse.json(
          { message: "you don't have permission to update payment status" },
          { status: 403 },
        );
      dataToUpdate.paymentStatus = data.paymentStatus;
    }

    if (data.items) {
      if (userPayload.role !== "STAFF" && userPayload.role !== "ADMIN") {
        return NextResponse.json(
          { message: "you don't have permission to update items" },
          { status: 403 },
        );
      }
      const menuItems = await prisma.menuItem.findMany({
        where: {
          id: {
            in: data.items.map((item: InputOrderItems) => item.menuItemId),
          },
        },
      });

      if (menuItems.length !== data.items.length) {
        return NextResponse.json(
          { message: "One or more menu items do not exist." },
          { status: 400 },
        );
      }

      const total = menuItems.reduce((sum, menuItem) => {
        const orderItem = data.items!.find(
          (item: InputOrderItems) => item.menuItemId === menuItem.id,
        );

        return sum + menuItem.price * (orderItem?.quantity ?? 0);
      }, 0);

      dataToUpdate.total = total;

      dataToUpdate.items = {
        deleteMany: {},
        create: data.items.map((item: InputOrderItems) => ({
          quantity: item.quantity,
          menuItemId: item.menuItemId,
        })),
      };
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: dataToUpdate,
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
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const orderId = Number(id);
    const userPayload = verifyToken(request);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    if (userPayload.role !== "STAFF" && userPayload.role !== "ADMIN")
      return NextResponse.json({ message: "access denied" }, { status: 403 });

    if (isNaN(orderId)) {
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });
    }

    await prisma.order.delete({ where: { id: orderId } });

    return NextResponse.json(
      { message: "order deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.log(error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return NextResponse.json({ message: "order not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
