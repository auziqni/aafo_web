"use client";
import React from "react";
import { Suspense, useState } from "react";
import { twMerge } from "tailwind-merge";
import About from "@/components/home/about";
import DesignAlat from "@/components/home/designalat";
import Hemiparesis from "@/components/home/hemiparesis";
import PolaBerjalan from "@/components/home/polaberjalan";

interface SelectSectionProps {
  id: string;
  tittle: string;
  SelectedSection: string;
  className?: string;
  onClick: () => void;
}

export default function Home() {
  const [selected, setSelected] = useState("about");
  return (
    <div>
      <div id="data" className="grid grid-cols-3 gap-3 mx-3 my-6">
        <CardData
          mainvalue="2020"
          subvalue="1.789.261"
          title="Penderita Stroke di Indonesia"
          className="bg-blue-200"
        />
        <CardData
          mainvalue="81.2%"
          subvalue="618 Penderita"
          title="Stroke Non-Hemoragik"
          className="bg-green-200"
        />
        <CardData
          mainvalue="10.8%"
          subvalue="143 Penderita"
          title="Stroke Hemoragik"
          className="bg-red-200"
        />
      </div>
      <div id="info" className="flex gap-6 m-6">
        <div className="flex-1 border flex flex-col gap-3 rounded-md">
          <h1 className=" font-bold p-3 text-lg">Teknik Biomedis Itera</h1>
          <div className=" bg-slate-500 w-40  h-40 mx-auto "></div>
          <div className=" flex flex-col gap-2 text-justify px-3">
            <p>
              Program Studi Teknik Biomedis (PS BM) merupakan salah satu program
              studi di Institut Teknologi Sumatera (ITERA) yang resmi dibuka
              pada tahun 2019 dengan diterbitkannya SK Menteri Riset, Teknologi,
              dan Pendidikan Tinggi Nomor 694/KPT/I/2019 tentang izin pembukaan
              Program Studi Teknik Biomedis program sarjana pada Institut
              Teknologi Sumatera. Pendirian PS BM akan mendukung visi dan misi
              ITERA dalam memenuhi ketersediaan sumber daya manusia di bidang
              Teknik Biomedis khususnya di wilayah Sumatera.
            </p>
            <p>
              Program Studi Teknik Biomedis ITERA memiliki visi keilmuan untuk
              berkontribusi pada pengembangan sumber daya manusia serta inovasi
              teknologi biomedis yang unggul di tingkat nasional, regional, dan
              internasional dengan keunikan program studi yang meliputi bidang
              peminatan Instrumentasi dan Pengolahan Citra Biomedis serta
              peminatan Biomaterial dan Rekayasa Jaringan. Dari sisi sistem atau
              bahan yang menjadi fokus kajian, baik dalam kelas maupun tugas
              akhir, kajian akan berfokus pada sistem, perangkat, bahan, maupun
              kondisi infrastruktur fasilitas kesehatan di Pulau Sumatera.
              Inovasi di bidang teknik biomedis dengan memperhatikan potensi
              lokal sumber daya di wilayah Sumatera akan menjadi keunggulan dari
              Program Studi Teknik Biomedis ITERA. Oleh karena itu, lulusan
              program studi Teknik Biomedis ITERA diharapkan mampu mengisi
              kebutuhan sumber daya manusia di wilayah Sumatera serta mampu
              bersaing pada tingkat regional, nasional dan internasional.
            </p>
          </div>
        </div>
        <div className="flex-1  border flex flex-col gap-3 rounded-md">
          <h1 className=" font-bold p-3 text-lg">AAFO</h1>
          <div className=" flex flex-col gap-3">
            <div className=" flex gap-5">
              <SelectSection
                id="about"
                tittle="Tentang AAFO"
                SelectedSection={selected}
                onClick={() => setSelected("about")}
              />
              <SelectSection
                id="hemiparesis"
                tittle="Hemiparesis"
                SelectedSection={selected}
                onClick={() => setSelected("hemiparesis")}
              />
              <SelectSection
                id="polaberjalan"
                tittle="Pola Berjalan"
                SelectedSection={selected}
                onClick={() => setSelected("polaberjalan")}
              />
              <SelectSection
                id="designalat"
                tittle="Design Alat"
                SelectedSection={selected}
                onClick={() => setSelected("designalat")}
              />
            </div>

            <ShowSection SelectedSection={selected} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SelectSection({
  id,
  tittle,
  SelectedSection,
  className,
  onClick,
}: SelectSectionProps) {
  return (
    <button
      id={id}
      onClick={onClick}
      className={twMerge(
        `border border-white px-5 bg-white text-blue-500 rounded-xl `,
        className,
        SelectedSection === id ? " font-bold text-black  border-2" : ""
      )}
    >
      {tittle}
    </button>
  );
}

function ShowSection({ SelectedSection }: { SelectedSection: string }) {
  switch (SelectedSection) {
    case "about":
      return <About />;
    case "hemiparesis":
      return <Hemiparesis />;
    case "polaberjalan":
      return <PolaBerjalan />;
    case "designalat":
      return <DesignAlat />;
    default:
      return <About />;
  }
}

function CardData({
  mainvalue,
  subvalue,
  title,
  className,
}: {
  mainvalue: string;
  subvalue: string;
  title: string;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-3 p-3 border rounded-lg ",
        className
      )}
    >
      <h2 className=" text-3xl font-bold">{mainvalue}</h2>
      <div className="flex flex-col">
        <h3>{subvalue}</h3>
        <h3>{title}</h3>
      </div>
    </div>
  );
}
