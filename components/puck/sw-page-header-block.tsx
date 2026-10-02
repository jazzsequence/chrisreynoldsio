import { anchorField } from "../../lib/slugify";
import { heroButtonsField, renderHero, type SwHeroProps } from "./sw-hero-block";

/**
 * Interior-page hero: the home hero (same markup via renderHero) minus the sun, grid and horizon
 * lines, and with no eyebrow field at all, so nothing echoes the first content block below it.
 */
export const swPageHeaderBlock = {
  label: "Hero (interior)",
  fields: {
    title: { type: "text" as const, label: "Title" },
    tagline: { type: "textarea" as const, label: "Tagline" },
    buttons: heroButtonsField,
    anchor: anchorField,
  },
  defaultProps: {
    anchor: "",
    title: "Page title",
    tagline: "A line that says what this page is for.",
    buttons: [
      { label: "Get in touch", href: "/#contact", style: "primary" as const },
      { label: "See the work", href: "/#work", style: "outline" as const },
    ],
  },
  render: ({ title, tagline, buttons, anchor }: SwHeroProps) =>
    renderHero({ title, tagline, buttons, anchor }, true),
};
