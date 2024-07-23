import Image from "next/image";
import React from "react";

export default function About() {
  return (
    <div className=" flex flex-col gap-3">
      <CardTim
        nama="Dewi Nur Azizah "
        nim="120430044"
        image="/people/dewi.png"
        subsistem="Subsistem Kendali dan Kontrol"
      />
      <CardTim
        nama="Satriani Syarma Fasih"
        nim="120430106"
        image="/people/satriani.png"
        subsistem="Subsistem Monitoring"
      />
      <CardTim
        nama="Zahra Oktaviona"
        nim="120430005"
        image="/people/zahra.png"
        subsistem="Subsistem Instrumentasi"
      />
    </div>
  );
}

function CardTim({
  nama,
  nim,
  image,
  subsistem,
}: {
  nama: string;
  nim: string;
  image: string;
  subsistem: string;
}) {
  return (
    <div className="flex items-center gap-3 shadow-md rounded-lg p-3">
      {/* <img src={image} alt={title} className="w-32 h-32 rounded-full" /> */}
      <div className="w-24 h-24 bg-slate-500 rounded-full overflow-clip">
        <Image alt={nama} src={image} height={96} width={96} />
      </div>
      <div className=" flex flex-col ">
        <h1 className="text-xl font-bold mt-4">{nama}</h1>
        <h1 className="text-lg ">{nim}</h1>
        <h1 className="text-lg">{subsistem}</h1>
      </div>
    </div>
  );
}
