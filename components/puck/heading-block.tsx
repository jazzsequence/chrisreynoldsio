import { anchorField, headingId } from "../../lib/slugify";
import { blockPaddingClass } from "./block-padding";

const levelClass: Record<"h1" | "h2" | "h3" | "h4", string> = {
  h1: "text-4xl",
  h2: "text-3xl",
  h3: "text-2xl",
  h4: "text-xl",
};

export const headingBlock = {
  label: "Heading",
  fields: {
    title: { type: "text" as const, label: "Text" },
    level: {
      type: "select" as const,
      label: "Level",
      options: [
        { label: "H1", value: "h1" },
        { label: "H2", value: "h2" },
        { label: "H3", value: "h3" },
        { label: "H4", value: "h4" },
      ],
    },
    anchor: anchorField,
  },
  defaultProps: {
    title: "Heading",
    level: "h1" as const,
    anchor: "",
  },
  render: ({ title, level, anchor }: { title?: string; level?: string; anchor?: string }) => {
    const L = (level ?? "h1") as "h1" | "h2" | "h3" | "h4";
    const size = levelClass[L] ?? levelClass.h1;
    return (
      <div className={blockPaddingClass}>
        <L id={headingId(anchor, title)} className={`m-0 font-bold leading-tight ${size}`}>{title}</L>
      </div>
    );
  },
};
