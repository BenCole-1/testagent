import { db } from "@/lib/db";

export async function POST() {
  const facility = await db.facility.findFirst();
  if (!facility) return Response.json({ ok: false });

  const call = await db.call.create({
    data: {
      facilityId: facility.id,
      caller: "(602) 555-0199",
      callAt: new Date(),
      source: "GOOGLE_ADS",
      isSales: true,
      answered: false,
      speedToAnswerSeconds: null,
      durationSeconds: 14,
      aiScore: 72,
      outcome: "UNKNOWN",
      reason: "NEEDS_FOLLOW_UP",
      transcript: "Webhook test event from phone integration.",
      competitorMentioned: false,
      trackingNumber: true,
      googleAdsCampaign: "Brand",
      googleAdsAdGroup: "Storage 10x10"
    }
  });

  return Response.json({ ok: true, id: call.id });
}
