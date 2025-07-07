
export const BalanceCard = ({ amount, locked }: { amount: number; locked: number }) => {
    return (
        <div className="p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                </div>
                <h2 className="text-base sm:text-xl font-semibold text-gray-200">Balance Overview</h2>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl border border-gray-500/40 shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                    <span className="text-gray-300 font-medium text-sm sm:text-base">Unlocked Balance</span>
                    <span className="text-base sm:text-lg font-semibold text-green-400">₹{(amount / 100).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-2 sm:p-3 bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl border border-gray-500/40 shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                    <span className="text-gray-300 font-medium text-sm sm:text-base">Locked Balance</span>
                    <span className="text-base sm:text-lg font-semibold text-yellow-400">₹{(locked / 100).toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 sm:p-4 bg-gradient-to-r from-gray-700/60 to-gray-600/60 backdrop-blur-sm rounded-xl border border-gray-400/40 shadow-[0_8px_16px_rgba(0,0,0,0.3)]">
                    <span className="text-gray-200 font-bold text-base sm:text-lg">Total Balance</span>
                    <span className="text-lg sm:text-xl font-bold text-blue-400">₹{((locked + amount) / 100).toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
};
