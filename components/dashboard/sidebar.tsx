"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Nfc,
  Settings,
  Activity,
  Footprints,
  UserRound,
  Power,
} from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
import { use } from "react";
// import { FreeCounter } from "@/components/free-counter";
import { SignOutButton } from "@clerk/nextjs";

const routes = [
  {
    label: "Home",
    icon: Footprints,
    href: "/home",
    color: "text-sky-500",
  },
  {
    label: "Monitoring",
    icon: Activity,
    href: "/monitoring",
    color: "text-violet-500",
  },
  {
    label: "Pasien",
    icon: UserRound,
    href: "/pasien",
    color: "text-amber-500",
  },
  {
    label: "Contact Us",
    icon: Nfc,
    href: "/contact",
    color: "white",
  },
];

export default function SidebarDashboard({
  className,
}: {
  className?: string;
}) {
  const pathname = usePathname();
  return (
    <div
      id="sidebar"
      className={twMerge(
        " sticky top-0 h-screen min-w-60 z-10 bg-[#37517E] lg:flex flex-col  justify-between pb-10 items-center gap-3",
        className
      )}
    >
      <div className=" w-full flex flex-col">
        <div
          id="sidebar-header"
          className="w-[90%] py-5 flex flex-col gap-2 items-center  border-b-2 border-slate-400 relative"
        >
          <div className=" text-white text-center">
            <h1 className="font-bold">AAFO</h1>
            <span>Active Ankle Foot Orthosis</span>
          </div>
          <Link href="/">
            <Image
              src={`/logoaafofix.jpg`}
              alt="Next.js logo"
              height={150}
              width={150}
              style={{ objectFit: "contain" }}
              priority
              className=""
            />
          </Link>
        </div>
        <div id="sidebar-content" className=" w-[90%] ">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className=" w-full h-10 p-3 text-white">
        <SignOutButton>
          <div className="flex text-red-200 cursor-pointer">
            <Power className="h-5 w-5 mr-3" />
            Sign Out
          </div>
        </SignOutButton>
        {/* <SignOutButton /> */}
      </div>
    </div>
  );
}
