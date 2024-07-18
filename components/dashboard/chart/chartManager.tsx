import React from "react";
import ChartSingle from "@/components/dashboard/chart/chartSingle";

export default function ChartManager({
  pengukuranPasien,
}: {
  pengukuranPasien: PengukuranData[];
}) {
  return (
    <div className=" grid grid-cols-12">
      <ChartSingle
        className="col-span-4 "
        tittle="Sudut"
        data={pengukuranPasien}
        min={-20}
        max={70}
      />
      <ChartSingle
        className="col-span-4"
        tittle="Berat Depan"
        data={pengukuranPasien}
        min={100}
        max={4200}
      />
      <ChartSingle
        className="col-span-4"
        tittle="Berat Depan"
        data={pengukuranPasien}
        min={100}
        max={4200}
      />
    </div>
  );
}
