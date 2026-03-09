export default function ProductSkeleton() {
  return (
    <div className="min-w-[150px] sm:min-w-[161px] md:min-w-[180px] bg-white rounded-xl border border-gray-200 p-3 shadow-sm animate-pulse">

      {/* Image */}
      <div className="sm:h-44 md:h-50 lg:h-54 bg-gray-200 rounded-lg"></div>

      {/* Title */}
      <div className="mt-3 space-y-2">
        <div className="h-3 bg-gray-200 rounded w-[90%]"></div>
        <div className="h-3 bg-gray-200 rounded w-[60%]"></div>
      </div>

      {/* Category */}
      <div className="mt-2 h-3 bg-gray-200 rounded w-16"></div>

      {/* Price Section */}
      <div className="flex justify-between items-center mt-2">
        <div className="h-4 bg-gray-200 rounded w-14"></div>
        <div className="h-3 bg-gray-200 rounded w-10"></div>
      </div>

    </div>
  );
}