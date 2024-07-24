// import TableTiang from "@/components/dashboard/tableTiang";

// import Table from "@/components/dashboard/table";
import TablePasien from "@/components/dashboard/tabel/tabelPasien";
import { Pasien, PrismaClient } from "@prisma/client";
import { time } from "console";
import { Suspense } from "react";
const prisma = new PrismaClient();

export const revalidate = 5; // Revalidate setiap 60 detik

async function getDataPasien() {
  // const semuapasien = await prisma.pasien.findMany({
  //   orderBy: {
  //     nama: "asc",
  //   },
  // });

  const pasien = await prisma.pasien.findMany({
    include: {
      pengukuran: {
        take: 1,
        orderBy: {
          timeStamp: "desc",
        },
      },
    },
    orderBy: {
      nama: "asc",
    },
  });

  const dataPenyesuaian = pasien.map((item, index) => ({
    id: index + 1,
    norekam: item.norekam,
    nama: item.nama,
    ttl: item.ttl,
    telepon: item.telepon,
    tinggi: item.tinggi,
    berat: item.berat,
    waktu: item.pengukuran[0].timeStamp.toString(),
  }));

  return dataPenyesuaian;
}
export default async function Tabel() {
  const semuapasien: PasienDataTable[] = await getDataPasien();
  return (
    <div className="relative w-full bg-purple-50 p-5 overflow-clip  ">
      <Suspense fallback={<div>Loading Table...</div>}>
        {/* <TableTiang data={data} /> */}
        <TablePasien data={semuapasien} />
      </Suspense>
    </div>
  );
}
