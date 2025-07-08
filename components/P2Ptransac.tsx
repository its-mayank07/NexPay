"use client";

import { motion } from "framer-motion";
import { P2PTransaction } from "@/app/types/transac";
import { useRouter } from "next/navigation";

interface P2PTransactionsProps {
  transactions: P2PTransaction[];
}

export function P2Ptransac({ transactions }: P2PTransactionsProps) {
  const router = useRouter();
  if (!transactions.length) {
    return (
      <div className="text-center py-6 sm:py-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800/60 to-gray-700/60 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-inner shadow-black/30 border border-gray-600/40">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm">No P2P transactions</p>
      </div>
    );
  }

  transactions.sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <div className="max-h-[250px] sm:max-h-[300px] overflow-y-auto space-y-2 sm:space-y-3 pr-2 scroll-smooth scrollbar-custom">
      {transactions.map((t, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05, duration: 0.3 }}
          className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-500/40 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-600/60 transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div onClick={() => router.push(`/p2ptransfer?sendto=${t.fromUserNumber}`)} className="flex justify-between items-start cursor-pointer ">
            <div className="flex-1">
              <div className="text-xs sm:text-sm font-medium text-gray-200">
                {t.from} → {t.to}
              </div>
              <div className="text-gray-400 text-xs mt-1">
                {t.time.toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-green-400 font-semibold text-sm sm:text-lg">
                ₹{(t.amount / 100).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
