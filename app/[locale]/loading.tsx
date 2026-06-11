export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
      <div className="flex flex-col items-center gap-5">
        {/* Logo pulse */}
        <div className="relative">
          <div className="w-14 h-14 gradient-primary rounded-[var(--radius-lg)] animate-pulse" />
          <div className="absolute inset-0 gradient-primary rounded-[var(--radius-lg)] opacity-40 blur-xl animate-pulse-glow" />
        </div>

        {/* Skeleton lines */}
        <div className="flex flex-col items-center gap-2">
          <div className="skeleton w-32 h-3 rounded" />
          <div className="skeleton w-24 h-2.5 rounded" />
        </div>

        {/* Dots loader — pure CSS via inline styles */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-[hsl(var(--primary)/.6)]"
              style={{
                animation: "wedev-bounce 1.2s ease-in-out infinite",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
