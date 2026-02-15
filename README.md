# StoreOps IQ Demo Prototype

Clickable prototype for independent self-storage operators (3-30 facilities), focused on conversion intelligence, phone lead follow-up discipline, and attribution transparency.

## Run locally

```bash
npm install
npm run db:push
npm run seed
npm run dev
```

Open http://localhost:3000.

## One-command start (after install)

```bash
npm run db:push && npm run seed && npm run dev
```

## Reset demo data

- In-app button: **Demo mode: Reset data** (top bar)
- Or CLI:

```bash
npm run demo:reset
```

## Seed data design

- `prisma/seed.ts` controls distributions.
- 12 facilities under one operator.
- ~3000 calls over 30 days with missed call spikes at lunch/tours/after-hours.
- Mixed sales + tenant calls.
- Follow-up attempts with variable delays.
- Reservations + move-ins linked to some calls, with deliberate gaps and name mismatches.
- GBP blind-spot simulation unless tracking numbers are used.

## Demo script (5 minutes)

1. **Dashboard**: Show missed calls, answered rate, impact estimate, and facility variance.
2. **Follow up**: Open Today queue, highlight SLA badge + escalation feed.
3. **Calls**: Open one call detail and show scorecard/loss reason/coaching note.
4. **Attribution**: Explain quality meter (what is known vs unknown).
5. **Integrations**: Click Connect + Send test webhook and show a new call in log.

## Notes

- This is a seeded offline demo prototype (no proprietary APIs).
- Google Ads workflow is simulated (no real API calls).
- Phone webhook uses a local mock endpoint (`/api/integrations/test-webhook`).
