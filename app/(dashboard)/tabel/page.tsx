// import TableTiang from "@/components/dashboard/tableTiang";

// import Table from "@/components/dashboard/table";
import TablePasien from "@/components/dashboard/tabel/tabelPasien";
import { Pasien, PrismaClient } from "@prisma/client";
import { Suspense } from "react";
const prisma = new PrismaClient();

async function getDataPasien() {
  const semuapasien = await prisma.pasien.findMany({
    orderBy: {
      nama: "asc",
    },
  });

  return semuapasien;
}
export default async function Tabel() {
  const semuapasien: Pasien[] = await getDataPasien();
  return (
    <div className="relative  w-full bg-purple-50 p-5">
      <Suspense fallback={<div>Loading Table...</div>}>
        {/* <TableTiang data={data} /> */}
        <TablePasien data={semuapasien} />
      </Suspense>
    </div>
  );
}
