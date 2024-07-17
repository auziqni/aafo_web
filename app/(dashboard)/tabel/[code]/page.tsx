import TablePengukuran from "@/components/dashboard/tabel/tabelPengukuran";
// import { dataSensor } from "@/lib/mock/mockSensor";
import { Pengukuran, PrismaClient } from "@prisma/client";
import { Suspense } from "react";
const prisma = new PrismaClient();

type Pengukuranb = {
  id: number;
  timeStamp: string;
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
};

async function getDataPengukuran(code: string) {
  const pengukuranPasien = await prisma.pengukuran.findMany({
    where: {
      pasienId: code,
    },
    orderBy: {
      timeStamp: "desc",
    },
  });

  const dataPenyesuaian: Pengukuranb[] = pengukuranPasien.map(
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
  const pengukuranPasien: Pengukuranb[] = await getDataPengukuran(params.code);
  // const data = dataSensor.filter((sensor) => sensor.deviceCode === params.code);
  return (
    <div className="  w-full  p-5">
      <Suspense fallback={<div>Loading Table...</div>}>
        {/* <TableSensor data={data} /> */}
        <TablePengukuran data={pengukuranPasien} />
      </Suspense>
    </div>
  );
}
