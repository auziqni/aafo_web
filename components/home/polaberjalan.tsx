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
        Program Studi Teknik Biomedis ITERA memiliki visi keilmuan untuk
        berkontribusi pada pengembangan sumber daya manusia serta inovasi
        teknologi biomedis yang unggul di tingkat nasional, regional, dan
        internasional dengan keunikan program studi yang meliputi bidang
        peminatan Instrumentasi dan Pengolahan Citra Biomedis serta peminatan
        Biomaterial dan Rekayasa Jaringan. Dari sisi sistem atau bahan yang
        menjadi fokus kajian, baik dalam kelas maupun tugas akhir, kajian akan
        berfokus pada sistem, perangkat, bahan, maupun kondisi infrastruktur
        fasilitas kesehatan di Pulau Sumatera. Inovasi di bidang teknik biomedis
        dengan memperhatikan potensi lokal sumber daya di wilayah Sumatera akan
        menjadi keunggulan dari Program Studi Teknik Biomedis ITERA. Oleh karena
        itu, lulusan program studi Teknik Biomedis ITERA diharapkan mampu
        mengisi kebutuhan sumber daya manusia di wilayah Sumatera serta mampu
        bersaing pada tingkat regional, nasional dan internasional.
      </p>
    </div>
  );
}
