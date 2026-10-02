/**
 * Generates a screenshot per entry in content/projects.json into public/shots/<slug>.jpg.
 * Run with `npm run screenshots` (optionally pass slugs to limit: `npm run screenshots -- dragonfly invert`).
 *
 * Why build-time rather than a runtime screenshot service: the site stays static and fast,
 * has no third-party request on page load, and a flaky target can never blank a card.
 * Failures are reported and skipped; ProjectGrid falls back to a generated gradient tile.
 */
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import sharp from "sharp";

// `image` (optional): a remote URL to download instead of screenshotting. A local path under
// public/ is used as-is by the site and skipped here.
type Project = { slug: string; url: string; image?: string };

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public", "shots");
const VIEWPORT = { width: 1280, height: 800 };
const only = new Set(process.argv.slice(2));

// Optional: a secret header for sites behind Cloudflare. Add a WAF custom rule on YOUR zone
// ("header x-screenshot-token equals <secret>" -> action: Skip managed challenge / bot fight)
// and set SCREENSHOT_TOKEN so this script is let through. We don't try to evade challenges.
const TOKEN = process.env.SCREENSHOT_TOKEN;

// Text that means we got a bot-check/interstitial page instead of the real site.
const CHALLENGE = /just a moment|verify you are human|attention required|checking your browser|enable javascript and cookies|security check|performing security verification/i;

const projects: Project[] = JSON.parse(
  await readFile(path.join(ROOT, "content", "projects.json"), "utf8"),
);

await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  extraHTTPHeaders: TOKEN ? { "x-screenshot-token": TOKEN } : {},
  viewport: VIEWPORT,
  deviceScaleFactor: 1,
  colorScheme: "dark",
});

const failures: string[] = [];

for (const p of projects) {
  if (only.size && !only.has(p.slug)) continue;
  const file = path.join(OUT, `${p.slug}.jpg`);
  if (p.image && !/^https?:\/\//.test(p.image)) continue; // local override; nothing to generate
  if (p.image) {
    try {
      const res = await fetch(p.image);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await sharp(Buffer.from(await res.arrayBuffer()))
        .resize(960, 600, { fit: "cover", position: "top" })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(file);
      console.log(`ok    ${p.slug} (from image URL)`);
    } catch (err) {
      failures.push(p.slug);
      console.warn(`FAIL  ${p.slug}: image URL: ${(err as Error).message}`);
    }
    continue;
  }
  const page = await context.newPage();
  try {
    // "networkidle" never fires on sites with analytics beacons or long-polling, so wait for the
    // DOM and then give the network a bounded chance to settle instead of failing the shot.
    await page.goto(p.url, { waitUntil: "domcontentloaded", timeout: 45_000 });
    await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {});
    // Let webfonts/animations settle; idle alone misses late paints.
    await page.waitForTimeout(1500);
    const probe = `${await page.title()} ${(await page.locator("body").innerText({ timeout: 3000 }).catch(() => "")).slice(0, 600)}`;
    if (CHALLENGE.test(probe)) {
      throw new Error("bot-check/interstitial page (Cloudflare?), not saving");
    }
    const png = await page.screenshot({ type: "png" });
    await sharp(png)
      .resize(960, 600, { fit: "cover", position: "top" })
      .jpeg({ quality: 78, mozjpeg: true })
      .toFile(file);
    console.log(`ok    ${p.slug}`);
  } catch (err) {
    failures.push(p.slug);
    const challenged = /bot-check/.test((err as Error).message);
    // A previous shot of a now-challenged site is almost certainly the challenge page itself.
    if (challenged && existsSync(file)) await rm(file);
    const kept = existsSync(file) ? " (kept previous shot)" : "";
    console.warn(`FAIL  ${p.slug}: ${(err as Error).message.split("\n")[0]}${kept}`);
  } finally {
    await page.close();
  }
}

await browser.close();

// Manifest of shots that exist. The cards read it so they never request a missing file (which
// would 404 in the console before falling back to the gradient tile).
const present = (await readdir(OUT)).filter((f) => f.endsWith(".jpg"));
const manifest = Object.fromEntries(present.map((f) => [f.replace(/\.jpg$/, ""), `/shots/${f}`]));
await writeFile(path.join(ROOT, "content", "shots.json"), JSON.stringify(manifest, null, 2) + "\n");

if (failures.length) console.warn(`\n${failures.length} failed: ${failures.join(", ")}`);
