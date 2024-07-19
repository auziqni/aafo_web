import Image from "next/image";

interface CardLayananProps {
  url: string;
  title: string;
  description: string;
}

const cardLayanan: CardLayananProps[] = [
  {
    url: "/icon/map.png",
    title: "Lokasi",
    description: "Pemantauan lokasi yang akurat menggunkana saltelit",
  },
  {
    url: "/icon/tilt.png",
    title: "Kemiringan",
    description: "Pemantauan kemiringan tiang listrik secara akurat",
  },
  {
    url: "/icon/pressure.png",
    title: "Tekanan Udara ",
    description: "Pemantauan tekanan udara  secara akurat",
  },
  {
    url: "/icon/humidity.png",
    title: "Kelembaban Tanah",
    description: "Pemantauan kelembaban tanah  secara akurat",
  },
];

export default function Home() {
  return (
    <main className="">
      <div id="hero" className="relative h-screen w-screen">
        <Image
          src="https://tp.auziqni.com/aafo/heropic.png"
          alt="hero"
          layout="fill"
          objectFit="cover"
          priority
        />
        <div className="absolute top-1/3 ml-20 fle">
          <h1 className="text-white text-6xl font-bold ">AAFO</h1>
          <p className="text-white text-2xl font-semibold">
            Aplikasi Alat Bantu Foot Orthosis
          </p>
        </div>
      </div>

      <div id="layanan" className="flex flex-col  items-center mt-20 gap-10">
        <h2 className=" font-bold text-4xl">Layanan</h2>
        <div className=" flex gap-5 ">
          {cardLayanan.map((card, index) => (
            <CardLayanan key={index} {...card} />
          ))}
        </div>
      </div>

      <div
        id="tentang"
        className="flex  relative w-full justify-center gap-10 my-20"
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
          <h2 className="font-bold text-4xl mb-5 ">TENTANG KAMI</h2>
          <p className=" text-justify">
            AAFO adalah teknologi biomedis yang digunakan unutk merehabilitasi
            kaki penderita stroke. aafo menggunakan teknologi sensor yang
            terpasang pada sepatu pasien untuk mengukur sudut kaki pasien saat
            berjalan. Data yang dihasilkan oleh sensor akan diolah oleh sistem
            cerdas untuk memberikan informasi yang berguna bagi dokter dan
            pasien.
          </p>
          <p className=" text-justify">
            AAFO adalah teknologi biomedis yang digunakan unutk merehabilitasi
            kaki penderita stroke. aafo menggunakan teknologi sensor yang
            terpasang pada sepatu pasien untuk mengukur sudut kaki pasien saat
            berjalan. Data yang dihasilkan oleh sensor akan diolah oleh sistem
            cerdas untuk memberikan informasi yang berguna bagi dokter dan
            pasien.
          </p>
          <div className="grid grid-cols-2 px-10 mt-10">
            <div className="col-span-1">
              <h3 className="font-bold">Tim</h3>
              <p className="hover:text-yellow-600">nama1</p>
              <p className="hover:text-yellow-600">nama2</p>
              <p className="hover:text-yellow-600">nama3</p>
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

function CardLayanan({ url, title, description }: CardLayananProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 w-[244px] h-[330px] flex flex-col gap-8 items-center">
      <Image src={url} alt={title} width={120} height={120} />
      <div className="flex flex-col gap-1 items-center">
        <h3 className="text-xl text-center font-semibold">{title}</h3>
        <p className=" text-center">{description}</p>
      </div>
    </div>
  );
}
