import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body: PasienData = await request.json();

    await prisma.pasien.create({
      data: {
        norekam: body.norekam,
        nama: body.nama,
        ttl: body.ttl,
        telepon: body.telepon,
        tinggi: body.tinggi,
        berat: body.berat,
      },
    });

    try {
      await prisma.pengukuran.create({
        data: {
          pasien: {
            connect: {
              norekam: body.norekam,
            },
          },
          timeStamp: "2023-08-05T15:08:50.266Z",
          sudut: 0,
          beratDepan: 0,
          beratBelakang: 0,
          servoAngle: 0,
        },
      });

      return NextResponse.json({
        status: 200,
        message: "Pasien berhasil ditambahkan",
      });
    } catch (error) {
      return NextResponse.json(
        { status: 406, message: "Gagal menambahkan pengukuran" },
        { status: 406 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        data_bermasalah: error instanceof Error ? error.message : String(error),
      },
      { status: 406 }
    );
  }
}
