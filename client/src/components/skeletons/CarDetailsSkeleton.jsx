export default function CarDetailsSkeleton() {
  return (
    <div className="pt-28 px-6 max-w-6xl mx-auto animate-pulse">
      <div className="bg-white shadow-xl rounded-3xl p-6 md:p-10 grid md:grid-cols-2 gap-10">

        {/* Image Skeleton */}
        <div className="relative">
          <div className="w-full h-72 md:h-[420px] rounded-2xl bg-gray-200" />
        </div>

        {/* Right Panel */}
        <div className="flex flex-col justify-between">

          <div>
            {/* Title */}
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4" />

            {/* Location */}
            <div className="h-4 w-1/3 bg-gray-200 rounded mb-6" />

            {/* Badge */}
            <div className="h-6 w-24 bg-gray-200 rounded-full mb-6" />

            {/* Specs */}
            <div className="flex gap-6 mb-6">
              <div className="h-4 w-20 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>

            {/* Price */}
            <div className="h-8 w-32 bg-gray-200 rounded mb-6" />

            {/* Date inputs */}
            <div className="space-y-3">
              <div className="h-10 w-full bg-gray-200 rounded-xl" />
              <div className="h-10 w-full bg-gray-200 rounded-xl" />
            </div>
          </div>

          {/* Button */}
          <div className="h-12 w-full bg-gray-300 rounded-xl mt-8" />
        </div>

      </div>
    </div>
  );
}
