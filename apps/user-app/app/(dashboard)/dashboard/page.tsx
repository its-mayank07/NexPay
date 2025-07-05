import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";
import { DashboardQuickActions } from "../../../components/DashboardQuickActions";


async function getBalance(userId: number) {
  const balance = await prisma.balance.findFirst({ where: { userId } });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions(userId: number) {
  const txns = await prisma.onRampTransaction.findMany({ where: { userId } });
  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

async function getP2PTransactions(userId: number) {
  const txns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
    include: {
      fromUser: { select: { name: true, number: true } },
      toUser: { select: { name: true, number: true } },
    },
  });

  return txns.map((t) => ({
    from: t.fromUser.name,
    to: t.toUser.name,
    amount: t.amount,
    time: t.timestamp,
  }));
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-slate-600 text-lg">Please sign in to access this page.</p>
      </div>
    );
  }

  const userId = Number(session.user.id);
  const balance = await getBalance(userId);
  const onRampTransactions = await getOnRampTransactions(userId);
  const p2pTransactions = await getP2PTransactions(userId);

  onRampTransactions.sort((a, b) => b.time.getTime() - a.time.getTime());
  p2pTransactions.sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-3">
        Welcome, {(session.user.name?.charAt(0).toUpperCase() + session.user.name?.slice(1)) || "User"}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Balance Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-700 mb-2">Your Balance</h2>
          <p className="text-3xl font-bold text-indigo-600">
            ₹{(balance.amount / 100).toLocaleString("en-IN")}
          </p>
          <p className="text-slate-500 text-sm mt-1">
            Locked: ₹{(balance.locked / 100).toLocaleString("en-IN")}
          </p>
        </div>

        {/* Quick Actions */}
        <DashboardQuickActions />
      </div>

      {/* Recent Transactions */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Bank Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Bank Transfers
          </h2>
          {onRampTransactions.length === 0 ? (
            <p className="text-slate-500 text-sm">No recent bank transactions.</p>
          ) : (
            <ul className="divide-y divide-slate-100 text-sm">
              {onRampTransactions.slice(0, 5).map((txn, i) => (
                <li key={i} className="py-2 flex justify-between">
                  <div>
                    <p className="text-slate-600 font-medium">{txn.provider}</p>
                    <p className="text-xs text-slate-400">{txn.time.toDateString()}</p>
                  </div>
                  <p className="text-green-600 font-semibold">
                    ₹{(txn.amount / 100).toLocaleString("en-IN")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* P2P Transactions */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            P2P Transfers
          </h2>
          {p2pTransactions.length === 0 ? (
            <p className="text-slate-500 text-sm">No recent P2P transfers.</p>
          ) : (
            <ul className="divide-y divide-slate-100 text-sm">
              {p2pTransactions.slice(0, 5).map((txn, i) => (
                <li key={i} className="py-2 flex justify-between">
                  <div>
                    <p className="text-slate-600">
                      {txn.from} → {txn.to}
                    </p>
                    <p className="text-xs text-slate-400">{txn.time.toDateString()}</p>
                  </div>
                  <p className="text-indigo-600 font-semibold">
                    ₹{(txn.amount / 100).toLocaleString("en-IN")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
