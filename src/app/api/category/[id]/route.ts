/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    if (isNaN(Number(id))) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }

    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
      include: { menuItem: true },
    });

    if (!category)
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 },
      );

    return NextResponse.json({ category }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const body = await req.json();
    if (isNaN(Number(id)))
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    if (!body?.name || typeof body.name !== "string") {
      return NextResponse.json(
        { message: "Invalid category name" },
        { status: 400 },
      );
    }
    const updatedCategory = await prisma.category.update({
      where: { id: parseInt(id) },
      data: {
        name: body.name.trim(),
      },
    });

    return NextResponse.json(
      { message: "category updated", updatedCategory },
      { status: 200 },
    );
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025")
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 },
      );
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (isNaN(Number(id)))
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    await prisma.category.delete({ where: { id: parseInt(id) } });

    return NextResponse.json({ message: "category deleted" }, { status: 200 });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025")
      return NextResponse.json(
        { message: "category not found" },
        { status: 404 },
      );
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
