/**
 * Normalises a URL typed into the rich-text Link button. Returns undefined for anything that isn't
 * an http(s)/mailto/tel URL, a /path, or a #anchor. This is a UX guard; the render path also runs
 * the HTML through the P1 sanitizer, which strips script URLs regardless.
 */
export function safeLinkHref(input?: string | null): string | undefined {
  const value = (input ?? "").trim();
  if (!value) return undefined;
  if (/^(\/(?!\/)|#)/.test(value)) return value; // /path or #anchor (not protocol-relative //host)
  if (/^(https?:|mailto:|tel:)/i.test(value)) return value;
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return undefined; // any other scheme (javascript:, data:, ...)
  if (/^[^\s/]+\.[^\s/]+/.test(value)) return `https://${value}`; // "example.com/x" -> https://
  return undefined;
}
