import { verifyToken } from "@/lib/jwt/verifyToken";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userPayload = verifyToken(request);

    if (!userPayload)
      return NextResponse.json({ message: "unauthorized" }, { status: 401 });

    const [
      totalOrders,
      pendingOrders,
      cookingOrders,
      readyOrders,
      revenue,
      totalCategories,
      categories,
      totalMeals,
    ] = await Promise.all([
      prisma.order.count(),

      prisma.order.count({
        where: {
          status: "PENDING",
        },
      }),

      prisma.order.count({
        where: {
          status: "COOKING",
        },
      }),

      prisma.order.count({
        where: {
          status: "READY",
        },
      }),

      prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),

      prisma.category.count(),

      prisma.category.findMany(),

      prisma.menuItem.count(),
    ]);
    return NextResponse.json(
      {
        totalOrders,
        pendingOrders,
        cookingOrders,
        readyOrders,
        totalRevenue: revenue._sum.total ?? 0,
        totalMeals,
        totalCategories,
        categories,
      },
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
