import Link from "next/link";
import { db } from "@/lib/db";

export default async function CallsPage() {
  const calls = await db.call.findMany({ orderBy: { callAt: "desc" }, take: 100, include: { facility: true } });
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Call intelligence</h2>
      <div className="card text-sm">Filters: Facility · Source · Answered/Missed · Sales/Tenant · Duration · Outcome</div>
      <div className="card overflow-auto">
        <table className="w-full text-sm">
          <thead className="text-slate-400"><tr><th className="text-left">Caller</th><th>Time</th><th>Facility</th><th>Source</th><th>Answered</th><th>Duration</th><th>Agent</th><th>AI</th><th>Outcome</th><th>Reason</th></tr></thead>
          <tbody>{calls.map(c => <tr key={c.id} className="border-t border-slate-800"><td><Link className="text-emerald-400" href={`/calls/${c.id}`}>{c.caller}</Link></td><td>{c.callAt.toLocaleString()}</td><td>{c.facility.name}</td><td>{c.source}</td><td>{c.answered?"Yes":"No"}</td><td>{c.durationSeconds}s</td><td>{c.agent || "-"}</td><td>{c.aiScore}</td><td>{c.outcome}</td><td>{c.reason}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
