export default function InsightsPage() {
  const insights = [
    ["Biggest revenue leak", "Missed calls peak during tours and lunch windows.", "Logic: missed-call heatmap + staffing overlap windows."],
    ["Top win", "Facility A follows up in <10m and converts higher.", "Logic: compare median follow-up lag vs move-in rate by facility."],
    ["Coaching", "Price objections rose after rate updates.", "Logic: reason-code trend + transcript keyword frequency."],
    ["Outlier", "Tenant calls consume leasing queue at 3 facilities.", "Logic: tenant/sales call mix by location and hour."],
    ["Experiment", "Route after-hours calls to overflow and text-back bot.", "Logic: modeled win-back from historical no-answer outcomes."]
  ];
  return <div className="space-y-3"><h2 className="text-xl font-semibold">Weekly executive summary</h2>{insights.map(([title, body, explain]) => <div className="card" key={title}><div className="flex items-center justify-between"><h3 className="font-medium">{title}</h3><details className="text-xs text-slate-400"><summary>Explain</summary>{explain}</details></div><p className="text-sm text-slate-300 mt-1">{body}</p></div>)}</div>;
}
