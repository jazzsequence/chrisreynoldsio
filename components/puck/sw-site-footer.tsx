import footer from "../../content/footer.json";
import { safeLinkHref } from "../../lib/safe-link";

/**
 * Sitewide footer, rendered by the root so it is identical on every page.
 * Text and links live in content/footer.json (not in P1 page content), so edit
 * that file and deploy to change it.
 */
export function SwSiteFooter() {
  return (
    <footer className="sw-footer">
      <div className="sw-container sw-footer__inner">
        <span>{footer.text}</span>
        <ul className="sw-footer__links">
          {footer.links.map((l) => {
            const href = safeLinkHref(l.href);
            return href ? (
              <li key={`${l.label}-${href}`}>
                <a href={href}>{l.label}</a>
              </li>
            ) : null;
          })}
        </ul>
      </div>
    </footer>
  );
}
