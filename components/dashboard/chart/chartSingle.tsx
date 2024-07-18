import React from "react";
import { twMerge } from "tailwind-merge";

export default function ChartSingle({
  tittle,
  data,
  min,
  max,
  range,
  datainrange,
  className,
}: {
  tittle: string;
  data: PengukuranData[];
  min?: number;
  max?: number;
  range?: number;
  datainrange?: number;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "w-full bg-red-50 h-10 flex justify-center",
        className
      )}
    >
      ChartSIngle
    </div>
  );
}
