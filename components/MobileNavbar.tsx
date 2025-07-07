"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { TopBarItem } from "./TopBarItem";

export function MobileNavbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSignout = async () => {
    await signOut();
    router.push("/api/auth/signin");
  };

  return (
    <header className="w-full bg-black/90 backdrop-blur-xl border-b border-gray-800/50 shadow-2xl shadow-black/30 py-2 relative z-50">
      <div className="px-3 flex items-center justify-between h-12">
        {/* Brand Name */}
        <div className="flex items-center h-full">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-400 rounded-lg flex items-center justify-center shadow-lg shadow-white/10 backdrop-blur-sm border border-white/20">
              <svg className="w-4 h-4 text-gray-900" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/>
              </svg>
            </div>
            <span className="text-lg font-bold text-white tracking-tight drop-shadow-lg">
              NexPay
            </span>
          </div>
        </div>

        {/* User Action Button */}
        <div className="flex items-center h-full gap-2">
          {status === "loading" ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : session?.user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSignout}
                className="px-2 py-2 bg-gray-800/80 hover:bg-gray-700/80 text-gray-200 hover:text-white rounded-lg font-medium transition-all duration-300 backdrop-blur-sm shadow-lg shadow-black/30 border border-gray-600/50 hover:border-gray-500 flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn()}
              className="px-3 py-2 bg-gradient-to-r from-gray-200 to-gray-400 hover:from-gray-300 hover:to-gray-500 text-gray-900 rounded-lg font-medium transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/50 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="px-2 pb-2">
        <nav className="flex items-center w-full">
          <div className="flex mt-1 items-center gap-1 px-1 py-1 bg-black/40 backdrop-blur-sm rounded-xl shadow-lg shadow-black/20 w-full justify-center">
            <TopBarItem href="/dashboard" icon={<HomeIcon />} title="Home" />
            <TopBarItem href="/transfer" icon={<TransferIcon />} title="Transfer" />
            <TopBarItem href="/transactions" icon={<TransactionsIcon />} title="Transactions" />
            <TopBarItem href="/p2ptransfer" icon={<P2PTransferIcon />} title="P2P" />
          </div>
        </nav>
      </div>
    </header>
  );
} 


function HomeIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75v9.75a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5V9.75z" />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5l-6 6-6-6M4.5 10.5l6-6 6 6" />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 7l4-4m-4 4l4 4M20 17H4m16 0l-4-4m4 4l-4 4" />
    </svg>
  );
}

function P2PTransferIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405M15 7h5l-1.405 1.405M9 17H4l1.405-1.405M9 7H4l1.405 1.405" />
    </svg>
  );
} 