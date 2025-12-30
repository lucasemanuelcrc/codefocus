export function DashboardSkeleton() {
  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden">
      {/* Sidebar Skeleton */}
      <aside className="w-64 border-r border-slate-800/60 bg-[#020617] hidden md:flex flex-col p-6 space-y-8">
         <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 bg-slate-800 rounded animate-pulse" />
            <div className="w-24 h-4 bg-slate-800 rounded animate-pulse" />
         </div>
         <div className="space-y-3">
            {[1, 2, 3].map(i => <div key={i} className="w-full h-8 bg-slate-800/50 rounded animate-pulse" />)}
         </div>
      </aside>

      {/* Main Content Skeleton */}
      <main className="flex-1 p-8 overflow-y-auto">
         {/* Stats Skeleton */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-slate-800/40 rounded-xl animate-pulse" />)}
         </div>

         {/* Grid Cards Skeleton */}
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-48 bg-slate-800/20 rounded-xl border border-slate-800/50 animate-pulse flex flex-col p-5 space-y-4">
                 <div className="flex justify-between">
                    <div className="w-16 h-5 bg-slate-800 rounded-full" />
                    <div className="w-5 h-5 bg-slate-800 rounded-full" />
                 </div>
                 <div className="w-3/4 h-6 bg-slate-800 rounded" />
                 <div className="space-y-2">
                    <div className="w-full h-3 bg-slate-800/50 rounded" />
                    <div className="w-2/3 h-3 bg-slate-800/50 rounded" />
                 </div>
              </div>
            ))}
         </div>
      </main>
    </div>
  );
}