import { describe, expect, it } from "vitest";
import { safeLinkHref } from "../lib/safe-link";

describe("safeLinkHref", () => {
  it("accepts absolute, relative, anchor, mailto and tel", () => {
    expect(safeLinkHref("https://example.com/a?b=1")).toBe("https://example.com/a?b=1");
    expect(safeLinkHref("/about")).toBe("/about");
    expect(safeLinkHref("#work")).toBe("#work");
    expect(safeLinkHref("mailto:me@example.com")).toBe("mailto:me@example.com");
    expect(safeLinkHref("tel:+15551234567")).toBe("tel:+15551234567");
  });
  it("adds https:// to bare domains", () => {
    expect(safeLinkHref("example.com/path")).toBe("https://example.com/path");
  });
  it("rejects script/data schemes and protocol-relative URLs", () => {
    expect(safeLinkHref("javascript:alert(1)")).toBeUndefined();
    expect(safeLinkHref("JaVaScRiPt:alert(1)")).toBeUndefined();
    expect(safeLinkHref("data:text/html,<script>")).toBeUndefined();
    expect(safeLinkHref("//evil.example")).toBeUndefined();
  });
  it("rejects empty and unusable input", () => {
    expect(safeLinkHref("")).toBeUndefined();
    expect(safeLinkHref("   ")).toBeUndefined();
    expect(safeLinkHref("not a url")).toBeUndefined();
    expect(safeLinkHref(null)).toBeUndefined();
  });
});
