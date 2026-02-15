import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function FacilitiesPage() {
  const facilities = await db.facility.findMany({ include: { calls: true, reservations: true } });
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Facilities</h2>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {facilities.map((f) => {
          const sales = f.calls.filter(c=>c.isSales);
          const answered = sales.filter(c=>c.answered).length;
          return (
            <Link key={f.id} href={`/facilities/${f.id}`} className="card block hover:border-emerald-600">
              <h3 className="font-medium">{f.name}</h3>
              <p className="text-xs text-slate-400">{f.city}, {f.state}</p>
              <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                <div><div className="label">Answered</div><div>{Math.round((answered / (sales.length || 1)) * 100)}%</div></div>
                <div><div className="label">Missed trend</div><div>{sales.length - answered}</div></div>
                <div><div className="label">Move-ins</div><div>{f.reservations.filter(r=>r.moveInConfirmed).length}</div></div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
