import "./globals.css";
import { Sidebar } from "@/components/nav";
import { Topbar } from "@/components/topbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1">
            <Topbar />
            <div className="p-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
