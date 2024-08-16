import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { stat } from "fs";
const prisma = new PrismaClient();

interface dataCreateMany {
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
  timeStamp: string;
  servoAngle: number;
  pasienId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: dataCreateMany[] = await request.json();

    await prisma.pengukuran.createMany({
      data: body,
    });

    // console.log("Data berhasil ditambahkan");
    return NextResponse.json({ message: "good" }, { status: 200 });
  } catch (error) {
    // console.error("Error creating data:", error);
    return NextResponse.json(
      {
        data_bermasalah: error instanceof Error ? error.message : String(error),
      },
      { status: 406 }
    );
  }
}
