import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type reqstate = {
  norekam: string;
  nama: string;
  ttl: string;
  telepon: string;
  tinggi: number;
  berat: number;
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    validatebody(body);

    try {
      await prisma.pasien.update({
        where: {
          norekam: body.norekam,
        },
        data: {
          nama: body.nama,
          ttl: body.ttl,
          telepon: body.telepon,
          tinggi: body.tinggi,
          berat: body.berat,
        },
      });

      return NextResponse.json({ status: "pasien berhasil diupdate" });
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
    "nama",
    "ttl",
    "telepon",
    "tinggi",
    "berat",
  ];
  for (const field of requiredFields) {
    if (!(field in data)) {
      throw new Error(`Properti '${field}' tidak ditemukan`);
    }
  }

  if (typeof data.norekam !== "string") {
    throw new Error("'norekam' harus berupa string");
  }
  if (typeof data.nama !== "string") {
    throw new Error("'nama' harus berupa string");
  }
  if (typeof data.ttl !== "string") {
    throw new Error("'ttl' harus berupa string");
  }
  if (typeof data.telepon !== "string") {
    throw new Error("'telepon' harus berupa string");
  }
  if (typeof data.tinggi !== "number") {
    throw new Error("'tinggi' harus berupa number");
  }
  if (typeof data.berat !== "number") {
    throw new Error("'berat' harus berupa number");
  }

  return true;
};
