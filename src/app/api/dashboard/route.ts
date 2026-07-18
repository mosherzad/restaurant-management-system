import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(response: NextResponse) {
  try {
    const totalOrders = await prisma.order.count();

    const pendingOrders = await prisma.order.count({
      where: {
        status: "PENDING",
      },
    });

    const cookingOrders = await prisma.order.count({
      where: {
        status: "COOKING",
      },
    });

    const readyOrders = await prisma.order.count({
      where: {
        status: "READY",
      },
    });

    const revenue = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    const totalCategories = await prisma.category.count();

    const categories = await prisma.category.findMany();

    const totalMeals = await prisma.menuItem.count();

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
