"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import { db, ref, onValue, set, get } from "@/lib/firebase-config";
import Image from "next/image";
import StartSession from "@/components/dashboard/monitoring/startNewSession";
import { Settings } from "lucide-react";

interface Settings {
  intervalTake: number;
  totalTake: number;
}

export default function Dashboard() {
  const [data, setData] = useState<DataMonitoringFirebase | null>({
    sudut: 0,
    beratDepan: 0,
    beratBelakang: 0,
    sessionStart: false,
  });
  const [settings, setSettings] = useState<Settings>({
    intervalTake: 1000,
    totalTake: 5,
  });

  const GetSetting = async () => {
    const getdata = await get(ref(db, "settings"));
    if (getdata.exists()) {
      const data: Settings = {
        intervalTake: getdata.val().intervalTake,
        totalTake: getdata.val().totalTake,
      };
      setSettings(data);
    } else {
      console.log("No data available");
      return {
        intervalTake: 1000,
        totalTake: 5,
      };
    }
  };

  useEffect(() => {
    const dataRef = ref(db, "dataNew"); // Ganti dengan path data yang benar
    try {
      GetSetting();
      const unsubscribe = onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          setData({
            sudut: fetchedData.sudut || 0,
            beratDepan: fetchedData.beratDepan || 0,
            beratBelakang: fetchedData.beratBelakang || 0,
            // servoAngle: fetchedData.servoAngle || 0,
            sessionStart: fetchedData.sessionStart || false,
          });
        } else {
          console.error("No data available");
          setData(null); // Reset data to null if no data is available
        }
      });

      return () => unsubscribe(); // Cleanup the listener on component unmount
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col pt-10 ">
      <StartSession
        times={settings.totalTake}
        interval={settings.intervalTake}
      />
      <div className="grid grid-cols-3  p-10 gap-10">
        <CardShow title="Sudut (°)" value={data.sudut} className="" />
        <CardShow title="Toe (N/m²)" value={data.beratDepan} />
        <CardShow title="Heel (N/m²)" value={data.beratBelakang} />
      </div>
      <div className=" px-10 flex flex-col gap-5">
        <h3 className=" capitalize font-bold text-center text-2xl">
          {" "}
          gait cycle analysis
        </h3>
        <div className="relative w-full h-40 ">
          <Image src="/home/gait.jpg" alt="hero" fill objectFit="contain" />
        </div>
      </div>
    </div>
  );
}

function CardShow({
  title,
  value,
  className,
}: {
  title: string;
  value: number;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "relative w-full  aspect-square  flex justify-center p-5 border shadow-md rounded-md ",
        className
      )}
    >
      <h3 className=" mx-auto">{title}</h3>
      <h2 className=" absolute top-1/2 -translate-y-1/2 text-8xl">{value}</h2>
    </div>
  );
}
