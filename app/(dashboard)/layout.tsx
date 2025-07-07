
import { Navbar } from "@/components/Navbar";
import { MobileNavbar } from "@/components/MobileNavbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-black flex flex-col overflow-x-hidden">
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <MobileNavbar />
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <Navbar />
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-x-hidden">
        <main className="flex-1 overflow-x-hidden">{children}</main>
      </div>
    </div>
  );
}

