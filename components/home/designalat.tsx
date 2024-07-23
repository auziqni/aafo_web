import React from "react";
import Image from "next/image";

export default function Designalat() {
  return (
    <div className=" flex flex-col gap-3 px-3">
      <div className="  bg-slate-500 mx-auto ">
        <Image src="/home/aafo.jpg" alt="hero" height={160} width={220} />
      </div>
      <p className="text-justify">
        Program Studi Teknik Biomedis (PS BM) merupakan salah satu program studi
        di Institut Teknologi Sumatera (ITERA) yang resmi dibuka pada tahun 2019
        dengan diterbitkannya SK Menteri Riset, Teknologi, dan Pendidikan Tinggi
        Nomor 694/KPT/I/2019 tentang izin pembukaan Program Studi Teknik
        Biomedis program sarjana pada Institut Teknologi Sumatera. Pendirian PS
        BM akan mendukung visi dan misi ITERA dalam memenuhi ketersediaan sumber
        daya manusia di bidang Teknik Biomedis khususnya di wilayah Sumatera.
      </p>
    </div>
  );
}
