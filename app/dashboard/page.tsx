import React from "react";
import { twMerge } from "tailwind-merge";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 p-10 gap-10">
      <CardShow title="kemiringan" value={100} className="col-span-2" />
      <CardShow title="tekanan depan" value={100} />
      <CardShow title="tekanan belakang" value={100} />
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
