import React from "react";
import Image from "next/image";

export default function NavbarrDashboard() {
  return (
    <div className="bg-white shadow-lg text-black h-[64px] py-2 justify-between flex px-6 ">
      <Image
        src="/logobiomedis.png"
        alt="hero"
        height={50}
        width={50}
        objectFit="contain"
        priority
      />

      <Image
        src="/logoitera.jpg"
        alt="hero"
        height={50}
        width={43}
        objectFit="contain"
        priority
      />
    </div>
  );
}
