export default function SettingsPage() {
  return <div className="space-y-4"><h2 className="text-xl font-semibold">Settings</h2><div className="card"><h3 className="font-medium">Users & Roles</h3><ul className="mt-2 text-sm text-slate-300"><li>Owner</li><li>Regional manager</li><li>Facility manager</li><li>Call center agent</li></ul></div><div className="card text-sm"><h3 className="font-medium">Preferences</h3><p>Business hours, after-hours rules, notification channels (email/SMS placeholders).</p></div></div>;
}
