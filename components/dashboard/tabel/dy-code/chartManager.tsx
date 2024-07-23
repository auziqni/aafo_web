import React from "react";
import ChartSingle from "./chartSingle";

export default function ChartManager({
  pengukuranPasien,
}: {
  pengukuranPasien: PengukuranData[];
}) {
  // const dataset sclice last 5 data
  const dataset = pengukuranPasien.slice(-5);
  return (
    <div className=" flex flex-col  gap-6">
      <div className=" relative w-full h-[320px] ">
        <ChartSingle
          className=" w-full"
          tittle="Sudut"
          dataname="sudut"
          dataset={dataset}
          min={-20}
          max={70}
        />
      </div>
      <div className="grid grid-cols-12 gap-6 ">
        <ChartSingle
          className="col-span-6  w-full"
          tittle="Berat Depan"
          dataname="beratDepan"
          dataset={dataset}
          min={100}
          max={4200}
        />
        <ChartSingle
          className="col-span-6"
          tittle="Berat Depan"
          dataname="beratBelakang"
          dataset={dataset}
          min={100}
          max={4200}
        />
      </div>
    </div>
  );
}
