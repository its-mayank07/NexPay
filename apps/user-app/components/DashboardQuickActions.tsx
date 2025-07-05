"use client";
import { useRouter } from "next/navigation";

export function DashboardQuickActions() {
  const router = useRouter();

  return (
    <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 space-y-4">
      <h2 className="text-lg font-semibold text-slate-700 mb-2">Quick Actions</h2>
      <button
        onClick={() => router.push("/p2ptransfer")}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
      >
        Send Money
      </button>
      <button
        onClick={() => router.push("/transactions")}
        className="w-full bg-slate-100 text-slate-800 py-2 px-4 rounded-lg hover:bg-slate-200 transition"
      >
        View Transactions
      </button>
    </div>
  );
}
