"use client";

import { motion } from "framer-motion";

interface Transaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
}

interface OnRampTransactionsProps {
  transactions: Transaction[];
}

export const OnRampTransactions = ({ transactions }: OnRampTransactionsProps) => {
  if (!transactions.length) {
    return (
      <div className="text-center py-6 sm:py-8">
        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800/60 to-gray-700/60 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-inner shadow-black/30 border border-gray-600/40">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm">No recent transactions</p>
      </div>
    );
  }

  transactions.sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <div className="max-h-[250px] sm:max-h-[300px] overflow-y-auto space-y-2 sm:space-y-3 pr-2 scroll-smooth scrollbar-custom">
      {transactions.map((t, index) => (
        <motion.div
          key={t.time.toISOString()}
          initial={{ opacity: 0, translateY: 10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ delay: index * 0.05, duration: 0.3 }}
          className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-gray-500/40 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-600/60 transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="text-xs sm:text-sm font-medium text-gray-200">
                Received ₹{(t.amount / 100).toLocaleString("en-IN")}
              </div>
              <div className="text-gray-400 text-xs mt-1">
                {t.time.toDateString()}
              </div>
              <div className="text-xs text-gray-500 mt-1">{t.provider}</div>
              <div className="flex items-center gap-2 mt-2">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  t.status.toLowerCase() === 'success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                  t.status.toLowerCase() === 'failure' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                  'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                }`}>
                  {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-green-400 font-semibold text-sm sm:text-lg">
                + ₹{(t.amount / 100).toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
