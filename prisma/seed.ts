import { PrismaClient, CallOutcome, CallReason, CallSource } from "@prisma/client";
import { addDays, addMinutes, subDays } from "date-fns";

const prisma = new PrismaClient();
const args = new Set(process.argv.slice(2));

const facilities = [
  ["Northgate Storage", "Phoenix", "AZ"],
  ["Mesa Secure Self Storage", "Mesa", "AZ"],
  ["Desert Valley Lockup", "Tempe", "AZ"],
  ["Sunrise Mini Storage", "Scottsdale", "AZ"],
  ["Cactus Point Storage", "Chandler", "AZ"],
  ["Red Rock Storage", "Gilbert", "AZ"],
  ["Arrowhead Storage Depot", "Glendale", "AZ"],
  ["Canyon Ridge Storage", "Peoria", "AZ"],
  ["South Mountain Storage", "Phoenix", "AZ"],
  ["Westside Flex Storage", "Avondale", "AZ"],
  ["Pioneer Lock & Store", "Goodyear", "AZ"],
  ["Camelback Storage Center", "Phoenix", "AZ"]
] as const;

const reasons = Object.values(CallReason);
const salesSources = [CallSource.GBP, CallSource.GOOGLE_ADS, CallSource.MARKETPLACE, CallSource.WEBSITE_ORGANIC, CallSource.REFERRAL, CallSource.OTHER];

function pick<T>(arr: T[]) { return arr[Math.floor(Math.random() * arr.length)]; }
function rand(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }

async function main() {
  if (args.has("--reset")) {
    await prisma.followUp.deleteMany();
    await prisma.reservation.deleteMany();
    await prisma.call.deleteMany();
    await prisma.facility.deleteMany();
    await prisma.operator.deleteMany();
  }

  const operator = await prisma.operator.create({ data: { name: "Canyon Vista Storage Group" } });

  const createdFacilities = await Promise.all(facilities.map(([name, city, state]) => prisma.facility.create({
    data: {
      operatorId: operator.id,
      name,
      city,
      state,
      timezone: "America/Phoenix",
      businessHours: "Mon-Sat 8:00 AM - 6:00 PM"
    }
  })));

  const start = subDays(new Date(), 30);
  let callCount = 0;

  for (const facility of createdFacilities) {
    const facilityCalls = rand(220, 290);
    for (let i = 0; i < facilityCalls; i++) {
      const dayOffset = rand(0, 29);
      const hourBase = pick([9,10,11,12,13,14,15,16,17,18,19,20]);
      const lunchSpike = [12,13,14].includes(hourBase);
      const afterHours = hourBase >= 18;
      const answered = Math.random() > (lunchSpike ? 0.42 : afterHours ? 0.5 : 0.28);
      const isSales = Math.random() > 0.25;
      const source = isSales ? pick(salesSources) : CallSource.OTHER;
      const callAt = addMinutes(addDays(start, dayOffset), hourBase * 60 + rand(0, 59));
      const outcome: CallOutcome = !isSales ? CallOutcome.UNKNOWN : (answered && Math.random() > 0.72 ? CallOutcome.RESERVED : (Math.random() > 0.92 ? CallOutcome.MOVED_IN : Math.random() > 0.65 ? CallOutcome.LOST : CallOutcome.UNKNOWN));
      const reason = answered ? pick(reasons) : CallReason.AFTER_HOURS_VOICEMAIL;
      const trackingNumber = source === CallSource.GOOGLE_ADS ? true : source === CallSource.GBP ? Math.random() > 0.55 : Math.random() > 0.3;

      const call = await prisma.call.create({
        data: {
          facilityId: facility.id,
          caller: `(${rand(480, 602)}) ${rand(200,999)}-${rand(1000,9999)}`,
          callAt,
          source,
          isSales,
          answered,
          speedToAnswerSeconds: answered ? rand(6, 62) : null,
          durationSeconds: answered ? rand(55, 640) : rand(5, 35),
          agent: answered ? pick(["Leah M.", "Carlos R.", "Mia J.", "Overflow Center"]) : null,
          aiScore: rand(48, 97),
          outcome,
          reason,
          transcript: `Caller asked about ${pick(["10x10", "climate", "RV", "promo rates"])}. ${Math.random() > 0.8 ? "Mentioned competitor by name." : "Asked for next available move-in date."}`,
          competitorMentioned: Math.random() > 0.82,
          trackingNumber,
          googleAdsCampaign: source === CallSource.GOOGLE_ADS ? pick(["Brand", "Near Me", "Climate Controlled"]) : null,
          googleAdsAdGroup: source === CallSource.GOOGLE_ADS ? pick(["Storage 10x10", "Drive Up", "Promo"]) : null
        }
      });
      callCount++;

      if (!answered && isSales && Math.random() > 0.12) {
        const attempts = rand(1, 3);
        for (let a = 0; a < attempts; a++) {
          await prisma.followUp.create({
            data: {
              facilityId: facility.id,
              callId: call.id,
              attemptAt: addMinutes(callAt, rand(4, 360) * (a + 1)),
              channel: pick(["call", "sms"]),
              owner: pick(["Facility Manager", "Leasing Agent", "Call Center"]),
              note: pick(["Left voicemail", "Sent text with availability", "Reached customer, promised callback", "No answer"])
            }
          });
        }
      }

      if (isSales && (outcome === CallOutcome.RESERVED || outcome === CallOutcome.MOVED_IN || Math.random() > 0.85)) {
        const reservedAt = addMinutes(callAt, rand(15, 7000));
        const moved = outcome === CallOutcome.MOVED_IN || Math.random() > 0.55;
        await prisma.reservation.create({
          data: {
            facilityId: facility.id,
            callId: Math.random() > 0.15 ? call.id : null,
            source: source,
            reservationName: pick(["Alex Carter", "Jordan Lee", "Taylor Morgan", "Casey Smith", "Riley Johnson"]),
            reservedAt,
            moveInConfirmed: moved,
            moveInName: moved ? pick(["Alex Carter", "Jordan Li", "Taylor M.", "Casey Smith", "R. Johnson"]) : null,
            moveInAt: moved ? addDays(reservedAt, rand(1, 12)) : null
          }
        });
      }
    }
  }

  console.log(`Seed complete with ${callCount} calls across ${createdFacilities.length} facilities.`);
}

main().finally(async () => prisma.$disconnect());
