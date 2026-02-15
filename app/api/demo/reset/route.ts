import { execSync } from "node:child_process";

export async function POST() {
  execSync("npm run demo:reset", { stdio: "inherit" });
  return Response.json({ ok: true });
}
