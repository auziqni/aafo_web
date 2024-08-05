import Image from "next/image";
import { Gauge, Shapes } from "lucide-react";

export default function Home() {
  return (
    <main className="">
      <div id="hero" className="relative h-screen w-screen  bg-white ">
        <div className="relative h-5/6 bg-[#37517E] ">
          <Image
            src="/landing/hero.png"
            alt="hero"
            objectFit="contain"
            width={600}
            height={600}
            priority
            className="absolute top-1/2 -translate-y-1/2 right-20"
          />
          <div className="absolute top-1/3 ml-20 ">
            <h1 className="text-white text-6xl font-bold ">AAFO</h1>
            <p className="text-white text-2xl font-semibold">
              Active Ankle Foot Orthosis
            </p>
          </div>
        </div>
      </div>

      <div id="layanan" className="flex flex-col  items-center  gap-10  ">
        <h2 className=" font-bold text-4xl text-[#37517E] ">Layanan</h2>
        <p className="max-w-3xl text-center">
          Layanan website AAFO memanfaatkan teknologi seperti sensor, dan
          analitik data untuk memberikan hasil real time terhadap pengukuran
          sudut, tekanan epan, dan tekanan belakang untuk memantau hasil
          perkembangan penderita.
        </p>
        <div className=" flex gap-5 ">
          <div className="bg-white rounded-lg shadow-lg p-4 w-[244px] h-[330px] flex flex-col gap-8 items-center">
            <Gauge className="h-24 w-24 mr-3" />
            <div className="flex flex-col gap-1 items-center">
              <h3 className="text-xl text-center font-semibold text-[#37517E]">
                Sudut
              </h3>
              <p className=" text-center">
                Sudut dan Servo Angle diukur dalam satuan (°)
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 w-[244px] h-[330px] flex flex-col gap-8 items-center">
            <Shapes className="h-24 w-24 mr-3" />
            <div className="flex flex-col gap-1 items-center">
              <h3 className="text-xl text-center font-semibold text-[#37517E]">
                Tekanan Depan (Toe)
              </h3>
              <p className=" text-center">Toe diukur dalam satuan (N/m²)</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-4 w-[244px] h-[330px] flex flex-col gap-8 items-center">
            <Shapes className="h-24 w-24 mr-3" />
            <div className="flex flex-col gap-1 items-center">
              <h3 className="text-xl text-center font-semibold text-[#37517E]">
                Tekanan Belakang (Heel)
              </h3>
              <p className=" text-center">Heel diukur dalam satuan (N/m²)</p>
            </div>
          </div>
        </div>
      </div>

      <div
        id="tentang"
        className="flex  relative w-full justify-center gap-10 my-20 "
      >
        <div className=" w-2/5 h-[503px] relative">
          <Image
            src={`https://tp.auziqni.com/aafo/landing/about.png`}
            alt="Next.js logo"
            fill
            style={{ objectFit: "contain" }}
            className=""
          />
        </div>
        <div className=" w-2/5 h-[503px] my-10 ">
          <h2 className="font-bold text-4xl mb-5 text-[#37517E]">
            TENTANG KAMI
          </h2>
          <p className=" text-justify">
            Active ankle foot orthosis merupakan sebuah alat bantu yang
            dirancang untuk membantu individu dengan gangguan pergerakan kaki,
            seperti penderita stroke yang mengalami hemiparesis
          </p>
          <p className=" text-justify">
            Website ini membantu untuk memantau perkembangan sudut, servo angle,
            tekanan depan serta tekanan belakang secara real time
          </p>
          <div className="grid grid-cols-2 px-10 mt-10">
            <div className="col-span-1">
              <h3 className="font-bold">Tim</h3>
              <p className="hover:text-yellow-600">Dewi Nur Azizah</p>
              <p className="hover:text-yellow-600">Satriani Syarma Fasih</p>
              <p className="hover:text-yellow-600">Zahra Oktaviona</p>
            </div>
            <div className="col-span-1">
              <h3 className="font-bold">alamat</h3>
              <p>
                Alamat Jl. Terusan Ryacudu, Way Huwi, Kec. Jati Agung, Kabupaten
                Lampung Selatan, Lampung 35365
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// function CardLayanan({ url, title, description, icon }: CardLayananProps) {
//   return (
//     <div className="bg-white rounded-lg shadow-lg p-4 w-[244px] h-[330px] flex flex-col gap-8 items-center">
//       {/* <Image src={url} alt={title} width={120} height={120} /> */}
//       <icon className={cn("h-5 w-5 mr-3", route.color)} />
//       <div className="flex flex-col gap-1 items-center">
//         <h3 className="text-xl text-center font-semibold">{title}</h3>
//         <p className=" text-center">{description}</p>
//       </div>
//     </div>
//   );
// }
