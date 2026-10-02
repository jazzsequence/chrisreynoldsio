import { anchorField, headingId } from "../../lib/slugify";

export type SwSectionHeadingProps = {
  eyebrow?: string;
  heading?: string;
  anchor?: string;
};

/**
 * Standalone section title. Content blocks (Project grid, Bio, Contact form) deliberately carry no
 * heading of their own: put this above them, then optionally a Text block for intro copy.
 * Set the Anchor ID to a stable name (e.g. "work") when something links to it.
 */
export const swSectionHeadingBlock = {
  label: "Section heading",
  fields: {
    eyebrow: { type: "text" as const, label: "Eyebrow (optional)" },
    heading: { type: "text" as const, label: "Heading" },
    anchor: anchorField,
  },
  defaultProps: {
    eyebrow: "",
    heading: "Section heading",
    anchor: "",
  },
  render: ({ eyebrow, heading, anchor }: SwSectionHeadingProps) => (
    <section className="sw-section sw-section--heading">
      <div className="sw-container">
        {eyebrow ? <p className="sw-eyebrow">{eyebrow}</p> : null}
        <h2 className="sw-h2" id={headingId(anchor, heading)}>
          {heading}
        </h2>
      </div>
    </section>
  ),
};
