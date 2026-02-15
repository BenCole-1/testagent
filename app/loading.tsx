export default function Loading() {
  return <div className="grid gap-4 md:grid-cols-3">{Array.from({ length: 6 }).map((_, i) => <div key={i} className="h-24 animate-pulse rounded bg-slate-800" />)}</div>;
}
