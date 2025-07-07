"use client";
import { useRouter } from "next/navigation";

export function DashboardQuickActions() {
  const router = useRouter();

  return (
    <div className="p-3 sm:p-6 space-y-2 sm:space-y-4">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h2 className="text-sm sm:text-lg font-semibold text-gray-200">Quick Actions</h2>
      </div>
      
      <button
        onClick={() => router.push("/p2ptransfer")}
        className="w-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:from-blue-500 hover:via-blue-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_12px_24px_rgba(59,130,246,0.4)] shadow-[0_8px_16px_rgba(59,130,246,0.3)] border border-blue-500/30 backdrop-blur-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
        </svg>
        Send Money
      </button>
      
      <button
        onClick={() => router.push("/transactions")}
        className="w-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 text-gray-200 py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] shadow-[0_8px_16px_rgba(0,0,0,0.3)] border border-gray-500/30 backdrop-blur-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        View Transactions
      </button>
      
      <button
        onClick={() => router.push("/transfer")}
        className="w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl hover:from-green-500 hover:via-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-[0_12px_24px_rgba(34,197,94,0.4)] shadow-[0_8px_16px_rgba(34,197,94,0.3)] border border-green-500/30 backdrop-blur-sm font-medium flex items-center justify-center gap-1.5 sm:gap-2 text-sm sm:text-base"
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
        Bank Transfer
      </button>
    </div>
  );
}
