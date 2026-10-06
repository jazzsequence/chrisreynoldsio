# chrisreynolds.io

Personal portfolio for Chris Reynolds, built on **P1** (Pantheon's AI-native web composition layer) as a Next.js 16 App Router site, scaffolded from `@pantheon-systems/create-p1-starter-kit`. Synthwave/retrowave design system. Deploys to a Pantheon Front-End (Next.js) site.

## Commands

Node **24** is required (`.nvmrc`). The default Node on this machine is 14; use `nvm use 24`. Node 22.6 also fails: jsdom `require()`s an ESM-only module, which needs Node >= 22.12.

| Command | What it does |
|---|---|
| `npm run dev` | Dev server, http://localhost:3000 (editor at `/p1`) |
| `npm run build` | Production build |
| `npm run lint` | ESLint (flat config, `eslint-config-next`) |
| `npm test` | Vitest (starter tests + ours) |
| `npx tsc --noEmit` | Typecheck |
| `npm run screenshots [-- slug ...]` | Regenerate project screenshots into `public/shots/` and rewrite `content/shots.json` |

Run lint, tsc, tests and build before committing.

## Where content lives (important)

- **Code** (blocks, styles, routes) is in this repo and ships through git.
- **Page content** (what's on `/`, `/about`, ...) lives in P1's content backend (CCR), keyed by site ID + workstream, **not in this repo**. Edit it in the visual editor at `/p1`. Dev, Test and Live all read the same content.
- Blocks must be registered in `puck.config.tsx` to appear in the editor.

## Layout

- `app/synthwave.css`: the design system. Tokens are CSS variables on `.sw-root`; components are `.sw-*` classes. Re-theme by editing the token block only.
- `app/styles.css`: Tailwind + font imports + the editor-safe `body:has(> .p1-app-shell)` reset (see the comment there before touching it).
- `components/puck/sw-*.tsx`: our blocks: Hero (sun + grid, home), Hero (interior) (the hero minus sun/grid, via shared `renderHero`), Section heading, Text (rich text), Bio (photo + text), Project grid, Contact form. **Content blocks carry no heading**: compose Section heading -> Text (optional intro) -> content block. Set the Section heading's Anchor ID to `work` / `contact` so the hero buttons (`#work`, `#contact`) land.
- `components/puck/root.tsx`: wraps pages in `.sw-root`. The theme is applied here, **not on `<body>`**, because the P1 editor chrome shares the stylesheet and Puck copies host styles into its canvas iframe.
- **Footer is a fieldless palette block with sitewide content.** `SwFooter` renders `SwSiteFooter` (`components/puck/sw-site-footer.tsx`), which reads `content/footer.json`, so every page that includes the block shows identical text/links. Add/remove the block per page to control placement; change the links by editing the JSON and deploying (not editable in `/p1`).
- `app/api/contact/route.ts`: contact form handler (nodemailer over Gmail SMTP).
- `content/projects.json`: single source for project cards **and** the screenshot script. `content/shots.json` is generated (which shots exist).
- `scripts/screenshots.ts`: Playwright, build-time. Run it manually; it is not part of `build`.

## Non-obvious decisions

- **Rich text has no Link button by default.** puck-css's stock `richtextField` toolbar is bold/italic/underline/lists only (Puck's link extension is registered but there's no menu control), so the starter's Paragraph block can't make links. `components/puck/sw-richtext-field.tsx` wraps `createRichtextField` with a custom `renderMenu` that adds a Link button (URLs validated by `lib/safe-link.ts`). Use `swRichtextField` for any new rich-text field.

- **Blocks that need the media picker name the field `image`** (also `logo`, `thumbnail`, `*ImageUrl`). P1 attaches the media library picker by field name (`puck-css/media-fields`).
- **Contact form From/Reply-To:** Gmail only sends as the authenticated account, so the visitor goes in the From *display name* and `Reply-To`. Spoofing their address as From would fail SPF/DKIM/DMARC. `SMTP_PASS` must be a Google **app password** (spaces are stripped in code). Rate limiting is in-memory per container, so best-effort only.
- **Screenshots and Cloudflare:** headless Chromium gets a bot check on some sites. The script detects the interstitial, refuses to save it, and deletes any stale shot. We do not evade challenges. Options: add a per-project `image` (URL downloaded by the script, or a local `/path` under `public/`), or add a Cloudflare skip rule on your own zone matching header `x-screenshot-token` and run with `SCREENSHOT_TOKEN` set. Cards without a shot fall back to a gradient tile with the title.
- **Hero geometry:** the sun's slits and the horizon lines are both derived from `--sw-c1..4` / `--sw-h1..4` on `.sw-hero`. Change those, not the gradients.
- **Fonts** are self-hosted via `@fontsource` (display: Oxanium; body: Inter; mono: JetBrains Mono). Swap the display face by changing the import in `app/styles.css` and `--sw-font-display`.
- **Starter source:** `pantheon-systems/puck-css-integration` is stale (SDK 0.8). The maintained starter is `pantheon-systems/p1-platform` -> `apps/p1-starter`; use the scaffolder rather than copying it.

## Environment

`.env` is gitignored. See `.env.example`. Required: `NEXT_PUBLIC_CSS_SITE_ID`, `CSS_API_KEY` (P1 dashboard token, scope "All content including drafts"). Contact form: `SMTP_HOST/PORT/USER/PASS`, `CONTACT_TO`. On Pantheon these are secrets (`terminus secret:site:set <site> NAME "value" --type=env --scope=web -n`), and `P1_SITE_URL` is set **per environment**.

## Deploying to Pantheon (not yet done)

1. GitHub repo + Pantheon Front-End (Next.js) site connected to it.
2. Add the Pantheon URLs and `https://chrisreynolds.io` to the site's **allowed origins** in the P1 dashboard (one `*` max, leftmost label), or editor sign-in fails.
3. Set the secrets above. `NEXT_PUBLIC_*` are baked at build time, so set them site-wide.
4. Push `main` -> Dev. Test/Live deploy from tags `pantheon_test_N` / `pantheon_live_N`. PRs only run security scans.
5. `terminus env:clear-cache <site>.<env>` after every deploy.
6. Verify: pages 200, `POST /p1/auth/login` 200, `/_next/static/*` 200, `/p1` opens the editor.
7. Unverified: outbound SMTP (465) from Pantheon's Next.js runtime. Test the contact form on Dev before switching DNS. The live domain currently serves WordPress.

## Open items

- Screenshots missing for next.jazzsequence.com, communitycode.dev, dmsguild.com, packages.jazzsequence.com (Cloudflare bot check). Need images or a skip rule.
- Project descriptions in `content/projects.json` for several entries are drafts; review them.
- P1 MCP could not see this site (`list_sites` empty): likely a different login than the dashboard.
