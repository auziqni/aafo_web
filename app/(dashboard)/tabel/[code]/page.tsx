import ChartManager from "@/components/dashboard/chart/chartManager";
import EditPasien from "@/components/dashboard/popup/editPasien";
import TablePengukuran from "@/components/dashboard/tabel/tabelPengukuran";
// import { dataSensor } from "@/lib/mock/mockSensor";
import { Pengukuran, PrismaClient } from "@prisma/client";
import { Edit } from "lucide-react";
import { Suspense } from "react";
const prisma = new PrismaClient();

async function getDataPasien(code: string) {
  try {
    const pasien = await prisma.pasien.findUniqueOrThrow({
      where: {
        norekam: code,
      },
    });

    return pasien;
  } catch (e) {
    const pasien = {
      norekam: "Not Found",
      nama: "ERROR 404",
      ttl: "",
      telepon: "",
      tinggi: 0,
      berat: 0,
    };
    return pasien;
  }
}

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
  const pasien: PasienData = await getDataPasien(params.code);
  const pengukuranPasien: PengukuranData[] = await getDataPengukuran(
    params.code
  );
  // const data = dataSensor.filter((sensor) => sensor.deviceCode === params.code);
  return (
    <div className="  w-full  p-5">
      <div id="pasien-info" className="relative bg-red-200">
        <h2>
          No Rekam Medis : <span>{pasien.norekam}</span>
        </h2>
        <p>
          Nama Pasien :<span>{pasien.nama}</span>
        </p>
        <p>
          Tempat Tanggal Lahir :<span>{pasien.ttl}</span>
        </p>
        <p>
          Tinggi :<span>{pasien.tinggi}</span>
        </p>
        <p>
          Berat :<span>{pasien.berat}</span>
        </p>

        <EditPasien pasien={pasien} className="absolute top-0 right-0" />
      </div>
      <Suspense fallback={<div>Loading </div>}>
        <ChartManager pengukuranPasien={pengukuranPasien} />
        <TablePengukuran data={pengukuranPasien} />
      </Suspense>
    </div>
  );
}
