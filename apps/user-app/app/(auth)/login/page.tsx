"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const { data: session, status } = useSession();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left side - login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <h1 className="text-3xl font-bold text-slate-800 mb-6 text-center">Login</h1>

          {error && (
            <p className="text-red-500 text-sm text-center mb-4">
              {error === "CredentialsSignin"
                ? "Invalid phone or password"
                : "Authentication failed"}
            </p>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md font-medium transition"
            >
              {loading ? "Logging..." : "Login"}
            </button>
          </form>
          
          <p className="text-center text-sm text-slate-500 mt-6">
            Don’t have an account?{" "}
            <span className="text-indigo-600 font-semibold">Sign in to create one</span>.
          </p>
        </div>
      </div>

      {/* Right side - image / branding */}
      <div className="hidden lg:flex w-1/2 bg-indigo-600 items-center justify-center relative">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1581090700227-1e8b6d1d9b89?auto=format&fit=crop&w=1280&q=80')",
          }}
        />
        <div className="z-10 text-white text-center px-12">
          <h2 className="text-4xl font-extrabold mb-4">The Cube Bank</h2>
          <p className="text-lg font-medium">
            Secure and modern banking built for the digital world.
          </p>
        </div>
      </div>
    </div>
  );
}
