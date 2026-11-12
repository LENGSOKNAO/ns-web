export default function Loading() {
  return (
    <main className="flex min-h-[50vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        {/* Loading Spinner */}
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-black" />

        {/* Loading Text */}
        <p className="text-xs font-medium text-gray-500">Loading...</p>
      </div>
    </main>
  );
}
