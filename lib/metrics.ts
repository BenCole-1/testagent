import { Call, Reservation } from "@prisma/client";

export function pct(n: number) {
  return `${(n * 100).toFixed(1)}%`;
}

export function computeKPIs(calls: Call[], reservations: Reservation[]) {
  const sales = calls.filter(c => c.isSales);
  const answered = sales.filter(c => c.answered);
  const missed = sales.filter(c => !c.answered);
  const speed = answered.map(c => c.speedToAnswerSeconds ?? 0).sort((a,b) => a-b);
  const median = speed.length ? speed[Math.floor(speed.length / 2)] : 0;
  const moved = reservations.filter(r => r.moveInConfirmed).length;
  return {
    totalSalesCalls: sales.length,
    answeredRate: sales.length ? answered.length / sales.length : 0,
    missedSalesCalls: missed.length,
    medianSpeedToAnswer: median,
    reservations: reservations.length,
    moveIns: moved,
    impact: missed.length * 0.18 * 230
  };
}
