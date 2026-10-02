/**
 * URL-fragment slug for heading ids: lowercase, accents stripped, anything that isn't a letter or
 * digit collapsed to a single hyphen. Returns undefined for empty results so callers can omit the
 * id attribute rather than render `id=""`.
 */
export function slugify(text?: string): string | undefined {
  const slug = (text ?? "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['\u2019]/g, "") // "I've" -> "ive", not "i-ve"
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || undefined;
}

/** Explicit anchor wins; otherwise derive from the heading text. */
export function headingId(anchor?: string, text?: string): string | undefined {
  return slugify(anchor) ?? slugify(text);
}

/** Shared editor field so every heading-bearing block exposes the same override. */
export const anchorField = {
  type: "text" as const,
  label: "Anchor ID (optional; defaults to the heading text)",
};
