import { getServerSession } from "next-auth";
import AllTransactions from "@/components/AllTransactions";
import { authOptions } from "@/app/lib/auth";
import prisma from "@/app/lib/db";
import { RampTransaction, P2PTransaction } from "@/app/types/transac";

async function getOnRampTransactions(userId: number): Promise<RampTransaction[]> {
  const txns = await prisma.onRampTransaction.findMany({ where: { userId } });
  return txns.map((t): RampTransaction => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

async function getP2PTransactions(userId: number): Promise<P2PTransaction[]> {
  const p2pTxns = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
    include: {
      fromUser: { select: { name: true, number: true } },
      toUser: { select: { name: true, number: true } },
    },
  });
  return p2pTxns.map((t): P2PTransaction => ({
    from: t.fromUser.name || "" ,
    to: t.toUser.name || "",
    amount: t.amount,
    time: t.timestamp,
    fromUserNumber: t.fromUser.number,
  }));
}

// Add a type guard for session.user.id
function hasId(user: unknown): user is { id: string } {
  return typeof user === 'object' && user !== null && Object.prototype.hasOwnProperty.call(user, 'id') && typeof (user as { id: unknown }).id === 'string';
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-gray-300 text-lg font-medium">
          Please sign in to access this page.
        </p>
      </div>
    );
  }

  // Safely extract user id, handling possible undefined
  const userId = session.user && hasId(session.user) ? Number(session.user.id) : undefined;

  if (!userId || isNaN(userId)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-gray-300 text-lg font-medium">
          User information is incomplete. Please sign in again.
        </p>
      </div>
    );
  }

  const Ramptransactions = await getOnRampTransactions(userId);
  const P2Ptransactions = await getP2PTransactions(userId);

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
          <h1 className="text-xl sm:text-3xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg text-center">
            Transaction History
          </h1>
          <p className="text-gray-400 text-xs sm:text-base text-center">
            View all your transactions
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <AllTransactions
            Ramptransactions={Ramptransactions}
            P2Ptransactions={P2Ptransactions}
          />
        </div>
      </div>
    </main>
  );
}
