export default function ProductLoading() {
  return (
    <div className="mx-auto max-w-[1240px] px-5 py-8 animate-pulse">
      <div className="h-4 w-48 rounded bg-gray-200 mb-8" />
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
        <div className="md:col-span-6 aspect-square rounded-[20px] bg-gray-200" />
        <div className="md:col-span-6 space-y-4">
          <div className="h-8 w-3/4 rounded bg-gray-200" />
          <div className="h-6 w-1/4 rounded bg-gray-200" />
          <div className="h-20 w-full rounded bg-gray-200" />
          <div className="h-12 w-1/2 rounded-full bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

