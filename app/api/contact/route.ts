import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@<>"',;:()[\]\\]+@[^\s@<>"',;:()[\]\\]+\.[^\s@<>"',;:()[\]\\]+$/;

// Best-effort limiter. It lives in one container's memory, so it slows a single noisy client
// but is not a hard guarantee across Pantheon's horizontally scaled containers.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep the map bounded
  return recent.length > MAX_PER_WINDOW;
}

/** Strip CR/LF and header-significant characters: these values land in mail headers. */
function headerSafe(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/["<>]/g, "").trim();
}

function fail(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return fail("Too many messages. Please try again later.", 429);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  // Honeypot: bots fill every field. Pretend success so they don't adapt.
  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof payload.name === "string" ? headerSafe(payload.name) : "";
  const email = typeof payload.email === "string" ? payload.email.trim() : "";
  const message = typeof payload.message === "string" ? payload.message.trim() : "";

  if (!name || name.length > 100) return fail("Please enter your name.", 400);
  if (email.length > 254 || !EMAIL_RE.test(email)) return fail("Please enter a valid email address.", 400);
  if (message.length < 10 || message.length > 5000) {
    return fail("Your message should be between 10 and 5000 characters.", 400);
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("[contact] SMTP is not configured (SMTP_HOST/SMTP_USER/SMTP_PASS)");
    return fail("The contact form isn't available right now.", 503);
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    // Google displays app passwords in groups of four; the spaces aren't part of the password.
    auth: { user: SMTP_USER, pass: SMTP_PASS.replace(/\s+/g, "") },
  });

  try {
    await transporter.sendMail({
      // Gmail only sends as the authenticated account, so the visitor goes in the display name
      // and Reply-To; spoofing their address as From would fail SPF/DKIM/DMARC anyway.
      from: `"${name} via chrisreynolds.io" <${SMTP_USER}>`,
      to: CONTACT_TO || SMTP_USER,
      replyTo: `"${name}" <${email}>`,
      subject: `chrisreynolds.io: message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}\n`,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] send failed:", (err as Error).message);
    return fail("Couldn't send your message. Please try again later.", 502);
  }
}
