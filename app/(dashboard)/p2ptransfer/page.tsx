import { getServerSession } from "next-auth";
import { SendCard } from "@/components/SendCard";
import { authOptions } from "@/app/lib/auth";

async function Page() {
   const session = await getServerSession(authOptions);
    if (!session) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-black">
          <p className="text-gray-300 text-lg">Please sign in to access this page.</p>
        </div>
      );
    }
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
            Send Money
          </h1>
          <p className="text-gray-400 text-xs sm:text-base text-center">
            Transfer money to friends and family
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <SendCard />
        </div>
      </div>
    </main>
  );
}

export default Page;
