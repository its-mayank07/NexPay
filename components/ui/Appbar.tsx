import { Button } from "./Button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  onSignin: () => void;
  onSignout: () => void;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-sm py-4">
      <div className="max-w-8xl mx-auto px-6 flex items-center justify-between h-12">
        {/* Brand Name */}
        <div className="text-2xl font-bold text-indigo-600 tracking-tight flex items-center h-full">
          NexPay
        </div>

        {/* User Action Button */}
        <div className="flex items-center h-full">
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </header>
  );
};
