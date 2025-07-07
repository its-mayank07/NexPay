"use client"

import { Select } from "@/components/ui/Select";
import { useState } from "react";
import { TextInput } from "@/components/ui/TextInput";
import createOnrampTransaction from "../app/lib/actions/createOnrampTransaction";
import { Button } from "@/components/ui/Button";

const SUPPORTED_BANKS = [
    {
      name: "HDFC Bank",
      redirectUrl: "https://netbanking.hdfcbank.com",
    },
    {
      name: "Axis Bank",
      redirectUrl: "https://www.axisbank.com/",
    },
    {
      name: "State Bank of India (SBI)",
      redirectUrl: "https://retail.onlinesbi.sbi/",
    }
  ];
  

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [error, setError] = useState("");
    
    return (
        <div className="p-3 sm:p-6">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 rounded-lg flex items-center justify-center shadow-[0_8px_16px_rgba(255,255,255,0.1)] backdrop-blur-sm border border-white/30">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </div>
                <h2 className="text-base sm:text-xl font-semibold text-gray-200">Add Money</h2>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
                <div>
                    <TextInput
                        value={amount.toString()}
                        label={"Amount"}
                        placeholder={"Enter amount"}
                        onChange={(value: string) => {
                            if (value.trim() === "") {
                                setError("");
                                setAmount(0);
                            } else if (isNaN(Number(value)) || Number(value) <= 0) {
                                setError("Invalid amount");
                                setAmount(0);
                            } else {
                                setError("");
                                setAmount(Number(value));
                            }
                        }}
                    
                    />
                    {error && (
                        <div className="text-red-400 text-xs sm:text-sm mt-2">{error}</div>
                    )}
                </div>
                
                <div>
                    <div className="text-gray-300 font-medium mb-2 sm:mb-3 text-sm sm:text-base">Select Bank</div>
                    <div className="bg-gradient-to-r from-gray-800/60 to-gray-700/60 backdrop-blur-sm rounded-xl border border-gray-500/40 p-2 sm:p-3">
                        <Select 
                            onSelect={(value) => {
                                setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                                setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                            }} 
                            options={SUPPORTED_BANKS.map(x => ({
                                key: x.name,
                                value: x.name
                            }))} 
                        />
                    </div>
                </div>
                
                <div className="flex justify-center pt-2 sm:pt-4">
                    <Button
                        onClick={async() => {
                            if (error || amount <= 0) return;
                            const response = await createOnrampTransaction(amount*100, provider);
                            
                            if (typeof window !== "undefined") {
                                const transactionData = {
                                    txn_id: response.data?.token,
                                    amount: response.data?.amount,
                                };
                                window.location.href = `payment?txn_id=${transactionData.txn_id}&amount=${transactionData.amount}`;
                            }
                        }}
                        
                    >
                        Add Money
                    </Button>
                </div>
            </div>
        </div>
    );
}
