import React from "react";
import ChartSingle from "./chartSingle";
import ChartDouble from "./chartDouble";

export default function ChartManager({
  pengukuranPasien,
}: {
  pengukuranPasien: PengukuranData[];
}) {
  // const dataset sclice last 5 data
  const dataset = pengukuranPasien.slice(-300);
  return (
    <div className=" flex flex-col  gap-6">
      {/* <div className=" relative w-full h-[320px] ">
        <ChartDouble
          className=" w-full"
          tittle="Sudut"
          dataset={dataset}
          min={-45}
          max={90}
        />
      </div> */}
      {/* <div className="grid grid-cols-12 gap-6 "> */}
      <ChartSingle
        className="col-span-6  w-full"
        tittle="Sudut"
        dataname="sudut"
        dataset={dataset}
        min={-45}
        max={90}
      />
      <ChartSingle
        className="col-span-6  w-full"
        tittle="Toe (N/m²)"
        dataname="beratDepan"
        dataset={dataset}
        min={100}
        max={2985}
      />
      <ChartSingle
        className="col-span-6"
        tittle="Heel (N/m²)"
        dataname="beratBelakang"
        dataset={dataset}
        min={100}
        max={3271}
      />
      {/* </div> */}
    </div>
  );
}
