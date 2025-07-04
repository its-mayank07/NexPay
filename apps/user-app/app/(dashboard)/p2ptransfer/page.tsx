import { getServerSession } from "next-auth";
import { SendCard } from "../../../components/SendCard";
import { authOptions } from "../../lib/auth";

async function Page() {
   const session = await getServerSession(authOptions);
    if (!session) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50">
          <p className="text-slate-600 text-lg">Please sign in to access this page.</p>
        </div>
      );
    }
  return (
    <div className="w-full">
      <SendCard />
    </div>
  );
}

export default Page;
