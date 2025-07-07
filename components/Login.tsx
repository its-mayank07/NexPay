"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Quote from "@/components/Quote"; 

export default function Login() {
  const router = useRouter();
  const { status } = useSession();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

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
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-indigo-950 via-black to-gray-900">
      {/* Left side quote for large screens */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-8 bg-gradient-to-br from-indigo-900 via-black to-gray-900">
        <Quote />
      </div>

      {/* Blurred divider for large screens */}
      <div className="hidden lg:block w-0.5 relative">
        <div className="absolute inset-y-16 top-16 bottom-16 left-0 w-full bg-gradient-to-b from-transparent via-white/30 to-transparent backdrop-blur-md rounded-full" style={{ minHeight: '60%' }}></div>
      </div>

      {/* Right side login form */}
      <div className="flex-1 flex items-center justify-center px-2 py-8 sm:px-6 sm:py-12">
        <div className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-indigo-900/20">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-100 mb-2 drop-shadow">Welcome Back</h1>
            <p className="text-indigo-200 text-sm sm:text-base mt-2">Login to access your dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs sm:text-sm text-indigo-200 mb-1 font-semibold tracking-wide">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm sm:text-base shadow-sm"
                placeholder="Enter phone number"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm text-indigo-200 mb-1 font-semibold tracking-wide">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl bg-gradient-to-br from-gray-800 via-gray-900 to-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all text-sm sm:text-base shadow-sm"
                placeholder="Enter password"
              />
            </div>

            {loginError && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-md p-3">
                Invalid phone number or password.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 text-white font-semibold py-3 rounded-xl hover:from-indigo-700 hover:to-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 
                      5.291A7.962 7.962 0 014 12H0c0 3.042 
                      1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14" />
                  </svg>
                  Sign in
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-indigo-200 text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-indigo-100 hover:text-white font-medium transition-colors duration-200">
              Create one
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
