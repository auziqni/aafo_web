import React from "react";
import Image from "next/image";

export default function Designalat() {
  return (
    <div className=" flex flex-col gap-3 px-3">
      <div className="  bg-slate-500 mx-auto ">
        <Image src="/home/aafo.jpg" alt="hero" height={160} width={220} />
      </div>
      <p className="text-justify">
        Active ankle foot orthosis (AAFO) terdiri dari beberapa komponen yang
        saling terintegrasi seperti motor servo, mESP Wmos lolin32 sebagai
        kontroller, MPU6050, serta FSR
      </p>
    </div>
  );
}
