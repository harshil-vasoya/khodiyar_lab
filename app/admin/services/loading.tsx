export default function ServicesLoading() {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-5 w-96 bg-gray-200 rounded animate-pulse" />
        </div>
  
        <div className="flex flex-col gap-4">
          <div className="border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2" />
                <div className="h-4 w-64 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-9 w-32 bg-gray-200 rounded animate-pulse" />
            </div>
  
            <div className="flex flex-col sm:flex-row gap-4 justify-between mb-6">
              <div className="h-10 w-full sm:w-96 bg-gray-200 rounded animate-pulse" />
              <div className="flex flex-wrap gap-2">
                <div className="h-10 w-[180px] bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-[150px] bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-10 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
  
            <div className="rounded-md border">
              <div className="h-12 w-full bg-gray-200 rounded-t animate-pulse" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-16 w-full bg-gray-100 border-t animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  