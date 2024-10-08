import React from "react";
import Image from "next/image";

export default function Designalat() {
  return (
    <div className=" flex flex-col gap-3 px-3">
      <div className="  bg-slate-500 mx-auto ">
        <Image src="/home/aafo.jpg" alt="hero" height={160} width={220} />
      </div>
      <p className="text-justify">
        Active ankle foot orthosis ( AAFO ) terdiri dari beberapa komponen yang
        saling terintegrasi seperti motor servo, ESP Wemos Lolin 32 sebagai
        mikrokontroller, MPU6050, serta Force Sensing Resistor
      </p>
    </div>
  );
}
