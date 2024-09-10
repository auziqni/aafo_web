import React from "react";
import Image from "next/image";

export default function Hemiparesis() {
  return (
    <div className=" flex flex-col gap-3 px-3">
      <div className=" w-40 h-40 bg-slate-500 mx-auto ">
        <Image
          src="/home/hemiparesisfixbanget.jpg"
          alt="hero"
          height={160}
          width={160}
        />
      </div>
      <p className="text-justify">
        Hemiparesis ialah kelemahan otot pada salah satu sisi tubuh, dimana pada
        pasien stroke 70-80% mengalami hemiparesis. Dari jumlah tersebut,
        sebesar 20% dapat mengalami peningkatan fungsi motorik atau kelemahan
        otot pada anggota tubuh ekstremitas jika tidak mendapatkan terapi yang
        tepat dalam rehabilitasi pasca stroke. Hemiparesis dapat terjadi baik
        disisi kiri maupun kanan pada tubuh pasien. Rata rata kekuatan otot
        yaitu pada skala 2 ( dari skala 0 - 5 ) yang dapat mencerminkan kondisi
        umum hemiparesis yang dialami pasien stroke (David Laksamana Caesar et
        al, 2019).
      </p>
    </div>
  );
}
