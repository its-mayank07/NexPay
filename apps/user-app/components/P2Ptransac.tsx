"use client";

import { Card } from "@repo/ui/card";
import { motion } from "framer-motion";

interface P2PTransaction {
  time: Date;
  amount: number;
  from: string;
  to: string;
}

interface P2PTransactionsProps {
  transactions: P2PTransaction[];
}

export function P2Ptransac({ transactions }: P2PTransactionsProps) {
  if (!transactions.length) {
    return (
      <Card title="P2P Transfers">
        <div className="text-center py-8 text-slate-500 text-sm">
          No P2P Transactions
        </div>
      </Card>
    );
  }

  transactions.sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <Card title="Peer Transfers">
      <div className="pt-2 max-h-[300px] overflow-y-auto pr-1 space-y-3 scroll-smooth scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
        {transactions.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className="flex justify-between items-center bg-slate-100 hover:bg-slate-200 transition-colors rounded-lg px-4 py-3 border border-slate-200"
          >
            <div>
              <div className="text-sm font-medium text-slate-800">
                {t.from} → {t.to}
              </div>
              <div className="text-xs text-slate-500">
                {t.time.toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
            <div className="text-green-600 font-semibold text-sm">
              ₹{(t.amount / 100).toLocaleString("en-IN")}
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
