"use client";
import type { ReactNode } from "react";
import { RichTextMenu } from "@puckeditor/core";
import { createRichtextField } from "@pantheon-systems/puck-css/fields";
import { safeLinkHref } from "../../lib/safe-link";

/** The slice of Tiptap's command chain we use; avoids a direct tiptap dependency and `any`. */
type LinkChain = {
  focus: () => LinkChain;
  extendMarkRange: (name: string) => LinkChain;
  unsetLink: () => LinkChain;
  setLink: (attrs: { href: string }) => LinkChain;
  run: () => boolean;
};

type MenuProps = {
  children?: ReactNode;
  // Puck hands us the underlying Tiptap editor; typed loosely to avoid a direct tiptap dependency.
  editor: {
    isActive: (name: string) => boolean;
    getAttributes: (name: string) => { href?: string };
    chain: () => LinkChain;
  } | null;
  readOnly?: boolean;
};

const LinkIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07l-1.5 1.5" />
    <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07l1.5-1.5" />
  </svg>
);

/**
 * The stock puck-css toolbar (bold/italic/underline/lists) plus a Link button. The stock menu has
 * no link control even though Puck's link extension is registered, so links were impossible to add.
 * Clearing the URL in the prompt removes the link.
 */
function SwRichTextMenu({ editor, readOnly }: MenuProps) {
  const active = !!editor?.isActive("link");

  function onLink() {
    if (!editor || readOnly) return;
    const current = editor.getAttributes("link").href ?? "";
    const entered = window.prompt("Link URL (https://…, /page, #anchor, mailto:…). Leave empty to remove.", current);
    if (entered === null) return; // cancelled
    if (entered.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    const href = safeLinkHref(entered);
    if (!href) {
      window.alert("That doesn't look like a valid link. Use https://…, /path, #anchor, mailto: or tel:.");
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href }).run();
  }

  return (
    <RichTextMenu>
      <RichTextMenu.Group>
        <RichTextMenu.Bold />
        <RichTextMenu.Italic />
        <RichTextMenu.Underline />
      </RichTextMenu.Group>
      <RichTextMenu.Group>
        <RichTextMenu.Control icon={LinkIcon} title="Link" active={active} disabled={!editor || readOnly} onClick={onLink} />
      </RichTextMenu.Group>
      <RichTextMenu.Group>
        <RichTextMenu.BulletList />
        <RichTextMenu.OrderedList />
      </RichTextMenu.Group>
    </RichTextMenu>
  );
}

export const swRichtextField = createRichtextField({
  renderMenu: (props: MenuProps) => <SwRichTextMenu {...props} />,
});
