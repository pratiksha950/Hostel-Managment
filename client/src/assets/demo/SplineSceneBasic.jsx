import React from "react";

export default function SplineSceneBasic() {
  return (
    <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden rounded-[1.75rem] bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.2),_transparent_25%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(236,72,153,0.18),_transparent_25%)]" />
      <div className="relative z-10 flex h-full w-full items-center justify-center px-6 py-8">
        <div className="relative flex h-full w-full items-center justify-center rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_40px_80px_rgba(14,165,233,0.18)] backdrop-blur-xl">
          <div className="relative h-full w-full rounded-[1.75rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950/90 shadow-[inset_0_0_150px_rgba(255,255,255,0.05)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(56,189,248,0.18),_transparent_40%)]" />
            <div className="absolute inset-0 grid place-items-center">
              <div className="relative h-56 w-56 rounded-[2rem] border border-cyan-400/20 bg-white/5 shadow-[0_0_90px_rgba(59,130,246,0.18)]">
                <div className="absolute inset-0 rounded-[2rem] border border-white/5" />
                <div className="absolute left-6 top-6 h-4 w-4 rounded-full bg-cyan-400/80 blur-xl" />
                <div className="absolute right-8 bottom-10 h-5 w-5 rounded-full bg-fuchsia-400/70 blur-2xl" />
                <div className="absolute inset-x-10 bottom-14 h-14 rounded-full bg-white/5 blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs uppercase tracking-[0.45em] text-slate-400">
                    Spline Scene
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-10 left-1/2 h-28 w-28 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute top-10 right-10 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-3xl" />
    </div>
  );
}
