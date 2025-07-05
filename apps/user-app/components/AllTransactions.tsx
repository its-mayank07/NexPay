"use client";

import { OnRampTransactions } from "./OnRampTransactions";
import { P2Ptransac } from "./P2Ptransac";

interface RampTransaction {
  time: Date;
  amount: number;
  status: string;
  provider: string;
}

interface P2PTransaction {
  time: Date;
  amount: number;
  from: string;
  to: string;
}

interface AllTransactionsProps {
  Ramptransactions: RampTransaction[];
  P2Ptransactions: P2PTransaction[];
}

function AllTransactions({
  Ramptransactions,
  P2Ptransactions,
}: AllTransactionsProps) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* <h1 className="text-3xl font-bold text-slate-800 text-center mb-8">
        Transaction History
      </h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <section className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            {/* <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Bank Transfers
            </h2> */}
            <OnRampTransactions transactions={Ramptransactions} />
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="p-6">
            {/* <h2 className="text-xl font-semibold text-slate-700 mb-4">
              Peer Transfers
            </h2> */}
            <P2Ptransac transactions={P2Ptransactions} />
          </div>
        </section>
      </div>
    </div>
  );
}

export default AllTransactions;
