import type { Config } from "@puckeditor/core";

import { buttonBlock } from "./components/puck/button-block";
import { dividerBlock } from "./components/puck/divider-block";
import { headingBlock } from "./components/puck/heading-block";
import { imageBlock } from "./components/puck/image-block";
import { gridBlock } from "./components/puck/grid-block";
import { mediaFigureBlock } from "./components/puck/media-figure-block";
import { paragraphBlock } from "./components/puck/paragraph-block";
import { quoteBlock } from "./components/puck/quote-block";
import { puckRoot } from "./components/puck/root";
import { spacerBlock } from "./components/puck/spacer-block";
import { welcomeBlock } from "./components/puck/welcome-block";
import { dataListBlock } from "./components/puck/data-list-block";
import { p1Blocks, p1Categories } from "./components/puck/blocks";
import { swHeroBlock } from "./components/puck/sw-hero-block";
import { swPageHeaderBlock } from "./components/puck/sw-page-header-block";
import { swSectionHeadingBlock } from "./components/puck/sw-section-heading-block";
import { swTextBlock } from "./components/puck/sw-text-block";
import { swBioBlock } from "./components/puck/sw-bio-block";
import { swProjectGridBlock } from "./components/puck/sw-project-grid-block";
import { swContactBlock } from "./components/puck/sw-contact-block";
import { swFooterBlock } from "./components/puck/sw-footer-block";

export const config = {
  categories: {
    ...p1Categories,
    synthwave: {
      title: "Synthwave",
      components: [
        "SwHero",
        "SwPageHeader",
        "SwSectionHeading",
        "SwText",
        "SwBio",
        "SwProjectGrid",
        "SwContact",
        "SwFooter",
      ],
      defaultExpanded: true,
    },
    typography: {
      title: "Typography",
      components: ["HeadingBlock", "ParagraphBlock", "QuoteBlock"],
    },
    media: {
      title: "Media",
      components: ["ImageBlock", "MediaFigureBlock"],
    },
    data: {
      title: "Data",
      components: ["GridBlock", "DataListBlock"],
    },
    layout: {
      title: "Layout",
      components: ["DividerBlock", "SpacerBlock"],
    },
    actions: {
      title: "Actions",
      components: ["ButtonBlock"],
    },
    pages: {
      title: "Page Sections",
      components: ["P1WelcomeBlock"],
    },
  },
  root: puckRoot,
  components: {
    ...p1Blocks,
    SwHero: swHeroBlock,
    SwPageHeader: swPageHeaderBlock,
    SwSectionHeading: swSectionHeadingBlock,
    SwText: swTextBlock,
    SwBio: swBioBlock,
    SwProjectGrid: swProjectGridBlock,
    SwContact: swContactBlock,
    SwFooter: swFooterBlock,
    HeadingBlock: headingBlock,
    ParagraphBlock: paragraphBlock,
    ImageBlock: imageBlock,
    MediaFigureBlock: mediaFigureBlock,
    GridBlock: gridBlock,
    QuoteBlock: quoteBlock,
    DividerBlock: dividerBlock,
    SpacerBlock: spacerBlock,
    ButtonBlock: buttonBlock,
    DataListBlock: dataListBlock,
    P1WelcomeBlock: welcomeBlock,
  },
} as Config;

export default config;
