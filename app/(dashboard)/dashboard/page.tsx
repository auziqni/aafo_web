"use client";
import React from "react";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, onValue, set } from "firebase/database";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyDOW8QCsSR-OY46z7RNJmwvCDkln29FZRQ",
  authDomain: "aafo-9b7b2.firebaseapp.com",
  databaseURL:
    "https://aafo-9b7b2-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "aafo-9b7b2",
  storageBucket: "aafo-9b7b2.appspot.com",
  messagingSenderId: "114532310730",
  appId: "1:114532310730:web:6733764d75737fb8531e33",
  measurementId: "G-68BYNQJZPL",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

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
    <div className="grid grid-cols-2 p-10 gap-10">
      <CardShow title="kemiringan" value={data.sudut} className="" />
      <CardShow title="tekanan depan" value={data.beratDepan} />
      <CardShow title="tekanan belakang" value={data.beratBelakang} />
      <button className=" text-black" onClick={handleToggle}>
        {data.sessionStart ? "session start" : "idle"}
      </button>
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
        "relative w-60 h-60  border-4 border-black flex justify-center items-center",
        className
      )}
    >
      <h3 className="absolute top-0">{title}</h3>
      <h2 className="text-8xl">{value}</h2>
    </div>
  );
}
