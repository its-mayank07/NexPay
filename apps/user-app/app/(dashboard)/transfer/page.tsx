import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

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

  return txns.map((t) => ({
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
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-slate-600 text-lg">Please sign in to access this page.</p>
      </div>
    );
  }
  const balance = await getBalance();
  const transactions = await getOnRampTransactions();

  return (
    <main className="min-h-screen w-full px-6 py-10 bg-slate-50">
      <h1 className="text-4xl font-bold text-slate-800 mb-10 text-center">
        Transfer
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Left Column - Add Money */}
        <div className="bg-white shadow-md rounded-xl border border-slate-200 p-6">
          <AddMoney />
        </div>

        {/* Right Column - Balance + Transactions */}
        <div className="space-y-6">
          <div className="bg-white shadow-md rounded-xl border border-slate-200 p-6">
            <BalanceCard amount={balance.amount} locked={balance.locked} />
          </div>

          <div className="bg-white shadow-md rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-700 mb-4">
              Recent Bank Transactions
            </h2>
            <OnRampTransactions transactions={transactions} />
          </div>
        </div>
      </div>
    </main>
  );
}
