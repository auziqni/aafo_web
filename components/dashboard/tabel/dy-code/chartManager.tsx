import React from "react";
import ChartSingle from "./chartSingle";
import ChartDouble from "./chartDouble";

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
        <ChartDouble
          className=" w-full"
          tittle="Sudut dan Servo Angle"
          dataset={dataset}
          min={-45}
          max={90}
        />
      </div>
      <div className="grid grid-cols-12 gap-6 ">
        <ChartSingle
          className="col-span-6  w-full"
          tittle="Toe"
          dataname="beratDepan"
          dataset={dataset}
          min={100}
          max={4200}
        />
        <ChartSingle
          className="col-span-6"
          tittle="Heel"
          dataname="beratBelakang"
          dataset={dataset}
          min={100}
          max={4200}
        />
      </div>
    </div>
  );
}
