"use client";

import { OnRampTransactions } from "./OnRampTransactions";
import { P2Ptransac } from "./P2Ptransac";
import { RampTransaction, P2PTransaction } from "@/app/types/transac";




interface AllTransactionsProps {
  Ramptransactions: RampTransaction[];
  P2Ptransactions: P2PTransaction[];
}

function AllTransactions({
  Ramptransactions,
  P2Ptransactions,
}: AllTransactionsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
      {/* Bank Transfers Section */}
      <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1">
        <div className="p-3 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <h2 className="text-base sm:text-xl font-semibold text-gray-200">Bank Transfers</h2>
          </div>
          <OnRampTransactions transactions={Ramptransactions} />
        </div>
      </div>

      {/* Peer Transfers Section */}
      <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1">
        <div className="p-3 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-base sm:text-xl font-semibold text-gray-200">Peer Transfers</h2>
          </div>
          <P2Ptransac transactions={P2Ptransactions} />
        </div>
      </div>
    </div>
  );
}

export default AllTransactions;
