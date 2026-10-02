"use client";
import { type ReactNode, isValidElement } from "react";
import { sanitizeRichtextHtml } from "@pantheon-systems/puck-css/sanitize-richtext";
import { ParagraphEditorText } from "./paragraph-editor-text";
import { swRichtextField } from "./sw-richtext-field";

/**
 * Free-text block for intro copy (or any prose). Same sanitizer as the starter's Paragraph block,
 * but with a toolbar that adds a Link button (the stock one has none), but styled with the synthwave tokens instead of Tailwind `prose`.
 */
export const swTextBlock = {
  label: "Text",
  fields: {
    text: swRichtextField,
  },
  defaultProps: {
    text: "Add your intro text here.",
  },
  render: ({ text, id }: { text?: string | ReactNode; id: string }) => (
    <section className="sw-section sw-section--text">
      <div className="sw-container">
        {isValidElement(text) ? (
          <div className="sw-prose">
            <ParagraphEditorText text={text} id={id} />
          </div>
        ) : (
          <div
            className="sw-prose"
            dangerouslySetInnerHTML={{
              __html: typeof text === "string" ? sanitizeRichtextHtml(text) : "",
            }}
          />
        )}
      </div>
    </section>
  ),
};
