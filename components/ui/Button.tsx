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
      className="bg-gradient-to-br from-indigo-600 via-indigo-500 to-blue-500 text-white font-semibold rounded-xl text-sm sm:text-base px-4 sm:px-6 py-2 sm:py-2.5 shadow-md hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200 active:scale-95"
    >
      {children}
    </button>
  );
};
