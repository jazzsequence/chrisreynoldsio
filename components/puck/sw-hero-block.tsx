import { anchorField, headingId } from "../../lib/slugify";

export type HeroButton = { label?: string; href?: string; style?: "primary" | "outline" };

export type SwHeroProps = {
  eyebrow?: string;
  title?: string;
  tagline?: string;
  buttons?: HeroButton[];
  anchor?: string;
};

/** Shared by the home hero and the interior hero; `plain` drops the sun, grid and horizon lines. */
export function renderHero({ eyebrow, title, tagline, buttons, anchor }: SwHeroProps, plain = false) {
  const links = (buttons ?? []).filter((b) => b.label && b.href);
  return (
    <header className={plain ? "sw-hero sw-hero--plain" : "sw-hero"}>
      {plain ? null : (
        <>
          <div className="sw-hero__grid" aria-hidden="true" />
          <div className="sw-hero__lines" aria-hidden="true" />
          <div className="sw-hero__sun" aria-hidden="true" />
        </>
      )}
      <div className="sw-container">
        {!plain && eyebrow ? <p className="sw-eyebrow">{eyebrow}</p> : null}
        <h1 id={headingId(anchor, title)} className="sw-display sw-hero__title sw-gradient-text">{title}</h1>
        {tagline ? <p className="sw-hero__tagline">{tagline}</p> : null}
        {links.length ? (
          <div className="sw-hero__actions">
            {links.map((b, i) => (
              <a
                key={`${b.href}-${i}`}
                className={b.style === "outline" ? "sw-btn" : "sw-btn sw-btn--primary"}
                href={b.href}
              >
                {b.label}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </header>
  );
}

/** Field set for the buttons list, shared by both hero variants. */
export const heroButtonsField = {
  type: "array" as const,
  label: "Buttons / links",
  getItemSummary: (item: HeroButton) => item.label || "Button",
  arrayFields: {
    label: { type: "text" as const, label: "Label" },
    href: { type: "text" as const, label: "Link (URL, /path or #anchor)" },
    style: {
      type: "radio" as const,
      label: "Style",
      options: [
        { label: "Primary", value: "primary" },
        { label: "Outline", value: "outline" },
      ],
    },
  },
  defaultItemProps: { label: "Button", href: "/", style: "outline" as const },
};

export const swHeroBlock = {
  label: "Hero",
  fields: {
    eyebrow: { type: "text" as const, label: "Eyebrow" },
    title: { type: "text" as const, label: "Title" },
    tagline: { type: "textarea" as const, label: "Tagline" },
    buttons: heroButtonsField,
    anchor: anchorField,
  },
  defaultProps: {
    anchor: "",
    eyebrow: "Developer advocate / WordPress / tinkerer",
    title: "Chris Reynolds",
    tagline:
      "I help developers ship on the web, break things on purpose, and write about what I learn.",
    buttons: [
      { label: "See the work", href: "#work", style: "primary" as const },
      { label: "Get in touch", href: "#contact", style: "outline" as const },
    ],
  },
  render: (props: SwHeroProps) => renderHero(props),
};
