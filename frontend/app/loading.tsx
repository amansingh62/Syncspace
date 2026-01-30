export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="bg-white/85 backdrop-blur rounded-3xl border border-black/5 shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold tracking-tight">SyncSpace</div>
          <div className="h-9 w-9 rounded-2xl border border-[#E08476]/30 bg-linear-to-br from-[#E08476]/25 to-[#E08476]/5 animate-spin [animation-duration:1200ms]" />
        </div>
        <div className="mt-8 text-slate-700 font-medium">Loading…</div>
        <div className="mt-2 text-sm text-slate-500">
          Getting things ready for you.
        </div>
        <div className="mt-6 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
          <div className="h-full w-1/2 bg-linear-to-r from-[#E08476] via-[#F1C6C0] to-purple-400/60 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

