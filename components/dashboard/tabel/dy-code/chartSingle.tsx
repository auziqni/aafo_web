"use client";
import React, { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import dynamic from "next/dynamic";

// Gunakan dynamic import untuk menghindari masalah SSR
import { ApexOptions } from "apexcharts";
const ApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => <ChartLoading />,
});

const ChartLoading = () => (
  <div className="flex items-center justify-center h-64">
    <div className="animate-spin rounded-full h-12 w-full border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

export default function ChartSingle({
  tittle,
  dataset,
  dataname,
  min,
  max,
  className,
  stylechart,
  suffix,
}: {
  tittle: string;
  dataset: PengukuranData[];
  dataname?: "sudut" | "beratDepan" | "beratBelakang";
  min?: number;
  max?: number;
  className?: string;
  stylechart?: string;
  suffix?: string;
}) {
  const series = [
    {
      name: tittle,
      data: dataset.map((item) => switchDataName(item, dataname)),
      type: "line",
    },
  ];

  const options: ApexOptions = {
    chart: {
      id: "basic-bar",
      width: "100%",
    },

    xaxis: {
      categories: dataset.map((item) => formatToIndonesiaTime(item.timeStamp)),
      labels: {
        formatter: function (value) {
          return value;
        },
      },
    },
    yaxis: {
      min: min,
      max: max,
      labels: {
        formatter: function (value) {
          return value.toString() + (suffix || "");
        },
      },
    },
    tooltip: {
      shared: false,
      intersect: true,
    },
    markers: {
      size: 6,
    },
    stroke: {
      curve: "monotoneCubic",
    },
  };
  return (
    <div
      className={twMerge(
        "relative w-full flex flex-col justify-center h-fit gap-5 shadow-md ",
        className
      )}
    >
      <h1 className=" font-bold text-xl p-3">{tittle}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ApexChart
          options={options}
          series={series}
          type="line"
          height="150%"
          width={stylechart || "100%"}
        />
      </Suspense>
    </div>
  );
}

const switchDataName = (item: PengukuranData, dataname?: string) => {
  switch (dataname) {
    case "sudut":
      return item.sudut;
    case "beratDepan":
      return item.beratDepan;
    case "beratBelakang":
      return item.beratBelakang;
    default:
      return item.sudut;
  }
};

const formatToIndonesiaTime = (isoString: string) => {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Jakarta", // WIB (UTC+7)
    // day: "2-digit",
    // month: "2-digit",
    // year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const waktu: string = new Intl.DateTimeFormat("id-ID", options).format(date);

  return waktu;
};
