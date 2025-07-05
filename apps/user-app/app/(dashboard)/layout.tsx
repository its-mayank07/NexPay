import { AppbarClient } from "../../components/AppbarClient";
import { SidebarItem } from "../../components/SidebarItem";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Top Appbar */}
      <AppbarClient />

      {/* Sidebar + Main content */}
      <div className="flex flex-col lg:flex-row flex-1">
        <nav className="w-full lg:w-64 border-b lg:border-b-0 lg:border-r border-slate-200 bg-white shadow-md overflow-x-auto whitespace-nowrap">
          <div className="flex flex-row lg:flex-col items-stretch gap-2 px-2 py-2 lg:py-6 lg:gap-4">
            <SidebarItem href="/dashboard" icon={<HomeIcon />} title="Home" />
            <SidebarItem href="/transfer" icon={<TransferIcon />} title="Transfer" />
            <SidebarItem href="/transactions" icon={<TransactionsIcon />} title="Transactions" />
            <SidebarItem href="/p2ptransfer" icon={<P2PTransferIcon />} title="P2P Transfer" />
          </div>
        </nav>

        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

function HomeIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 3l9 6.75v9.75a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 19.5V9.75z" />
    </svg>
  );
}

function TransferIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5l-6 6-6-6M4.5 10.5l6-6 6 6" />
    </svg>
  );
}

function TransactionsIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 7l4-4m-4 4l4 4M20 17H4m16 0l-4-4m4 4l-4 4" />
    </svg>
  );
}

function P2PTransferIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405M15 7h5l-1.405 1.405M9 17H4l1.405-1.405M9 7H4l1.405 1.405" />
    </svg>
  );
}
