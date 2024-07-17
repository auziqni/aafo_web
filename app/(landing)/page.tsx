import Image from "next/image";
export default function Home() {
  return (
    <main className="">
      <div id="hero" className="relative h-screen w-screen">
        <Image
          src="https://tp.auziqni.com/aafo/heropic.png"
          alt="hero"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </main>
  );
}
