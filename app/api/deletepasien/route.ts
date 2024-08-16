import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function DELETE(request: NextRequest) {
  try {
    const req: PasienData = await request.json();
    if (!req.norekam) {
      return NextResponse.json(
        { message: "error: norekam not found" },
        { status: 400 }
      );
    }
    await prisma.pengukuran.deleteMany({
      where: {
        pasienId: req.norekam,
      },
    });
    await prisma.pasien.delete({
      where: {
        norekam: req.norekam,
      },
    });
    return NextResponse.json({ message: "success" }, { status: 202 });
  } catch (error) {
    return NextResponse.json({ message: "error: ", error }, { status: 500 });
  }
}
