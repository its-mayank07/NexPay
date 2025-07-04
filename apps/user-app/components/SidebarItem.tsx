"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export const SidebarItem = ({
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
      className={`flex items-center gap-3 px-6 py-2 rounded-lg cursor-pointer transition-colors
        ${selected ? " text-indigo-600" : "text-slate-600 hover:bg-slate-100 hover:text-indigo-600"}
      `}
      onClick={() => router.push(href)}
    >
      <div className="text-xl">{icon}</div>
      <div className="font-medium">{title}</div>
    </div>
  );
};
