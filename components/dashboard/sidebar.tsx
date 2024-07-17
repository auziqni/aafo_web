"use client";

import Link from "next/link";
import Image from "next/image";
import { MapIcon, LayoutDashboard, ArrowDownUp, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { twMerge } from "tailwind-merge";
// import { FreeCounter } from "@/components/free-counter";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Tabel",
    icon: MapIcon,
    href: "/tabel",
    color: "text-violet-500",
  },
  {
    label: "Setting",
    icon: Settings,
    href: "/setting",
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
        "sticky top-0 h-screen min-w-60 z-10 bg-black lg:flex flex-col items-center gap-3",
        className
      )}
    >
      <div
        id="sidebar-header"
        className="w-[90%] h-48 bg-[#000000]  border-b-2 border-slate-400 relative"
      >
        <Link href="/">
          <Image
            src={`/logo.png`}
            alt="Next.js logo"
            fill
            style={{ objectFit: "contain" }}
            priority
            className="transform scale-75"
          />
        </Link>
      </div>
      <div id="sidebar-content" className=" w-[90%] bg-black">
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
  );
}
