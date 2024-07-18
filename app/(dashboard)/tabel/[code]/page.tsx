import ChartManager from "@/components/dashboard/chart/chartManager";
import TablePengukuran from "@/components/dashboard/tabel/tabelPengukuran";
// import { dataSensor } from "@/lib/mock/mockSensor";
import { Pengukuran, PrismaClient } from "@prisma/client";
import { Suspense } from "react";
const prisma = new PrismaClient();

async function getDataPengukuran(code: string) {
  const pengukuranPasien = await prisma.pengukuran.findMany({
    where: {
      pasienId: code,
    },
    orderBy: {
      timeStamp: "asc",
    },
  });

  const dataPenyesuaian: PengukuranData[] = pengukuranPasien.map(
    (item, index) => ({
      id: index + 1,
      timeStamp: item.timeStamp.toString(),
      sudut: item.sudut,
      beratDepan: item.beratDepan,
      beratBelakang: item.beratBelakang,
    })
  );

  return dataPenyesuaian;
}

export default async function Page({ params }: { params: { code: string } }) {
  const pengukuranPasien: PengukuranData[] = await getDataPengukuran(
    params.code
  );
  // const data = dataSensor.filter((sensor) => sensor.deviceCode === params.code);
  return (
    <div className="  w-full  p-5">
      <Suspense fallback={<div>Loading Table...</div>}>
        <ChartManager pengukuranPasien={pengukuranPasien} />
        <TablePengukuran data={pengukuranPasien} />
      </Suspense>
    </div>
  );
}
