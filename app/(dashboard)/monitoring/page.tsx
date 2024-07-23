"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import { db, ref, get, onValue, set } from "@/lib/firebase-config";
import Image from "next/image";

interface Data {
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
  sessionStart: boolean;
}

export default function Dashboard() {
  const [data, setData] = useState<Data | null>({
    sudut: 0,
    beratDepan: 0,
    beratBelakang: 0,
    sessionStart: false,
  });

  useEffect(() => {
    const dataRef = ref(db, "data1"); // Ganti dengan path data yang benar
    try {
      const unsubscribe = onValue(dataRef, (snapshot) => {
        if (snapshot.exists()) {
          const fetchedData = snapshot.val();
          setData({
            sudut: fetchedData.sudut || 0,
            beratDepan: fetchedData.beratDepan || 0,
            beratBelakang: fetchedData.beratBelakang || 0,
            sessionStart: fetchedData.sessionRead || false,
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

  const handleToggle = () => {
    set(ref(db, "data1/sessionRead"), !data?.sessionStart);
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" flex flex-col pt-10 ">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 uppercase mx-10 rounded-md"
        onClick={handleToggle}
      >
        {data.sessionStart ? "Reading" : "Start Session"}
      </button>
      <div className="grid grid-cols-3  p-10 gap-10">
        <CardShow title="Sudut (°)" value={data.sudut} className="" />
        <CardShow title="Tekanan Depan  (N/m²)" value={data.beratDepan} />
        <CardShow title="Tekanan Belakang (N/m²)" value={data.beratBelakang} />
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
