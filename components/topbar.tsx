"use client";

import { useState } from "react";

export function Topbar() {
  const [loading, setLoading] = useState(false);

  async function resetDemo() {
    setLoading(true);
    await fetch("/api/demo/reset", { method: "POST" });
    window.location.reload();
  }

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900 px-6 py-3">
      <div className="flex items-center gap-3 text-sm">
        <select className="rounded bg-slate-800 px-2 py-1"><option>Canyon Vista Portfolio</option></select>
        <select className="rounded bg-slate-800 px-2 py-1"><option>Last 7 days</option><option>Last 30 days</option></select>
        <input placeholder="Search calls or leads" className="rounded bg-slate-800 px-2 py-1" />
      </div>
      <div className="flex items-center gap-3">
        <span className="rounded-full bg-rose-900 px-2 py-1 text-xs">7 SLA breaches</span>
        <button onClick={resetDemo} className="rounded bg-emerald-600 px-3 py-1 text-sm hover:bg-emerald-500">{loading ? "Resetting..." : "Demo mode: Reset data"}</button>
      </div>
    </header>
  );
}
