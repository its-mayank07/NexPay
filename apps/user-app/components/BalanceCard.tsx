import { Card } from "@repo/ui/card";

export const BalanceCard = ({ amount, locked }: { amount: number; locked: number }) => {
    return (
        <Card title="Balance">
            <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3 mt-4">
                    <span className="text-slate-600 font-medium">Unlocked Balance</span>
                    <span className="text-lg font-semibold text-green-600">{(amount / 100).toFixed(2)} INR</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                    <span className="text-slate-600 font-medium">Total Locked Balance</span>
                    <span className="text-lg font-semibold text-yellow-600">{(locked / 100).toFixed(2)} INR</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                    <span className="text-slate-700 font-bold">Total Balance</span>
                    <span className="text-xl font-bold text-blue-700">{((locked + amount) / 100).toFixed(2)} INR</span>
                </div>
            </div>
        </Card>
    );
};
