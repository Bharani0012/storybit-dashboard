export default function RowSkeleton() {
  return (
    <div className="mt-10 px-6 animate-pulse">
      <div className="h-6 w-40 bg-gray-800 rounded mb-4" />

      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="w-[150px] h-[220px] bg-gray-800 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
