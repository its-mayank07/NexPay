"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const TopBarItem = ({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <div
      className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 lg:px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 flex-1 justify-center outline-none focus:outline-none
        ${selected 
          ? "bg-gray-700/60 text-white shadow-inner shadow-black/30 border border-gray-600/50" 
          : "text-gray-300 hover:bg-gray-700/40 hover:text-white border border-transparent"
        }
      `}
      onClick={() => router.push(href)}
    >
      <div className="text-lg">{icon}</div>
      <div className="font-medium text-xs sm:text-sm lg:text-base hidden sm:block">{title}</div>
    </div>
  );
};
