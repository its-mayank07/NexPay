import { Card } from "@repo/ui/card";

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
      <Card title="Deposit History">
        <div className="text-center pb-8 pt-8 text-slate-500">
          No Recent transactions
        </div>
      </Card>
    );
  }

  transactions.sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <Card title="Deposit History">
      <div className="pt-2">
        {transactions.map((t) => (
          <div
            key={t.time.toISOString()}
            className="flex justify-between items-center mt-2 px-4 py-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <div>
              <div className="text-sm font-medium text-slate-800">
                Received INR
              </div>
              <div className="text-slate-500 text-xs">
                {t.time.toDateString()}
              </div>
              <div className="text-xs text-slate-400 mt-1">{t.provider}</div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-green-600 font-semibold">
                + ₹{(t.amount / 100).toLocaleString("en-IN")}
              </span>
              <span
                className={`text-xs mt-1 ${
                  t.status.toLowerCase() === "success"
                    ? "text-green-500"
                    : t.status.toLowerCase() === "failure"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                {t.status.charAt(0).toUpperCase() + t.status.slice(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
