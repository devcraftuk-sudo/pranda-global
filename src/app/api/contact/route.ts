import { validateContact } from "@/lib/contact";
import { getMailConfig, sendContactEmail } from "@/lib/mail";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map<string, number[]>();

function json(body: unknown, status: number) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function clientAddress(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return "unknown";
}

function isRateLimited(address: string): boolean {
  const now = Date.now();
  const recent = (attempts.get(address) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_ATTEMPTS) {
    attempts.set(address, recent);
    return true;
  }
  recent.push(now);
  attempts.set(address, recent);
  return false;
}

export async function GET(request: Request) {
  // Reading the request keeps this check at request time rather than build time.
  void request.headers.get("accept");
  return json({ available: getMailConfig().ok }, 200);
}

export async function POST(request: Request) {
  if (isRateLimited(clientAddress(request))) {
    return json({ error: "rate_limited" }, 429);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return json({ error: "invalid" }, 400);
  }

  const raw = await request.text();
  if (raw.length > 20_000) return json({ error: "invalid" }, 400);

  let payload: unknown;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ error: "invalid" }, 400);
  }

  const result = validateContact(payload);
  if (!result.ok) return json({ error: "invalid", fields: result.fields }, 400);
  if (result.honeypot) return json({ ok: true }, 200);

  const delivery = await sendContactEmail(result.value);
  if (delivery === "unconfigured") return json({ error: "unavailable" }, 503);
  if (delivery === "failed") return json({ error: "send_failed" }, 502);
  return json({ ok: true }, 200);
}
