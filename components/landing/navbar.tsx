"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { useUser } from "@clerk/nextjs";

export default function Navbar() {
  //   const { isSignedIn, user, isLoaded } = useUser();
  return (
    <nav className="relative h-[64px] bg-black flex items-center justify-between px-20">
      <div id="logo" className="h-[55px] w-[213px] relative flex items-center ">
        {/* <Image
          src={`/logo.png`}
          alt="Next.js logo"
          //   height={55}
          //   width={213}
          fill
          style={{ objectFit: "contain" }}
          priority
        /> */}
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          AAFO
        </span>
      </div>

      <div>
        <ul className=" text-white flex items-center gap-6 font-grenze font-medium ">
          <li>
            <a href="#beranda">Beranda</a>
          </li>
          <li>
            <a href="#layanan">Layanan</a>
          </li>
          <li>
            <a href="#tentang">Hubungi Kami</a>
          </li>
          {/* {!isSignedIn && (
            <li>
              <a href="/sign-up">Daftar</a>
            </li>
          )} */}

          <li>
            <Link
              href={"/sign-in"}
              className="text-black py-3 px-7 bg-yellow-300 rounded-sm font-semibold"
            >
              {/* {isSignedIn ? "Dashboard" : "Masuk"} */}
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
