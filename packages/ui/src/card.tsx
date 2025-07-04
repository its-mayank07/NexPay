import React from "react";

export function Card({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div
      className="border p-6 bg-white rounded-xl bg-[#ededed]"
    >
      <h1 className="text-xl border-b pb-2 font-semibold text-slate-800 mb-1">
        {title}
      </h1>
      <div className="text-base leading-relaxed mb-2">{children}</div>
    </div>
  );
}
