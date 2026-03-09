export default function ProductSkeleton() {
  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 animate-pulse">
      
      <div className="bg-gray-300 h-[500px] rounded-xl"></div>

      <div className="space-y-4">
        <div className="bg-gray-300 h-8 w-2/3 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/4 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
        <div className="bg-gray-300 h-32 rounded"></div>
        <div className="bg-gray-300 h-12 w-40 rounded"></div>
      </div>

    </div>
  );
}