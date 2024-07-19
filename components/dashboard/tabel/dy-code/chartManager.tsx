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
    <div className=" grid grid-cols-12">
      <ChartSingle
        className="col-span-4 "
        tittle="Sudut"
        dataname="sudut"
        dataset={dataset}
        min={-20}
        max={70}
      />
      <ChartSingle
        className="col-span-4"
        tittle="Berat Depan"
        dataname="beratDepan"
        dataset={dataset}
        min={100}
        max={4200}
      />
      <ChartSingle
        className="col-span-4"
        tittle="Berat Depan"
        dataname="beratBelakang"
        dataset={dataset}
        min={100}
        max={4200}
      />
    </div>
  );
}
