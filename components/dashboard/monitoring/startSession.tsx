"use client";
import { useState, useEffect, use } from "react";
import { Progress } from "@/components/ui/progress";
import { db, ref, onValue, set, get } from "@/lib/firebase-config";
import AddPasien from "./addPasien";
import { Pengukuran, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface DataRead {
  time: Date;
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
}
interface loadingProps {
  state: boolean;
  message: string;
}
interface dataCreateMany {
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
  timeStamp: string;
  servoAngle: number;
  pasienId: string;
}

export default function StartSession({
  data,
  times = 5,
  interval = 1000,
}: {
  data: DataMonitoringFirebase;
  times?: number;
  interval?: number;
}) {
  const [pasien, setPasien] = useState<PasienData | null>(null);
  const [datas, setDatas] = useState<DataRead[]>([]);
  const [isLoading, setIsLoading] = useState<loadingProps>({
    state: false,
    message: "",
  });
  const [isDone, setIsDone] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isLoading.state) {
      intervalId = setInterval(() => {
        if (datas.length < times) {
          addData({
            time: new Date(),
            sudut: data.sudut,
            beratDepan: data.beratDepan,
            beratBelakang: data.beratBelakang,
          });
        } else {
          // clearInterval(intervalId);
          setIsDone(true);
          setIsLoading({ state: false, message: "Selesai" });
          set(ref(db, "dataNew/sessionStart"), false);
        }
        setProgress((datas.length / times) * 100);
      }, interval);
    } else {
      if (data.sessionStart) {
        setIsDone(false);
        setIsLoading({ state: true, message: "Sesi sedang berlangsung" });
      }
    }

    if (isDone) {
      WriteData({ pasien: pasien, datas: datas });
      setIsDone(false);
    }

    // Cleanup function
    return () => {
      if (intervalId) {
        // Hanya bersihkan jika intervalId sudah diset
        clearInterval(intervalId);
      }
    };
  }, [data, pasien, datas, isLoading, times, interval, isDone]);

  // useEffect(() => {

  // }, [isDone]);

  const addData = (newData: DataRead) => {
    setDatas((prevDatas) => {
      if (prevDatas === null) {
        // Jika prevDatas adalah null, inisialisasi dengan array kosong dan tambahkan newData
        return [newData];
      } else {
        // Jika prevDatas adalah array, tambahkan newData ke array tersebut
        return [...prevDatas, newData];
      }
    });
  };

  const handleStartSession = async () => {
    setDatas([]);
    setIsDone(false);
    set(ref(db, "dataNew/sessionStart"), true);
  };

  return (
    <div className="flex flex-col relative w-full gap-5 ">
      <AddPasien
        setPasien={setPasien}
        isSessionStart={data.sessionStart}
        onButtonSubmit={handleStartSession}
        isloading={isLoading}
        setIsLoading={setIsLoading}
      />
      <div className=" flex flex-col items-center">
        {isLoading.state && isLoading.message === ""
          ? `sesi pasien ${pasien?.nama}`
          : isLoading.message}
        <Progress value={progress} className="w-[90%] mx-auto border-black" />
        {progress}%
      </div>
      {/* <div className="font-black text-xl">{datas.length}</div>
      {datas && (
        <ul>
          {datas.map((data, index) => (
            <li key={index}>
              <p>{data.time.toISOString()}</p>
              <p>Sudut: {data.sudut}</p>
              <p>Berat Depan: {data.beratDepan}</p>
              <p>Berat Belakang: {data.beratBelakang}</p>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
}

async function WriteData({
  pasien,
  datas,
}: {
  pasien: PasienData | null;
  datas: DataRead[];
}) {
  const dataPengukuran: dataCreateMany[] = [];
  // const datakkk: Pengukuran[] = [];

  datas.forEach((data) => {
    dataPengukuran.push({
      sudut: data.sudut,
      beratDepan: data.beratDepan,
      beratBelakang: data.beratBelakang,
      timeStamp: data.time.toISOString(),
      servoAngle: 0,
      pasienId: pasien?.norekam || "rokam",
    });
  });

  console.log(dataPengukuran);
  try {
    await fetch("/api/createmanypengukuran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPengukuran),
    });
  } catch (error) {}
}
