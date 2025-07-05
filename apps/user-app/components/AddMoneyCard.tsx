"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import createOnrampTransaction from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    const [amount, setAmount] = useState(0);
    const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
    const [error, setError] = useState("");
    return (
        <Card title="Add Money">
            <div style={{ width: "100%", maxWidth: 400, margin: "0 auto", padding: 24 }}>
                <div style={{ marginBottom: 20 }}>
                    <TextInput
                    value={amount.toString()}
                        label={"Amount"}
                        placeholder={"Amount"}
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
                        <div style={{ color: 'red', fontSize: 14, marginTop: 4 }}>{error}</div>
                    )}
                </div>
                <div style={{ padding: "12px 0", textAlign: "left", fontWeight: 500, fontSize: 16 }}>
                    Bank
                </div>
                <div style={{ marginBottom: 32 }}>
                    <Select onSelect={(value) => {
                        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "");
                        setProvider(SUPPORTED_BANKS.find(x => x.name === value)?.name || "");
                    }} options={SUPPORTED_BANKS.map(x => ({
                        key: x.name,
                        value: x.name
                    }))} />
                </div>
                <div style={{ display: "flex", justifyContent: "center", paddingTop: 12 }}>
                    <Button onClick={async() => {
                        if (error || amount <= 0) return;
                        const response =await createOnrampTransaction(amount*100,provider);
                       
                        
                        if (typeof window !== "undefined") {
                            const transactionData = {
                                txn_id: response.data?.token,
                                amount: response.data?.amount,
                            };
                            const bankAppUrl = process.env.NEXT_PUBLIC_BANK_APP_URL || 'http://localhost:3000';
                            window.location.href = `${bankAppUrl}/payment?txn_id=${transactionData.txn_id}&amount=${transactionData.amount}`;
                        }
                    }}>
                        Add Money
                    </Button>
                </div>
            </div>
        </Card>
    );
}