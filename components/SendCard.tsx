"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextInput } from "@/components/ui/TextInput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useSearchParams } from "next/navigation";

export function SendCard() {
  const searchParams = useSearchParams();
  const RecipientNumber = searchParams.get("sendto") || "";
  const [number, setNumber] = useState(RecipientNumber);
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-600/50 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] shadow-black/60 hover:shadow-[0_35px_60px_-12px_rgba(0,0,0,0.9)] hover:shadow-black/70 transition-all duration-500 transform hover:-translate-y-1 p-4 sm:p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30">
          <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </div>
        <h2 className="text-lg sm:text-xl font-semibold text-gray-200">Send Money</h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div>
          <TextInput
            placeholder="Enter recipient's number"
            label="Recipient Number"
            value={number}
            
            onChange={(value) => setNumber(value)}
          />
        </div>

        <div>
          <TextInput
            placeholder="Enter amount in INR"
            label="Amount"
            value={amount}
            onChange={(value) => setAmount(value)}
          />
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
            <p className="text-red-400 text-xs sm:text-sm text-center">{error}</p>
          </div>
        )}
        
        {success && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
            <p className="text-green-400 text-xs sm:text-sm text-center">{success}</p>
          </div>
        )}

        <div className="pt-2 flex justify-center">
          <Button
            onClick={async () => {
              const amountNumber = Number(amount);
              setError("");
              setSuccess("");

              if (!number || isNaN(amountNumber) || amountNumber <= 0) {
                setError("Please enter a valid number and amount");
                return;
              }

              setLoading(true);
              const res = await p2pTransfer(number, amountNumber * 100);
              setLoading(false);

              if (res.status === 200) {
                setSuccess(res.message);
                setNumber("");
                setAmount("");
              } else {
                setError(res.message);
              }
            }}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              "Send Money"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
