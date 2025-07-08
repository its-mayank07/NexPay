"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="bg-gradient-to-br from-green-600 via-emerald-600 to-green-700 text-white font-semibold rounded-xl text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 shadow-md hover:from-green-900 hover:to-emerald-900 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-offset-2 transition-all duration-200 active:scale-95"
    >
      {children}
    </button>
  );
};
