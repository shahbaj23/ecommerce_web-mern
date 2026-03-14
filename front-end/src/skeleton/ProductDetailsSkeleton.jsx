export default function ProductDetailSkeleton() {
  return (
    <div className="bg-gray-50 min-h-screen lg:px-20 md:px-10 px-5 py-10 animate-pulse">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left Image Section */}
        <div>
          <div className="w-full h-[500px] bg-gray-300 rounded-xl"></div>

          <div className="flex gap-4 mt-4">
            {[1,2,3,4].map((i)=>(
              <div key={i} className="w-20 h-20 bg-gray-300 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Right Details Section */}
        <div className="space-y-4">

          {/* Title */}
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>

          {/* Price */}
          <div className="h-6 bg-gray-300 rounded w-1/4"></div>

          {/* Stock */}
          <div className="h-4 bg-gray-300 rounded w-1/5"></div>

          {/* Size buttons */}
          <div className="flex gap-2 mt-3">
            {[1,2,3,4,5].map((i)=>(
              <div key={i} className="w-10 h-8 bg-gray-300 rounded"></div>
            ))}
          </div>

          {/* Description */}
          <div className="space-y-2 mt-4">
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>

          {/* Button */}
          <div className="w-40 h-12 bg-gray-300 rounded-lg mt-6"></div>

        </div>

      </div>

    </div>
  );
}