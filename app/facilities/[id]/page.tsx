import { db } from "@/lib/db";

export default async function FacilityDetail({ params, searchParams }: { params: { id: string }; searchParams: { tab?: string } }) {
  const tab = searchParams.tab || "overview";
  const facility = await db.facility.findUnique({ where: { id: params.id }, include: { calls: true, followUps: true, reservations: true } });
  if (!facility) return null;
  const sales = facility.calls.filter(c=>c.isSales);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{facility.name}</h2>
      <div className="flex gap-2 text-sm">{["overview","calls","follow-up","staffing","playbooks"].map(t=> <a key={t} href={`?tab=${t}`} className={`rounded px-3 py-1 ${tab===t?"bg-emerald-700":"bg-slate-800"}`}>{t}</a>)}</div>

      {tab === "overview" && <div className="grid gap-3 md:grid-cols-3"> 
        <div className="card"><div className="label">Answer rate</div><div className="metric">{Math.round((sales.filter(c=>c.answered).length/(sales.length||1))*100)}%</div></div>
        <div className="card"><div className="label">After hours coverage</div><div className="metric">62%</div></div>
        <div className="card"><div className="label">SLA compliance</div><div className="metric">58%</div></div>
        <div className="card"><div className="label">Move-ins from calls</div><div className="metric">{facility.reservations.filter(r=>r.moveInConfirmed).length}</div></div>
        <div className="card"><div className="label">Top objections</div><div className="metric">Price</div></div>
        <div className="card"><div className="label">Competitor mentions</div><div className="metric">{facility.calls.filter(c=>c.competitorMentioned).length}</div></div>
      </div>}

      {tab === "staffing" && <div className="card"><h3 className="font-medium">Coverage suggestion</h3><p className="text-sm text-slate-300 mt-2">Suggestion: add overflow from 12pm-3pm and after 6pm to reduce missed call spikes by ~22%.</p></div>}
      {tab === "playbooks" && <div className="card text-sm space-y-2"><p>If price objection is high: offer rate match, explain promotions, present smaller unit option.</p><p>If availability mismatch: offer waitlist and alternative facility.</p><p>If after-hours misses are high: enable missed-call text back and next-day priority queue.</p></div>}
      {tab === "calls" && <div className="card">{facility.calls.slice(0,20).map(c=><div key={c.id} className="border-b border-slate-800 py-2 text-sm">{c.callAt.toLocaleString()} · {c.caller} · {c.answered?"Answered":"Missed"}</div>)}</div>}
      {tab === "follow-up" && <div className="card">{facility.followUps.slice(0,20).map(f=><div key={f.id} className="border-b border-slate-800 py-2 text-sm">{f.attemptAt.toLocaleString()} · {f.channel} · {f.note}</div>)}</div>}
    </div>
  );
}
