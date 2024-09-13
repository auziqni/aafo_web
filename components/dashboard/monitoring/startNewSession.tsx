"use client";
import { useState, useEffect, use } from "react";
import { Progress } from "@/components/ui/progress";
import { db, ref, onValue, set, get } from "@/lib/firebase-config";
import AddPasien from "./addNewPasein";
import { Pengukuran, PrismaClient } from "@prisma/client";
import { number } from "zod";
import { toast } from "react-toastify";
import { write } from "fs";
const prisma = new PrismaClient();

interface DataRead {
  time: Date;
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
}
interface loadingProps {
  state: "idle" | "loading" | "success" | "error";
  percentage: number;
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
  times = 5,
  interval = 1000,
}: {
  times?: number;
  interval?: number;
}) {
  const [pasien, setPasien] = useState<PasienData | null>(null);
  const [isLoading, setIsLoading] = useState<loadingProps>({
    state: "idle",
    percentage: 0,
    message: "",
  });
  // const [number, setNumber] = useState(0);
  const [data, setData] = useState<DataRead[]>([]);

  const SetDataFirebase = async () => {
    const data = {
      sudut: 0,
      beratDepan: 0,
      beratBelakang: 0,
      sessionStart: true,
    };
    await set(ref(db, "dataNew"), data);
  };

  const GetDataFirebase = async () => {
    const getdata = await get(ref(db, "dataNew"));
    if (getdata.exists()) {
      const data: DataRead = {
        time: new Date(),
        sudut: getdata.val().sudut,
        beratDepan: getdata.val().beratDepan,
        beratBelakang: getdata.val().beratBelakang,
      };
      setData((prev) => [...prev, data]);
      //   console.log(data);
    } else {
      //   console.log("No data available");
      return {
        sudut: -1,
        beratDepan: -1,
        beratBelakang: -1,
      };
    }
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isLoading.state === "loading" && data.length < times) {
      intervalId = setInterval(() => {
        GetDataFirebase();
        setIsLoading({
          state: "loading",
          percentage: ((data.length + 1) / times) * 100,
          message: `Mengambil data ke ${data.length + 1} dari ${times}`,
        });
      }, 1000);
    }

    if (isLoading.percentage == 100 && isLoading.state === "loading") {
      WriteData({ pasien, data, setIsLoading });
    }

    console.log({ pasien: pasien, data: data });

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [pasien, data, isLoading, times, interval]);

  const showConsole = () => {
    data.map((item) => {
      console.log(item);
    });
    toast.success("Data berhasil diambil");
  };

  return (
    <div className="flex flex-col relative w-full gap-4 px-10">
      <AddPasien
        pasien={pasien}
        setPasien={setPasien}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setData={setData}
        setDataFirebase={SetDataFirebase}
      />
      <div className=" flex items-center">
        <span className=" font-bold"> {isLoading.percentage}%</span>
        <Progress value={isLoading.percentage} className="flex-1" />
      </div>
    </div>
  );
}

async function WriteData({
  pasien,
  data,
  setIsLoading,
}: {
  pasien: PasienData | null;
  data: DataRead[];
  setIsLoading: (loading: loadingProps) => void;
}) {
  const dataPengukuran: dataCreateMany[] = [];

  data.forEach((data) => {
    dataPengukuran.push({
      sudut: data.sudut,
      beratDepan: data.beratDepan,
      beratBelakang: data.beratBelakang,
      timeStamp: data.time.toISOString(),
      servoAngle: 0,
      pasienId: pasien?.norekam || "rokam",
    });
  });

  setIsLoading({
    state: "success",
    percentage: 100,
    message: "Menyimpan data ke database",
  });

  // console.log(dataPengukuran);
  try {
    const succesCreateManyData = await fetch("/api/createmanypengukuran", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataPengukuran),
    });
    if (succesCreateManyData.status === 200) {
      setIsLoading({
        state: "success",
        percentage: 100,
        message: "Data berhasil disimpan",
      });
    } else {
      setIsLoading({
        state: "error",
        percentage: -100,
        message: "Data gagal disimpan",
      });
    }
    const data = {
      sudut: 0,
      beratDepan: 0,
      beratBelakang: 0,
      sessionStart: false,
    };
    await set(ref(db, "dataNew"), data);
  } catch (error) {
    setIsLoading({
      state: "error",
      percentage: -100,
      message: "Data gagal mengirim",
    });
  }
}
