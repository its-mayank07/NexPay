"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(false);

    const res = await signIn("credentials", {
      phone,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/dashboard");
    } else {
      setLoginError(true);
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-r from-gray-100 to-gray-200">
      {/* Left - Quote Card */}
      <div className="hidden md:flex w-1/2 bg-indigo-600 items-center justify-center px-8">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 max-w-md text-center">
          <h2 className="text-4xl font-bold text-indigo-700 mb-6">Nexpay</h2>
          <blockquote className="text-lg text-slate-700 italic leading-relaxed">
            “Empowering people to manage their money is the first step toward freedom.”
          </blockquote>
        </div>
      </div>

      {/* Right - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-6">
        <div className="w-full max-w-md bg-white p-10 rounded-2xl shadow-2xl">
          <h2 className="text-3xl font-semibold text-slate-800 text-center mb-6">
            Sign in to your account
          </h2>


          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-150 ease-in-out"
                placeholder="Enter your phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-150 ease-in-out"
                placeholder="Enter your password"
              />
            </div>
              {loginError && (
            <p className="text-red-500 text-sm text-center mb-4">
              Invalid phone number or password.
            </p>
          )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-150 ease-in-out"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-indigo-600 font-medium hover:underline"
            >
              Create one
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
