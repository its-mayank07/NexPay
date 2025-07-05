export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-slate-50">
      <div className="flex flex-col items-center space-y-4">
        {/* Paper Plane Icon to signify transfer */}
        <svg
          className="animate-bounce h-8 w-8 text-indigo-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 3L20.25 12L3.75 21L6.75 12L3.75 3Z"
          />
        </svg>

        <p className="text-slate-600 text-sm font-medium">
          Loading...
        </p>
      </div>
    </div>
  );
}
