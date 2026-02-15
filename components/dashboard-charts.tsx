"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

export function DashboardCharts({ facilityRows, reasons, hourly }: { facilityRows: any[]; reasons: any[]; hourly: any[] }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="card">
        <h3 className="mb-3 font-medium">Facility variance</h3>
        <table className="w-full text-sm">
          <thead className="text-slate-400"><tr><th className="text-left">Facility</th><th>Sales</th><th>Answered</th><th>Move-in</th><th>SLA</th></tr></thead>
          <tbody>{facilityRows.map((r) => <tr key={r.name} className="border-t border-slate-800"><td>{r.name}</td><td className="text-center">{r.sales}</td><td className="text-center">{r.answeredRate}%</td><td className="text-center">{r.moveInRate}%</td><td className="text-center">{r.sla > 30 ? <span className="rounded bg-rose-900 px-2 py-1 text-xs">Needs attention</span> : "OK"}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="card h-72">
        <h3 className="mb-3 font-medium">Missed call heat by hour</h3>
        <ResponsiveContainer width="100%" height="100%"><BarChart data={hourly}><XAxis dataKey="hour" /><YAxis /><Tooltip /><Bar dataKey="missed" fill="#f97316" /></BarChart></ResponsiveContainer>
      </div>
      <div className="card h-72">
        <h3 className="mb-3 font-medium">Top loss reasons</h3>
        <ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={reasons} dataKey="value" nameKey="name" outerRadius={90}>{reasons.map((_: any,i:number)=><Cell key={i} fill={["#ef4444","#f59e0b","#3b82f6","#06b6d4","#8b5cf6","#22c55e","#64748b"][i%7]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer>
      </div>
      <div className="card">
        <h3 className="mb-3 font-medium">Funnel snapshot</h3>
        <ul className="space-y-2 text-sm">
          <li>Calls + web reservations → Contacted → Reserved → Moved in</li>
          <li>Drop-off is highest at contact to reservation when follow-up &gt; 10 min.</li>
          <li>Organic local calls remain partially blind without tracked routing.</li>
        </ul>
      </div>
    </div>
  );
}
