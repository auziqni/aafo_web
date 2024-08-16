import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    return NextResponse.json(
      { message: "get away! sho shoo..." },
      { status: 423 }
    );
    await prisma.pengukuran.deleteMany();
    await prisma.pasien.deleteMany();
    return NextResponse.json({ message: "success" }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ message: "error: ", error }, { status: 500 });
  }
}
