import React from "react";
import Image from "next/image";

export default function Contact() {
  return (
    <div className="w-full pt-32 flex justify-center">
      <div className=" w-full grid grid-cols-3 mx-20 gap-10">
        <div className="h-full w-full bg-sky-300 flex flex-col items-center gap-3 p-5 border border-slate-500 rounded-xl">
          <div className=" h-32 w-32 rounded-full relative overflow-clip">
            <Image
              src={"/contact/lokasifix.png"}
              alt="hero"
              height={128}
              width={128}
              objectFit="contain"
              priority
            />
          </div>{" "}
          <h2 className=" text-2xl font-bold">Alamat</h2>
          <p className=" text-center">
            Jl. Terusan Ryacudu, Desa Way Huwi, Jati Agung, Lampung Selatan{" "}
          </p>
        </div>
        <div className="h-full w-full bg-lime-300 flex flex-col items-center gap-3 p-5 border border-slate-500 rounded-xl">
          <div className="bg-slate-400 h-32 w-32 rounded-full relative overflow-clip">
            <Image
              src={"/contact/phonefix.png"}
              alt="hero"
              height={128}
              width={128}
              objectFit="contain"
              priority
            />
          </div>
          <h2 className=" text-2xl font-bold">Phone</h2>
          <div className=" text-center">
            <p>Dewi Nur Azizah : 085774496695</p>
            <p>Satriani S. Fasih : 081290327615</p>
            <p>Zahra Oktaviona : 082181704473</p>
          </div>
        </div>
        <div className="h-full w-full bg-rose-300 flex flex-col items-center gap-3 p-5 border border-slate-500 rounded-xl">
          <div className="bg-slate-400 h-32 w-32 rounded-full relative overflow-clip">
            <Image
              src={"/contact/mailfix.png"}
              alt="hero"
              height={128}
              width={128}
              objectFit="contain"
              priority
            />
          </div>
          <h2 className=" text-2xl font-bold">Email</h2>
          <p className=" text-center">
            dewi.120430044@student.itera.ac.id,
            satriani.120430106@student.itera.ac.id,
            zahra.120430005@student.itera.ac.id
          </p>
        </div>
      </div>
    </div>
  );
}

function Card({
  title,
  value,
  image,
}: {
  title: string;
  value: string;
  image: string;
}) {
  return (
    <div className="h-full aspect-square  flex flex-col items-center gap-3 p-5 border border-slate-500 rounded-xl">
      <div className="bg-slate-400 h-32 w-32 rounded-full">
        <Image
          src={image}
          alt="hero"
          height={128}
          width={128}
          objectFit="contain"
          priority
        />
      </div>
      <h2 className=" text-2xl font-bold">{title}</h2>
      <p>{value}</p>
    </div>
  );
}
