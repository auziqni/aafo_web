import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type reqstate = {
  id: string;
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
};

export async function POST(request: NextRequest) {
  try {
    const body: reqstate = await request.json();

    try {
      // jika pasien dengan kode tidak ada maka buat pasien
      let status = "pasien ditemukan , pengukuran berhasil ditambahkan";
      const cariPasien = await prisma.pasien.findUnique({
        where: {
          id: body.id,
        },
      });

      if (!cariPasien) {
        await prisma.pasien.create({
          data: {
            id: body.id,
            nama: "",
            umur: 0,
            alamat: "",
          },
        });
        status =
          "Pasien baru berhasil dibuat , pengukuran berhasil ditambahkan";
      }

      await prisma.pengukuran.create({
        data: {
          sudut: body.sudut,
          beratDepan: body.beratDepan,
          beratBelakang: body.beratBelakang,
          pasien: {
            connect: {
              id: body.id,
            },
          },
        },
      });

      return NextResponse.json({ status });
    } catch (error) {
      console.error("Error fetching data: data tidak sesuai", error);
      return NextResponse.json({ "penulisan gagal": error }, { status: 400 });
    }
  } catch (error) {
    console.error("Error fetching data: data tidak sesuai", error);
    return NextResponse.json({ reqerror: error }, { status: 406 });
  }
}
