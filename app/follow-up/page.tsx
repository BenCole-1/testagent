import { db } from "@/lib/db";
import { differenceInMinutes } from "date-fns";

export default async function FollowUpPage() {
  const calls = await db.call.findMany({ where: { answered: false, isSales: true }, orderBy: { callAt: "desc" }, take: 40, include: { facility: true, followUps: true } });
  const today = calls.filter(c => differenceInMinutes(new Date(), c.callAt) < 1440);
  const overdue = calls.filter(c => differenceInMinutes(new Date(), c.callAt) >= 1440);

  const renderQueue = (items: typeof calls) => <div className="space-y-2">{items.map(c => {
    const mins = differenceInMinutes(new Date(), c.callAt);
    const badge = mins < 10 ? "bg-emerald-700" : mins < 60 ? "bg-amber-700" : "bg-rose-700";
    return <div key={c.id} className="card text-sm"><div className="flex justify-between"><div>{c.caller} · {c.facility.name}</div><span className={`rounded px-2 py-0.5 ${badge}`}>{mins}m</span></div><div className="mt-1 text-slate-400">Attempts: {c.followUps.length} · Next: callback · Owner: Facility staff</div><div className="mt-2 flex gap-2 text-xs"><button className="rounded bg-slate-700 px-2 py-1">Call now</button><button className="rounded bg-slate-700 px-2 py-1">Send text</button><button className="rounded bg-slate-700 px-2 py-1">Mark contacted</button><button className="rounded bg-slate-700 px-2 py-1">Create reservation</button><button className="rounded bg-slate-700 px-2 py-1">Mark moved in</button><button className="rounded bg-slate-700 px-2 py-1">Mark lost</button></div></div>;
  })}</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Follow up execution engine</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2"><h3 className="mb-2 font-medium">Today queue</h3>{renderQueue(today)}</div>
        <div className="card"><h3 className="font-medium">SLA rules</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-300"><li>Missed sales calls: first attempt within 10 minutes during business hours.</li><li>After-hours missed calls: immediate text back + next-day priority queue.</li><li>Web reservations: first attempt within 10 minutes.</li></ul><h4 className="mt-3 font-medium">Escalation</h4><p className="text-sm text-slate-300">No attempt in 15 min → notify manager. No attempt in 45 min → notify owner.</p><div className="mt-3 rounded bg-rose-900/40 p-2 text-xs">Alert: 3 leads have breached both manager and owner escalation windows.</div></div>
      </div>
      <div className="card"><h3 className="mb-2 font-medium">Overdue queue</h3>{renderQueue(overdue.slice(0, 12))}</div>
    </div>
  );
}
