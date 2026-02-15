"use client";
import { useState } from "react";

const cards = ["Phone and call tracking", "Web DNI", "PMS", "Marketplaces", "Google Ads"];

export default function IntegrationsPage() {
  const [status, setStatus] = useState<Record<string, string>>({});

  async function sendWebhook() {
    await fetch("/api/integrations/test-webhook", { method: "POST" });
    alert("Sample call event ingested into call log.");
  }

  return <div className="space-y-4"><h2 className="text-xl font-semibold">Integrations wizard</h2>
    <div className="grid gap-3 md:grid-cols-2">{cards.map(c => <div key={c} className="card"><h3 className="font-medium">{c}</h3><p className="mt-1 text-sm text-slate-300">Status: {status[c] || "Not connected"}</p><p className="text-xs text-slate-400 mt-2">Data available without deeper access: call metadata, source tags, reservation status.</p><p className="text-xs text-slate-400">Permissions required for full fidelity: API scopes, facility mapping, identity matching.</p><button onClick={() => setStatus((s)=>({ ...s, [c]: "Connected (mock token)" }))} className="mt-2 rounded bg-slate-700 px-3 py-1 text-sm">Connect</button>{c === "Phone and call tracking" && <button onClick={sendWebhook} className="ml-2 rounded bg-emerald-700 px-3 py-1 text-sm">Send test webhook</button>}</div>)}</div>
    <div className="card text-sm"><h3 className="font-medium">PMS mapping and identity matching</h3><p>Mock connectors: SiteLink, storEDGE (read-only mode).</p><p className="mt-2">Resolve match example: "Jordan Lee" reservation likely equals "Jordan Li" move-in.</p><button className="mt-2 rounded bg-slate-700 px-3 py-1">Resolve match</button></div>
  </div>;
}
