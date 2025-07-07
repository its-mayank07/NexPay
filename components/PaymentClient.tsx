"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import Link from 'next/link';



type PaymentStatus = 'pending' | 'processing' | 'success' | 'failure' | 'error';

interface TransactionDetails {
  transactionId: string;
  amount: string;
}

export function PaymentClient() {
  const [status, setStatus] = useState<PaymentStatus>('pending');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const transactionDetails: TransactionDetails = {
    transactionId: searchParams.get('txn_id') || 'TXN-123456789',
    amount: searchParams.get('amount') || '1000',
  };

  const processPayment = async (paymentStatus: 'success' | 'failure') => {
    setStatus('processing');
    setErrorMessage('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send webhook to your API
      const response = await fetch('/api/payment-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: transactionDetails.transactionId,
          amount: transactionDetails.amount,
          status: paymentStatus,
        })
      });

      if (response.ok) {
        setStatus(paymentStatus);
        // Auto redirect after 3 seconds
        setTimeout(() => {
          router.push('/dashboard');
        }, 2000);
      } else {
        setStatus('error');
        setErrorMessage('Failed to process payment');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setErrorMessage('Network error occurred');
    }
  };

  const resetToPending = () => {
    setStatus('pending');
    setErrorMessage('');
  };

  // Pending State Component
  const PendingState = () => (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
        </div>
      </div>

      <TransactionDetails details={transactionDetails} status="Pending" statusColor="text-yellow-600" />

      <div className="space-y-3">
        <button 
          onClick={() => processPayment('success')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Process Success
        </button>
        
        <button 
          onClick={() => processPayment('failure')}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Process Failure
        </button>
      </div>
    </div>
  );

  // Processing State Component
  const ProcessingState = () => (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="animate-spin w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <TransactionDetails details={transactionDetails} status="Processing" statusColor="text-blue-600" />

      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-2 text-blue-600 font-medium">
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Processing your payment...
        </div>
      </div>
    </div>
  );

  // Success State Component
  const SuccessState = () => (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <TransactionDetails details={transactionDetails} status="Success" statusColor="text-green-600" />

      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-2 text-green-600 font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Payment successful! Redirecting...
        </div>
      </div>
    </div>
  );

  // Failure State Component
  const FailureState = () => (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </div>

      <TransactionDetails details={transactionDetails} status="Failed" statusColor="text-red-600" />

      <div className="text-center mt-6">
        <div className="inline-flex items-center gap-2 text-red-600 font-medium">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L6 6l12 12" />
          </svg>
          Payment failed! Redirecting...
        </div>
      </div>
    </div>
  );

  // Error State Component
  const ErrorState = () => (
    <div className="p-6">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
      </div>

      <TransactionDetails details={transactionDetails} status="Error" statusColor="text-orange-600" />

      <div className="text-center mt-4 mb-6">
        <div className="text-orange-600 font-medium mb-2">
          {errorMessage || 'An error occurred'}
        </div>
      </div>

      <button 
        onClick={resetToPending}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Try Again
      </button>
    </div>
  );

  // Transaction Details Component
  const TransactionDetails = ({ details, status, statusColor }: { details: TransactionDetails, status: string, statusColor: string }) => (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-600">Amount:</span>
        <span className="font-semibold text-slate-800">₹{(Number(details.amount)/100).toLocaleString("en-IN")}.00</span>
      </div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-slate-600">Transaction ID:</span>
        <span className="text-sm text-slate-500">{details.transactionId}</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-slate-600">Status:</span>
        <span className={`text-sm font-medium ${statusColor}`}>{status}</span>
      </div>
    </div>
  );

  // Render component based on status
  const renderComponent = () => {
    switch (status) {
      case 'pending':
        return <PendingState />;
      case 'processing':
        return <ProcessingState />;
      case 'success':
        return <SuccessState />;
      case 'failure':
        return <FailureState />;
      case 'error':
        return <ErrorState />;
      default:
        return <PendingState />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-white flex items-center justify-center py-4 px-1 sm:py-8 sm:px-0">
      <div className="w-full max-w-xs sm:max-w-lg mx-auto bg-white/90 rounded-2xl sm:rounded-3xl shadow-2xl border border-indigo-100 overflow-hidden backdrop-blur-md">
        {/* Header */}
        <div className="text-center py-6 px-3 sm:py-8 sm:px-6 border-b border-indigo-50 bg-gradient-to-r from-indigo-50/80 to-blue-50/80">
          <h1 className="text-2xl sm:text-4xl font-extrabold text-indigo-700 mb-1 sm:mb-2 drop-shadow-sm">Payment Processing</h1>
          <p className="text-slate-600 text-sm sm:text-lg">Complete your transaction</p>
        </div>

        {/* Payment Card */}
        <div className="p-3 sm:p-8">
          {renderComponent()}
        </div>

        {/* Back to App Link */}
        <div className="text-center py-4 sm:py-6 bg-gradient-to-r from-indigo-50/60 to-blue-50/60 border-t border-indigo-50">
          <Link href="/dashboard" className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold text-sm sm:text-lg transition-colors duration-200">
            ← Back to NexPay App
          </Link>
        </div>
      </div>
    </div>
  );
} 