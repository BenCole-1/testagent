import Link from "next/link";

const items = [
  ["Dashboard", "/dashboard"],
  ["Facilities", "/facilities"],
  ["Calls", "/calls"],
  ["Follow up", "/follow-up"],
  ["Attribution", "/attribution"],
  ["Insights", "/insights"],
  ["Integrations", "/integrations"],
  ["Settings", "/settings"],
];

export function Sidebar() {
  return (
    <aside className="w-60 border-r border-slate-800 bg-slate-950 p-4">
      <h1 className="mb-6 text-lg font-semibold">StoreOps IQ</h1>
      <nav className="space-y-1">
        {items.map(([label, href]) => (
          <Link key={href} href={href} className="block rounded-md px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white">
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
