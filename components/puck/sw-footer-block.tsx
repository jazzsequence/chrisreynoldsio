import { SwSiteFooter } from "./sw-site-footer";

/**
 * Palette block that places the sitewide footer. It has no fields of its own: the text and links
 * come from content/footer.json, so every page that includes it shows the same footer. Add or
 * remove the block per page to control where it appears.
 */
export const swFooterBlock = {
  label: "Footer",
  fields: {},
  render: () => <SwSiteFooter />,
};
