type FooterLink = { label?: string; href?: string };

export type SwFooterProps = { text?: string; links?: FooterLink[] };

export const swFooterBlock = {
  label: "Footer",
  fields: {
    text: { type: "text" as const, label: "Text" },
    links: {
      type: "array" as const,
      label: "Links",
      getItemSummary: (item: FooterLink) => item.label || "Link",
      arrayFields: {
        label: { type: "text" as const, label: "Label" },
        href: { type: "text" as const, label: "URL" },
      },
      defaultItemProps: { label: "Link", href: "https://" },
    },
  },
  defaultProps: {
    text: "© Chris Reynolds. Built with P1 on Pantheon.",
    links: [
      { label: "GitHub", href: "https://github.com/jazzsequence" },
      { label: "Profile", href: "https://jazzsequence.github.io" },
      { label: "Podcast", href: "https://communitycode.dev" },
    ],
  },
  render: ({ text, links }: SwFooterProps) => (
    <footer className="sw-footer">
      <div className="sw-container sw-footer__inner">
        <span>{text}</span>
        <ul className="sw-footer__links">
          {(links ?? []).map((l, i) => (
            <li key={`${l.href}-${i}`}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  ),
};
