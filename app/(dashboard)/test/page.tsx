"use client";
import React, { useState, useEffect } from "react";
import { db, ref, onValue, set, get } from "@/lib/firebase-config";

interface DataProps {
  sudut: number;
  beratDepan: number;
  beratBelakang: number;
}

export default function Test() {
  const [data, setData] = useState<DataProps[]>([]);
  const [isFinish, setIsFinish] = useState(false);
  const [clickGetData, setClickGetData] = useState(false);

  const handleShowAll = () => {
    data.forEach((item) => {
      console.log(item);
    });
  };

  const handlerClick = () => {
    setData((prev) => [
      ...prev,
      {
        sudut: 123,
        beratDepan: 123,
        beratBelakang: 123,
      },
    ]);
  };

  const handleClear = () => {
    setData([]);
  };

  const GetDataFirebase = async () => {
    const getdata = await get(ref(db, "dataNew"));
    if (getdata.exists()) {
      const data: DataProps = {
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

  const handleClickGetOnce = async () => {
    await GetDataFirebase();
  };

  const handleGetDataFirebase = async () => {
    setData([]);
    setClickGetData(true);
  };

  //   useEffect(() => {
  //     if (clickGetData) {
  //       GetDataFirebase();

  //       setClickGetData(false);
  //     }
  //     console.log(data); // Menampilkan data terbaru ketika `data` berubah
  //   }, [data, clickGetData]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (clickGetData && data.length < 5) {
      intervalId = setInterval(() => {
        GetDataFirebase();
      }, 1000);
    }

    console.log(data); // Menampilkan data terbaru ketika `data` berubah
    return () => {
      if (intervalId) {
        clearInterval(intervalId); // Clear interval when component unmounts or when dependencies change
      }
    };
  }, [data, clickGetData]);

  return (
    <div className=" flex-col flex gap-5">
      {/* <Buttonclick /> */}
      <button onClick={handleShowAll}>show</button>
      <button onClick={handleClear}>claer</button>
      <button onClick={handlerClick}>button add mock</button>
      <button onClick={handleClickGetOnce}>get once</button>
      <button onClick={handleGetDataFirebase}> get data firebase</button>
    </div>
  );
}
