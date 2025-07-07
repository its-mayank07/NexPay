export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] sm:min-h-[60vh] w-full bg-transparent">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
      <div className="text-lg sm:text-xl font-semibold text-indigo-200 tracking-wide">Loading...</div>
    </div>
  );
}