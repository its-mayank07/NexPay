import { getServerSession } from "next-auth";
import AllTransactions from "../../../components/AllTransactions";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const txns = await prisma.onRampTransaction.findMany({
    where: { userId: Number(session.user.id) },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  const p2pTxns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [
        { fromUserId: Number(session.user.id) },
        { toUserId: Number(session.user.id) },
      ],
    },
    include: {
      fromUser: { select: { name: true, number: true } },
      toUser: { select: { name: true, number: true } },
    },
  });

  return p2pTxns.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    from: t.fromUser.name || t.fromUser.number,
    to: t.toUser.name || t.toUser.number,
  }));
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <p className="text-slate-600 text-lg font-medium">
          Please sign in to access this page.
        </p>
      </div>
    );
  }

  const Ramptransactions = await getOnRampTransactions();
  const P2Ptransactions = await getP2PTransactions();

  return (
    <main className="min-h-screen w-full bg-slate-50 py-10 px-4 md:px-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
          Transaction History
        </h1>

        <AllTransactions
          Ramptransactions={Ramptransactions}
          P2Ptransactions={P2Ptransactions}
        />
      </div>
    </main>
  );
}
