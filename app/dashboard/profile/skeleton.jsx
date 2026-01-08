export default function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-[#08090A] text-[#F7F8F8] font-sans p-4 md:p-8 animate-pulse">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Bento Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
          
          {/* 1. Large Profile Info Block */}
          <div className="md:col-span-2 md:row-span-2 bg-[#0E0F11] border border-white/5 rounded-3xl p-8 flex flex-col justify-between h-[400px]">
            <div className="flex justify-between items-start">
              <div className="w-32 h-32 rounded-full bg-white/5"></div>
              <div className="w-24 h-8 bg-white/5 rounded-xl"></div>
            </div>
            <div className="space-y-4 mt-6">
               <div className="h-8 w-1/2 bg-white/5 rounded-lg"></div>
               <div className="h-4 w-1/3 bg-white/5 rounded-lg"></div>
               <div className="h-20 w-full bg-white/5 rounded-xl"></div>
            </div>
            <div className="flex gap-2 mt-4">
                <div className="w-8 h-8 rounded-lg bg-white/5"></div>
                <div className="w-8 h-8 rounded-lg bg-white/5"></div>
                <div className="w-8 h-8 rounded-lg bg-white/5"></div>
            </div>
          </div>

          {/* 2. ID Card Block */}
          <div className="md:col-span-1 md:row-span-2 bg-[#0E0F11] border border-white/5 rounded-3xl p-6 h-[400px] flex flex-col justify-between">
              <div className="w-10 h-10 bg-white/5 rounded-xl mb-4"></div>
              <div className="space-y-4">
                  <div className="h-4 w-full bg-white/5 rounded"></div>
                  <div className="h-4 w-2/3 bg-white/5 rounded"></div>
                  <div className="h-10 w-full bg-white/5 rounded-xl"></div>
              </div>
              <div className="h-6 w-1/2 bg-white/5 rounded-full mx-auto"></div>
          </div>

          {/* 3. Stats Blocks */}
          <div className="bg-[#0E0F11] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/5 mb-2"></div>
              <div className="h-8 w-16 bg-white/5 rounded"></div>
              <div className="h-3 w-12 bg-white/5 rounded"></div>
          </div>
          
          <div className="bg-[#0E0F11] border border-white/5 rounded-3xl p-6 flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white/5 mb-2"></div>
              <div className="h-8 w-16 bg-white/5 rounded"></div>
              <div className="h-3 w-12 bg-white/5 rounded"></div>
          </div>

          {/* 4. Skills Block */}
          <div className="md:col-span-2 bg-[#0E0F11] border border-white/5 rounded-3xl p-6">
              <div className="h-5 w-24 bg-white/5 rounded mb-4"></div>
              <div className="flex gap-2 flex-wrap">
                  {[1,2,3,4,5].map(i => (
                      <div key={i} className="h-8 w-20 bg-white/5 rounded-xl"></div>
                  ))}
              </div>
          </div>

          {/* 5. Degree Block */}
          <div className="md:col-span-1 bg-[#0E0F11] border border-white/5 rounded-3xl p-6">
              <div className="h-4 w-16 bg-white/5 rounded mb-2"></div>
              <div className="h-6 w-24 bg-white/5 rounded mb-2"></div>
              <div className="h-3 w-20 bg-white/5 rounded"></div>
          </div>

          {/* 6. Contact Block */}
          <div className="md:col-span-1 bg-white/5 rounded-3xl p-6">
              <div className="w-10 h-10 bg-white/10 rounded-xl mb-4"></div>
              <div className="h-6 w-32 bg-white/10 rounded mb-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
