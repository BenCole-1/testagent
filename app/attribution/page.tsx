import { db } from "@/lib/db";

export default async function AttributionPage() {
  const calls = await db.call.findMany({ include: { reservation: true } });
  const bySource = Object.values(calls.reduce((acc, c) => {
    const key = c.source;
    if (!acc[key]) acc[key] = { source: key, calls: 0, reservations: 0, moveIns: 0, cost: key === "GOOGLE_ADS" ? 2400 : 0 };
    acc[key].calls++;
    if (c.reservation) acc[key].reservations++;
    if (c.reservation?.moveInConfirmed) acc[key].moveIns++;
    return acc;
  }, {} as Record<string, any>));

  return <div className="space-y-4">
    <h2 className="text-xl font-semibold">Attribution transparency</h2>
    <div className="card overflow-auto"><table className="w-full text-sm"><thead><tr><th className="text-left">Source</th><th>Calls</th><th>Reservations</th><th>Move-ins</th><th>Cost</th><th>Cost per move-in</th></tr></thead><tbody>{bySource.map((s:any)=><tr key={s.source} className="border-t border-slate-800"><td>{s.source}</td><td>{s.calls}</td><td>{s.reservations}</td><td>{s.moveIns}</td><td>{s.cost ? `$${s.cost}` : "-"}</td><td>{s.cost ? `$${Math.round(s.cost/Math.max(s.moveIns,1))}` : "-"}</td></tr>)}</tbody></table></div>
    <div className="grid gap-4 md:grid-cols-2">
      <div className="card text-sm"><h3 className="font-medium">Attribution quality meter</h3><p className="mt-2">Tracked with call tracking numbers: detailed call event and source info.</p><p>Not visible: GBP native call history details (unless routed).</p><p>Offline join needed: tie calls to reservations/move-ins in PMS.</p><div className="mt-3 rounded bg-slate-800 p-2">Confidence: Google Ads High · Marketplace Medium · GBP Low-Medium</div></div>
      <div className="card text-sm"><h3 className="font-medium">Google Ads optimization readiness</h3><ul className="list-disc pl-5"><li>Call reporting enabled: Yes</li><li>Forwarding numbers used: Yes</li><li>Offline conversion join configured: No</li></ul><button className="mt-3 rounded bg-emerald-700 px-3 py-1">Simulate enable offline join</button></div>
    </div>
  </div>;
}
