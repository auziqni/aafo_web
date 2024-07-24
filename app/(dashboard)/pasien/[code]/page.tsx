import ChartManager from "@/components/dashboard/tabel/dy-code/chartManager";
import EditPasien from "@/components/dashboard/tabel/dy-code/editPasien";
import TablePengukuran from "@/components/dashboard/tabel/tabelPengukuran";
import { PrismaClient } from "@prisma/client";
import { Suspense } from "react";
const prisma = new PrismaClient();
import Image from "next/image";

export const revalidate = 5; // Revalidate setiap 60 detik

async function getDataPasien(code: string) {
  const pasien = await prisma.pasien.findUniqueOrThrow({
    where: {
      norekam: code,
    },
    include: {
      pengukuran: {
        take: 1,
        orderBy: {
          timeStamp: "asc",
        },
      },
    },
  });

  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta", // WIB (UTC+7)
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const waktu: string = new Intl.DateTimeFormat("id-ID", options).format(
    pasien.pengukuran[0].timeStamp
  );

  const dataPenyesuaian = {
    norekam: pasien.norekam,
    nama: pasien.nama,
    ttl: pasien.ttl,
    telepon: pasien.telepon,
    tinggi: pasien.tinggi,
    berat: pasien.berat,
    waktu: waktu,
  };
  return dataPenyesuaian;
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
  return (
    <div className="  w-full p-5 flex flex-col gap-10 ">
      <div className=" flex flex-col items-end gap-2">
        <div className=" w-full flex justify-between items-center">
          <h1 className="text-4xl font-semibold"> MONITORING PASIEN</h1>
          <EditPasien
            pasien={pasien}
            className=" w-fit p-3 rounded-lg bg-blue-200 hover:bg-blue-800 hover:text-white"
          />
        </div>

        <div
          id="pasien-info"
          className="relative grid grid-cols-2 gap-12 rounded-md text-black w-full "
        >
          <div
            id="pasienname"
            className="relative flex shadow-md col gap-6 p-6 rounded-xl border border-red-600"
          >
            <div className="h-20 w-20 rounded-full bg-slate-300 self-center overflow-clip border">
              <Image
                src="/user/holder.jpg"
                alt="hero"
                height={80}
                width={80}
                priority
              />
            </div>
            <div className=" flex flex-col gap-3">
              <span className="">PASIEN</span>
              <h2 className="text-3xl">{pasien.nama}</h2>
            </div>

            <div className="absolute top-0 right-0 font-semibold m-3 text-xl">
              {pasien.norekam}
            </div>
          </div>
          <div
            id="paseinDetil"
            className="shadow-md flex flex-col p-6 gap-3 rounded-xl border border-red-600"
          >
            <DetilPasien tittle="Tanggal Rehab" value={pasien.waktu} />
            <DetilPasien tittle="Tempat Tanggal Lahir" value={pasien.ttl} />
            <DetilPasien tittle="Tinggi" value={pasien.tinggi.toString()} />
            <DetilPasien tittle="Berat" value={pasien.berat.toString()} />
            <DetilPasien tittle="No Telepon" value={pasien.telepon} />
          </div>
        </div>
      </div>

      <Suspense fallback={<div>Loading </div>}>
        <ChartManager pengukuranPasien={pengukuranPasien} />
        <TablePengukuran data={pengukuranPasien} />
      </Suspense>
    </div>
  );
}

function DetilPasien({ tittle, value }: { tittle: string; value: string }) {
  return (
    <div className="flex">
      <span className=" w-48">{tittle}</span>
      <h2 className="font-semibold">{value}</h2>
    </div>
  );
}
