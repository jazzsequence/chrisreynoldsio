/**
 * Retired: the footer is now sitewide (SwSiteFooter in the root, content/footer.json).
 * Kept registered, but hidden from the block palette, so SwFooter blocks already saved in page
 * content render nothing instead of doubling up. Delete it once those blocks are removed in /p1.
 */
export const swFooterBlock = {
  label: "Footer (retired)",
  fields: {},
  render: () => null,
};
