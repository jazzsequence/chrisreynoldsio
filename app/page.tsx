export default function Home() {
  return (
    <main className="min-h-screen font-sans">
      {/* Hero */}
      <section className="px-6 py-24 md:py-32 max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
          You&rsquo;re live on Pantheon.
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
          This page is being served by your new Next.js site — built from the{" "}
          <code className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border">
            nextjs16
          </code>{" "}
          upstream, deployed through Pantheon&rsquo;s Git-based workflow, and
          delivered over our Global CDN. Everything worked. Now make it yours.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://dashboard.pantheon.io"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-bold bg-btn-bg text-btn-fg hover:opacity-90 transition-opacity"
          >
            Open your Dashboard
          </a>
          <a
            href="https://docs.pantheon.io/nextjs"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-bold bg-btn-outline-bg text-btn-outline-fg border border-btn-outline-border hover:opacity-80 transition-opacity"
          >
            View the docs
          </a>
        </div>
      </section>

      <hr className="border-border max-w-3xl mx-auto" />

      {/* What just happened */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground">
          What just happened
        </h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-semibold text-foreground">
              Deployed via Git.
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Your code lives in a repo wired to Dev, Test, and Live
              environments. Push a commit and Pantheon builds and deploys it — no
              pipeline to configure, no servers to babysit.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Rendered by Next.js&nbsp;16.
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              Server components, ISR, API routes — the full framework runs here
              in production, managed.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              Delivered by the CDN.
            </h3>
            <p className="mt-2 text-sm text-muted leading-relaxed">
              This page is already cached at the edge. Your site stays fast
              under traffic spikes, and your backend stays protected from bots —
              from day one, not after a config project.
            </p>
          </div>
        </div>
      </section>

      <hr className="border-border max-w-3xl mx-auto" />

      {/* Make it yours */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground">Make it yours</h2>
        <ol className="mt-10 space-y-8 list-none counter-reset-steps">
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-medium text-foreground">
              1
            </span>
            <div>
              <p className="font-semibold text-foreground">
                Clone your repo.
              </p>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                Grab the connection info from your dashboard, run{" "}
                <code className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border">
                  npm install && npm run dev
                </code>
                , and you&rsquo;re editing locally in minutes.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-medium text-foreground">
              2
            </span>
            <div>
              <p className="font-semibold text-foreground">
                Open a pull request.
              </p>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                Every PR gets its own full preview environment — a real URL your
                whole team can review before anything ships.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-medium text-foreground">
              3
            </span>
            <div>
              <p className="font-semibold text-foreground">
                Connect a backend.
              </p>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                Pair this frontend with WordPress, Drupal, or Content Publisher
                for a decoupled architecture your content team will actually
                enjoy.
              </p>
            </div>
          </li>
          <li className="flex gap-4">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-sm font-medium text-foreground">
              4
            </span>
            <div>
              <p className="font-semibold text-foreground">
                Replace this page.
              </p>
              <p className="mt-1 text-sm text-muted leading-relaxed">
                To make this homepage feel like home, edit{" "}
                <code className="font-mono text-sm bg-surface px-1.5 py-0.5 rounded border border-border">
                  app/page.tsx
                </code>
                , commit and push.
              </p>
            </div>
          </li>
        </ol>
      </section>

      <hr className="border-border max-w-3xl mx-auto" />

      {/* Bringing an existing site? */}
      <section className="px-6 py-20 max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-foreground">
          Bringing an existing site?
        </h2>
        <p className="mt-4 text-muted leading-relaxed max-w-xl mx-auto">
          Most teams move their first Next.js site to Pantheon in under an hour.
          Talk to your Customer Success Manager to book a 30-minute working
          session and we&rsquo;ll migrate one live, together.
        </p>
        <div className="mt-8">
          <a
            href="https://pantheon.io/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-md text-sm font-bold bg-btn-bg text-btn-fg hover:opacity-90 transition-opacity"
          >
            Book a migration session
          </a>
        </div>
      </section>

      <hr className="border-border max-w-3xl mx-auto" />

      {/* Go deeper */}
      <section className="px-6 py-20 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-foreground">Go deeper</h2>

        <div className="mt-10 space-y-10">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Docs
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://docs.pantheon.io/nextjs"
                  className="font-medium text-foreground hover:underline"
                >
                  Next.js on Pantheon overview
                </a>
                <p className="mt-0.5 text-sm text-muted">
                  Tutorials, requirements, and the recommended getting-started
                  walkthrough.
                </p>
              </li>
              <li>
                <a
                  href="https://docs.pantheon.io/nextjs/architecture"
                  className="font-medium text-foreground hover:underline"
                >
                  Build &amp; runtime architecture
                </a>
                <p className="mt-0.5 text-sm text-muted">
                  How Pantheon runs Next.js in containers behind the Global CDN,
                  and how builds are triggered.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Watch
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://pantheon.io/events/webinar/pantheon-platform-tour-nextjs-pantheon"
                  className="font-medium text-foreground hover:underline"
                >
                  Platform Tour: Next.js in Pantheon
                </a>
                <p className="mt-0.5 text-sm text-muted">
                  On-demand webinar going step-by-step from zero to a live
                  Next.js site, including a Content Publisher to Next.js content
                  update demo.
                </p>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/getpantheon"
                  className="font-medium text-foreground hover:underline"
                >
                  LinkedIn Lives from Pantheon
                </a>
                <p className="mt-0.5 text-sm text-muted">
                  Conversations on modern web development, including the Figma
                  to Claude to Next.js to Pantheon rebuild, the
                  PHP-to-JavaScript talent shift, Going Headless Without Losing
                  Your Head, and Next.js for Grownups.
                </p>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
              Read
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a
                  href="https://pantheon.io/blog/nextjs-ga"
                  className="font-medium text-foreground hover:underline"
                >
                  Next.js on Pantheon is available for all
                </a>
                <p className="mt-0.5 text-sm text-muted">
                  The GA announcement covering the managed runtime, CDN,
                  persistent caching, ISR, and per-PR preview environments.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="px-6 py-10 border-t border-border text-center text-sm text-muted">
        Powered by Pantheon
      </footer>
    </main>
  );
}
