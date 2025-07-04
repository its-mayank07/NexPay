import { Button } from "./button";

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
      <div className=" mx-auto px-6 flex items-center justify-between">
        <div className="text-2xl font-bold text-indigo-600 tracking-tight">
          NexPay
        </div>
        <div>
          <Button onClick={user ? onSignout : onSignin}>
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </header>
  );
};
