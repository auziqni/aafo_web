import React from "react";
import Image from "next/image";

export default function Polaberjalan() {
  return (
    <div className=" flex flex-col gap-3 px-3">
      <div className="   bg-slate-500 mx-auto ">
        <Image
          src="/home/gait.jpg"
          alt="hero"
          height={160}
          width={480}
          objectFit="contain"
        />
      </div>
      <p className="text-justify">
        Gait cycle adalah serangkaian pergerakan yang dilakukan oleh tubuh
        manusia selama berjalan, yang mencakup semua tahapan mulai dari saat
        satu kaki menyentuh tanah hingga kaki yang sama menyentuh tanah kembali.
        Gait cycle terbagi menjadi dua fase utama: stance phase dan swing phase.
        Stance phase terjadi ketika kaki berada di tanah, menopang berat badan,
        dan terdiri dari sub-fase seperti heel strike (saat tumit menyentuh
        tanah), foot flat (saat seluruh kaki berada di tanah), midstance (saat
        tubuh melewati kaki yang berdiri), heel off (saat tumit mulai
        terangkat), dan toe off (saat jari-jari kaki terakhir meninggalkan
        tanah). Setelah itu, swing phase dimulai, di mana kaki bergerak maju
        melalui udara untuk mempersiapkan siklus berikutnya.
      </p>
    </div>
  );
}
