export function SkeletonCard() {
  return (
    <div className="glass animate-pulse overflow-hidden rounded-2xl">
      <div className="aspect-square bg-white/10" />
      <div className="space-y-2 p-4">
        <div className="h-4 w-2/3 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
      </div>
    </div>
  );
}
