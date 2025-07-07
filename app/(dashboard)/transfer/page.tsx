
import { AddMoney } from "@/components/AddMoneyCard";
import { BalanceCard } from "@/components/BalanceCard";
import { OnRampTransactions } from "@/components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-gray-300 text-lg">Please sign in to access this page.</p>
      </div>
    );
  }
  
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <main className="min-h-screen bg-black px-3 sm:px-6 py-4 sm:py-8 overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-300/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full">
        <div className="mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg text-center">
            Transfer
          </h1>
          <p className="text-gray-400 text-xs sm:text-base text-center">
            Add money to your account
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-8 max-w-6xl mx-auto">
          {/* Left Column - Add Money */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1">
            <AddMoney />
          </div>

          {/* Right Column - Balance + Transactions */}
          <div className="space-y-3 sm:space-y-6">
            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1">
              <BalanceCard amount={balance.amount} locked={balance.locked} />
            </div>

            <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1">
              <div className="p-3 sm:p-6">
                <h2 className="text-base sm:text-xl font-semibold text-gray-200 mb-3 sm:mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  Recent Bank Transactions
                </h2>
                <OnRampTransactions transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
