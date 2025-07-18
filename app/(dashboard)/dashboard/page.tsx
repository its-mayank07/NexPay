import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@/app/lib/db";
import { DashboardQuickActions } from "@/components/DashboardQuickActions";
import { RampTransaction, P2PTransaction } from "@/app/types/transac";
import { RecentP2Ptransac } from "@/components/RecentP2Ptransac";

async function getBalance(userId: number) {
  try {
    const balance = await prisma.balance.findFirst({ where: { userId } });
    return {
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    };
  } catch (error) {
    console.error("Error fetching balance:", error);
    return {
      amount: 0,
      locked: 0,
    };
  }
}

async function getOnRampTransactions(userId: number): Promise<RampTransaction[]> {
  try {
    const txns = await prisma.onRampTransaction.findMany({ where: { userId } });
    return txns.map((t): RampTransaction => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }));
  } catch (error) {
    console.error("Error fetching onramp transactions:", error);
    return [];
  }
}

async function getP2PTransactions(userId: number): Promise<P2PTransaction[]> {
  try {
    const txns = await prisma.p2pTransfer.findMany({
      where: {
        OR: [{ fromUserId: userId }, { toUserId: userId }],
      },
      include: {
        fromUser: { select: { name: true, number: true } },
        toUser: { select: { name: true, number: true } },
      },
    });

    return txns.map((t): P2PTransaction => ({
      from: t.fromUser.name || "",
      to: t.toUser.name || "",
      amount: t.amount,
      time: t.timestamp,
      fromUserNumber: t.fromUser.number || "",
    }));
  } catch (error) {
    console.error("Error fetching P2P transactions:", error);
    return [];
  }
}

function hasId(user: unknown): user is { id: string } {
  return typeof user === 'object' && user !== null && typeof (user as { id?: unknown }).id === 'string';
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !hasId(session.user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-gray-300 text-lg">Please sign in to access this page.</p>
      </div>
    );
  }

  const userId = Number(session.user.id);
  const balance = await getBalance(userId);
  const onRampTransactions = await getOnRampTransactions(userId);
  const p2pTransactions = await getP2PTransactions(userId);

  onRampTransactions.sort((a: RampTransaction, b: RampTransaction) => b.time.getTime() - a.time.getTime());
  p2pTransactions.sort((a: P2PTransaction, b: P2PTransaction) => b.time.getTime() - a.time.getTime());

  return (
    <main className="min-h-screen bg-black px-3 sm:px-6 py-2 sm:py-6 overflow-x-hidden relative">
      {/* Background Effects - Constrained to viewport */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gray-300/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-10 w-full">
        {/* Welcome Header */}
        <div className="mb-3 sm:mb-6">
          <h1 className="text-lg sm:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
            Welcome, {session.user && session.user.name ? (session.user.name.charAt(0).toUpperCase() + session.user.name.slice(1)) : "User"}
          </h1>
          <p className="text-gray-400 text-xs sm:text-base">
            Here&apos;s your financial overview
          </p>
        </div>

        {/* Balance and Actions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-6 mb-4 sm:mb-8">
          {/* Balance Card */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1 col-span-1 lg:col-span-2">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
              <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg sm:rounded-xl flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-transform duration-300">
                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <div>
                <h2 className="text-sm sm:text-lg font-semibold text-gray-200">Your Balance</h2>
                <p className="text-lg sm:text-3xl font-bold text-white drop-shadow-lg">
                  ₹{(balance.amount / 100).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 border border-gray-500/40 shadow-inner shadow-black/30">
              <p className="text-gray-400 text-xs sm:text-sm">
                Locked: ₹{(balance.locked / 100).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1">
            <DashboardQuickActions />
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-6">
          {/* Bank Transactions */}
          <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl p-3 sm:p-6 rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30 transform hover:scale-105 transition-transform duration-300">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h2 className="text-sm sm:text-lg font-semibold text-gray-200">
                Bank Transfers
              </h2>
            </div>
            
            {onRampTransactions.length === 0 ? (
              <div className="text-center py-4 sm:py-8">
                <div className="w-10 h-10 sm:w-16 sm:h-16 bg-gradient-to-br from-gray-800/60 to-gray-700/60 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-4 shadow-inner shadow-black/30 border border-gray-600/40">
                  <svg className="w-5 h-5 sm:w-8 sm:h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm">No recent bank transactions.</p>
              </div>
            ) : (
              <div className="space-y-1.5 sm:space-y-3">
                {onRampTransactions.slice(0, 3).map((txn: RampTransaction, i: number) => (
                  <div key={i} className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-gray-500/40 shadow-[0_8px_16px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.4)] hover:bg-gradient-to-r hover:from-gray-700/60 hover:to-gray-600/60 transition-all duration-300 transform hover:scale-[1.02]">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="text-gray-200 font-medium text-sm sm:text-base">{txn.provider}</p>
                        <p className="text-xs text-gray-400 mt-1">{txn.time.toDateString()}</p>
                        <div className="flex items-center gap-2 mt-1 sm:mt-2">
                          <span className={`inline-flex items-center px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                            txn.status === 'Success' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 
                            txn.status === 'Failure' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                            'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {txn.status}
                          </span>
                        </div>
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

          {/* P2P Transactions */}
          < RecentP2Ptransac p2pTransactions={p2pTransactions} />
        </div>
      </div>
    </main>
  );
}
