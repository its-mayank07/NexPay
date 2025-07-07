const Quote = () => {
    return (
      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-900 via-black to-gray-900 rounded-3xl p-10 shadow-2xl shadow-indigo-900/20">
        <div className="max-w-md w-full">
          <p className="text-3xl sm:text-4xl font-bold mb-8 text-indigo-100 leading-snug italic drop-shadow-lg">
            “The future of money is digital, borderless, and always in your pocket.”
          </p>
          <p className="text-lg font-semibold text-indigo-200">NexPay Team</p>
          <p className="text-sm text-gray-400">Empowering your wallet, everywhere.</p>
        </div>
      </div>
    );
  };
  
  export default Quote;
  