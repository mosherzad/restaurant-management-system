import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
interface Prop {
  params: Promise<{ id: string }>;
}

const getUserId = (id: string) => {
  const userId = Number(id);

  if (isNaN(userId)) return null;

  return userId;
};
export async function GET(request: NextRequest, { params }: Prop) {
  try {
    const { id } = await params;

    const userId = getUserId(id);

    if (userId === null)
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (user === null)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest, { params }: Prop) {
  try {
    const { id } = await params;

    const userId = getUserId(id);

    if (userId === null)
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    await prisma.user.delete({ where: { id: userId } });

    return NextResponse.json(
      { message: "User deleted successfully" },
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

export async function PATCH(request: NextRequest, { params }: Prop) {
  try {
    const body = await request.json();

    const { id } = await params;
    const userId = getUserId(id);

    if (userId === null)
      return NextResponse.json({ message: "invalid ID" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(body.name && { name: body.name }),
        ...(body.email && { email: body.email }),
        ...(body.role && { role: body.role }),
        ...(body.password && { password: hashedPassword }),
      },
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "internal server error" },
      { status: 500 },
    );
  }
}
