import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function CallDetail({ params }: { params: { id: string } }) {
  const call = await db.call.findUnique({ where: { id: params.id }, include: { followUps: true, reservation: true, facility: true } });
  if (!call) return null;
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Call detail · {call.caller}</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <h3 className="font-medium">Transcript</h3>
          <p className="mt-2 text-sm text-slate-300">{call.transcript}</p>
          <div className="mt-4 rounded bg-slate-800 p-3 text-sm">Recording player placeholder</div>
          <h4 className="mt-4 font-medium">Timeline</h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-300">
            <li>Call at {call.callAt.toLocaleString()}</li>
            {call.followUps.map(f=><li key={f.id}>Follow-up ({f.channel}) at {f.attemptAt.toLocaleString()}</li>)}
            {call.reservation && <li>Reservation at {call.reservation.reservedAt.toLocaleString()}</li>}
            {call.reservation?.moveInAt && <li>Move-in at {call.reservation.moveInAt.toLocaleString()}</li>}
          </ul>
        </div>
        <div className="card text-sm space-y-2">
          <h3 className="font-medium">Scorecard</h3>
          <p>Reservation offered: {call.outcome !== "UNKNOWN" ? "Yes" : "No"}</p>
          <p>Next step scheduled: {call.followUps.length > 0 ? "Yes" : "No"}</p>
          <p>Price discussed: {call.reason === "PRICE_OBJECTION" ? "Yes" : "No"}</p>
          <p>Competitor mentioned: {call.competitorMentioned ? "Yes" : "No"}</p>
          <p>Objection categories: {call.reason}</p>
          <p>Compliance checklist: {(call.aiScore > 70) ? "Pass" : "Needs coaching"}</p>
          <textarea defaultValue="Coaching note: tighten next-step close and urgency framing." className="h-24 w-full rounded bg-slate-800 p-2" />
        </div>
      </div>
    </div>
  );
}
