import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type reqstate = {
  norekam: string;
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    validatebody(body);

    try {
      // jika pasien dengan kode tidak ada maka buat pasien
      let status = "pasien ditemukan , pengukuran berhasil ditambahkan";
      const cariPasien = await prisma.pasien.findUnique({
        where: {
          norekam: body.norekam,
        },
      });

      if (!cariPasien) {
        await prisma.pasien.create({
          data: {
            norekam: body.norekam,
            nama: "",
            ttl: "",
            telepon: "",
            tinggi: 0,
            berat: 0,
          },
        });
        status =
          "Pasien baru berhasil dibuat , pengukuran berhasil ditambahkan";
      }

      try {
        await prisma.pengukuran.create({
          data: {
            sudut: body.sudut,
            beratDepan: body.beratDepan,
            beratBelakang: body.beratBelakang,
            pasien: {
              connect: {
                norekam: body.norekam,
              },
            },
          },
        });
        return NextResponse.json({ status });
      } catch (error) {
        return NextResponse.json(
          { "penulisan pengukuran gagal": error },
          { status: 400 }
        );
      }
    } catch (error) {
      return NextResponse.json(
        { "penulisan pasien gagal": error },
        { status: 400 }
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

const validatebody = (data: any): data is reqstate => {
  if (typeof data !== "object" || data === null) {
    throw new Error("Body harus berupa objek");
  }

  const requiredFields: (keyof reqstate)[] = [
    "norekam",
    "sudut",
    "beratDepan",
    "beratBelakang",
  ];
  for (const field of requiredFields) {
    if (!(field in data)) {
      throw new Error(`Properti '${field}' tidak ditemukan`);
    }
  }

  if (typeof data.norekam !== "string") {
    throw new Error("'norekam' harus berupa number");
  }
  if (typeof data.sudut !== "number") {
    throw new Error("'sudut' harus berupa string");
  }
  if (typeof data.beratDepan !== "number") {
    throw new Error("'beratDepan' harus berupa string");
  }
  if (typeof data.beratBelakang !== "number") {
    throw new Error("'beratBelakang' harus berupa string");
  }

  return true;
};
