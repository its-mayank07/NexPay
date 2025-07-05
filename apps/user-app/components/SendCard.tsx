"use client";

import { useState } from "react";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-[90vh] bg-slate-50 py-10 px-4 ">
      <Center>
        <div className="w-full max-w-xl bg-white shadow-lg rounded-2xl border border-slate-200 p-6">
          <Card title="Send Money">
            <div className="space-y-4 pt-2">
              <TextInput
                placeholder="Enter recipient's number"
                label="Recipient Number"
                value={number}
                onChange={(value) => setNumber(value)}
              />

              <TextInput
                placeholder="Enter amount in INR"
                label="Amount"
                value={amount}
                onChange={(value) => setAmount(value)}
              />

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              {success && (
                <p className="text-green-600 text-sm text-center">{success}</p>
              )}

              <div className="pt-2 flex justify-center">
                <div className="w-full flex justify-center">
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
                    {loading ? "Sending..." : "Send"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Center>
    </div>
  );
}
