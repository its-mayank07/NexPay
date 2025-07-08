"use client"

import { P2PTransaction } from "@/app/types/transac";
import { useRouter } from "next/navigation";

export function RecentP2Ptransac({ p2pTransactions }: { p2pTransactions: P2PTransaction[] }) {
    const router = useRouter();
  return (
    <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-transform duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-sm sm:text-lg font-semibold text-gray-200">
                P2P Transfers
              </h2>
            </div>
            
            {p2pTransactions.length === 0 ? (
              <div className="text-center py-4 sm:py-8">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800/60 to-gray-700/60 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-inner shadow-black/30 border border-gray-600/40">
                  <svg className="w-5 h-5 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">No recent P2P transfers.</p>
              </div>
            ) : (
              <div className="space-y-1.5 sm:space-y-3">
                {p2pTransactions.slice(0, 3).map((txn: P2PTransaction, i: number) => (
                  <div onClick={() => router.push(`/p2ptransfer?sendto=${txn.fromUserNumber}`)} key={i}  className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-gray-500/40 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-600/60 transition-all cursor-pointer duration-300 transform hover:scale-[1.02]">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-1 sm:gap-2">
                          <span className="text-gray-300 text-sm sm:text-base">{txn.from}</span>
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                          <span className="text-gray-300 text-sm sm:text-base">{txn.to}</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-1">{txn.time.toDateString()}</p>
                      </div>
                      <p className="text-green-400 font-semibold text-base sm:text-lg drop-shadow-sm">
                        ₹{(txn.amount / 100).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
  );
}