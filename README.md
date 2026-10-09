# chrisreynolds.io

Chris Reynolds' personal portfolio: a synthwave/retrowave site listing projects, a bio, and a
contact form. It's a Next.js 16 App Router site on [P1](https://content.pantheon.io), Pantheon's
AI-native web composition layer, and deploys to a Pantheon Front-End (Next.js) site. Scaffolded
from `@pantheon-systems/create-p1-starter-kit`.

Code (blocks, styles, routes) lives in this repo. **Page content does not**: what's on `/`,
`/about`, etc. lives in P1's content backend and is edited in the visual editor at `/p1`. Dev,
Test and Live all read the same content.

`CLAUDE.md` has the longer notes on non-obvious decisions; this file is the quick tour.

## Getting started

Node **24** is required (`.nvmrc`); Node 22.6 and older fail on jsdom.

```bash
nvm use 24
cp .env.example .env   # then fill it in
npm install
npm run dev
```

Open http://localhost:3000 for the site, or http://localhost:3000/p1 for the editor.

### Environment

| Variable                                    | Purpose                                                           |
| ------------------------------------------- | ----------------------------------------------------------------- |
| `NEXT_PUBLIC_CSS_SITE_ID`                   | The **P1** site ID (not the Pantheon site UUID). Baked in at build time |
| `CSS_API_KEY`                               | P1 API token, scope "All content including drafts"                |
| `SMTP_HOST` / `SMTP_PORT` / `SMTP_USER` / `SMTP_PASS` | Contact form mail (Gmail SMTP). `SMTP_PASS` must be a Google app password |
| `CONTACT_TO` / `CONTACT_FROM`               | Where contact messages go / the From display address              |
| `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_SITE_NAME` | Site metadata                                                |
| `P1_SITE_URL`                               | Public URL of the environment, **set per environment** on Pantheon |

On Pantheon these are secrets, set with
`terminus secret:site:set <site> NAME "value" --type=env --scope=web -n`. `.env.example` documents
the optional P1 overrides (staging backend, media worker, etc.).

## Scripts

| Script                      | What it does                                                           |
| --------------------------- | ---------------------------------------------------------------------- |
| `npm run dev`               | Dev server                                                             |
| `npm run build` / `start`   | Production build / serve it                                            |
| `npm run lint`              | ESLint (flat config)                                                   |
| `npm run typecheck`         | `tsc --noEmit`                                                         |
| `npm test`                  | Vitest                                                                 |
| `npm run screenshots [-- slug ...]` | Regenerate project screenshots into `public/shots/` and rewrite `content/shots.json`. Run manually; not part of `build` |
| `npm run sync:registry`     | Push the Puck component registry to P1 (CI does this on push)          |

Run lint, typecheck, tests and build before committing. CI runs the same four on every PR.

## Layout

```
app/
  synthwave.css          # The design system: tokens on .sw-root, components as .sw-* classes
  styles.css             # Tailwind + font imports + editor-safe body reset
  api/contact/route.ts   # Contact form handler (nodemailer over Gmail SMTP)
  [...puckPath]/         # Published pages, rendered from P1 content
  p1/                    # Editor (/p1), page-data API, auth callbacks
components/puck/
  sw-*.tsx               # Our blocks (below)
  root.tsx               # Wraps pages in .sw-root (theme lives here, not on <body>)
content/
  projects.json          # Single source for project cards and the screenshot script
  shots.json             # Generated: which screenshots exist
  footer.json            # Sitewide footer text and links
lib/safe-link.ts         # URL validation for rich-text links
scripts/screenshots.ts   # Playwright screenshot generator
puck.config.tsx          # Block registry; a block must be registered here to appear in the editor
```

### Blocks

Hero (home, with sun and grid), Hero (interior), Section heading, Text (rich text), Bio, Project
grid, Contact form, and Footer. **Content blocks carry no heading.** Compose Section heading, then
an optional Text intro, then the content block. Set the Section heading's Anchor ID to `work` or
`contact` so the hero buttons (`#work`, `#contact`) land.

The Footer is a fieldless block that renders `content/footer.json`, so every page that includes it
shows identical text and links. Add or remove the block per page to control placement; change the
links by editing the JSON and deploying.

## Common tasks

- **Re-theme:** edit the token block at the top of `app/synthwave.css`. Hero sun slits and horizon
  lines derive from `--sw-c1..4` / `--sw-h1..4` on `.sw-hero`; change those, not the gradients.
- **Swap the display font:** change the `@fontsource` import in `app/styles.css` and
  `--sw-font-display`. Fonts are self-hosted (Oxanium, Inter, JetBrains Mono).
- **Add or edit a project:** edit `content/projects.json`, then `npm run screenshots -- <slug>`.
  Some sites sit behind a Cloudflare bot check and headless Chromium can't shoot them; give those
  a per-project `image` (URL or `/path` under `public/`) and the card uses it. Cards with no shot
  fall back to a gradient tile.
- **Add a block:** create `components/puck/sw-<name>-block.tsx` and register it in
  `puck.config.tsx`. Use `swRichtextField` (`sw-richtext-field.tsx`) for rich text, since the stock
  field has no Link button. Name a field `image` (or `logo`, `thumbnail`, `*ImageUrl`) to get the
  media picker.
- **Contact form:** Gmail only sends as the authenticated account, so the visitor goes in the From
  display name and `Reply-To`. Rate limiting is in-memory per container, so best-effort only.

## CI and dependencies

- **Dependabot** opens weekly npm and GitHub Actions PRs (npm minor/patch grouped, majors
  separate). `@pantheon-systems/pds-toolkit-react` is pinned to an exact alpha; review its bumps
  by hand.
- **`ci.yml`** runs lint, typecheck, tests and build on PRs and `main`. The build needs no secrets,
  so Dependabot PRs can run it.
- **`sync-puck-registry.yml`** pushes the component registry to P1 when `puck.config.tsx` or
  `components/puck/**` change. It needs repo variables `CSS_BASE_URL` and `CSS_SITE_ID`, and repo
  secret `CSS_REGISTRY_API_KEY` (a P1 token with only "Component registry sync"). It can also be
  run by hand from the Actions tab.

## Deploying

Pantheon Front-End (Next.js) site connected to this repo. Pushing `main` deploys to Dev; Test and
Live deploy from tags `pantheon_test_N` / `pantheon_live_N`. Run
`terminus env:clear-cache <site>.<env>` after every deploy. The editor needs the site's URLs in
the **allowed origins** list in the P1 dashboard (one `*` max, leftmost label), or sign-in fails.
See `CLAUDE.md` for the full checklist.
