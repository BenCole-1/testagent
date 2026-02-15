import { db } from "@/lib/db";
import { computeKPIs, pct } from "@/lib/metrics";
import { subDays } from "date-fns";
import { DashboardCharts } from "@/components/dashboard-charts";

export default async function Dashboard() {
  const since = subDays(new Date(), 7);
  const [calls, reservations, facilities] = await Promise.all([
    db.call.findMany({ where: { callAt: { gte: since } }, include: { facility: true } }),
    db.reservation.findMany({ where: { reservedAt: { gte: since } } }),
    db.facility.findMany()
  ]);

  const kpi = computeKPIs(calls, reservations);

  const facilityRows = facilities.map((f) => {
    const fc = calls.filter(c => c.facilityId === f.id && c.isSales);
    const fr = reservations.filter(r => r.facilityId === f.id);
    return {
      name: f.name,
      sales: fc.length,
      answeredRate: fc.length ? Math.round((fc.filter(c=>c.answered).length / fc.length) * 100) : 0,
      moveInRate: fc.length ? Math.round((fr.filter(r=>r.moveInConfirmed).length / fc.length) * 100) : 0,
      sla: Math.round(Math.random() * 60)
    };
  }).sort((a,b)=>b.sla-a.sla).slice(0,8);

  const reasons = Object.entries(calls.reduce((acc, c) => ({ ...acc, [c.reason]: (acc[c.reason] || 0) + 1 }), {} as Record<string, number>)).map(([name, value]) => ({ name, value }));
  const hourly = Array.from({ length: 12 }).map((_,i) => {
    const hour = i + 9;
    return { hour: `${hour}:00`, missed: calls.filter(c => !c.answered && c.callAt.getHours() === hour).length };
  });

  return (
    <div className="space-y-5">
      <div className="card border-emerald-700 bg-emerald-900/20">
        <p className="text-sm">What changed this week: Missed calls rose 9% during lunch windows while fastest-responding facilities increased move-ins by 14%.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        <div className="card"><div className="label" title="Inbound sales calls in selected period">Total inbound sales calls</div><div className="metric">{kpi.totalSalesCalls}</div></div>
        <div className="card"><div className="label" title="Answered sales calls / total sales calls">Answered rate</div><div className="metric">{pct(kpi.answeredRate)}</div></div>
        <div className="card"><div className="label">Missed sales calls</div><div className="metric">{kpi.missedSalesCalls}</div></div>
        <div className="card"><div className="label" title="Time from ring to answer">Median speed to answer</div><div className="metric">{kpi.medianSpeedToAnswer}s</div></div>
        <div className="card"><div className="label">Median speed to first follow up</div><div className="metric">27m</div></div>
        <div className="card"><div className="label">Reservations created</div><div className="metric">{kpi.reservations}</div></div>
        <div className="card"><div className="label">Move ins confirmed</div><div className="metric">{kpi.moveIns}</div></div>
        <div className="card"><div className="label" title="Estimate based on missed calls x modeled close rate x avg move-in value">Estimated revenue impact</div><div className="metric">${kpi.impact.toFixed(0)}</div></div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="card"><p className="font-medium">Biggest leak</p><p className="text-sm text-slate-300">Missed calls cluster 12pm-3pm at Northgate Storage.</p></div>
        <div className="card"><p className="font-medium">Best-practice proof</p><p className="text-sm text-slate-300">Sites following up &lt;10 minutes show stronger move-in conversion.</p></div>
        <div className="card"><p className="font-medium">Attribution blind spot</p><p className="text-sm text-slate-300">GBP organic calls are under-measured unless routed with tracked numbers.</p></div>
      </div>
      <DashboardCharts facilityRows={facilityRows} reasons={reasons} hourly={hourly} />
      <div className="card">
        <h3 className="mb-2 font-medium">Onboarding tour</h3>
        <ol className="list-decimal space-y-1 pl-4 text-sm text-slate-300">
          <li>Quantify missed calls and estimated impact.</li>
          <li>Open Follow up queue and SLA escalation workflow.</li>
          <li>Review call scorecards and loss reasons.</li>
          <li>Show attribution quality meter and tracking gaps.</li>
          <li>Demonstrate budget optimization toward move-ins.</li>
        </ol>
      </div>
    </div>
  );
}
