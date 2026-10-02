import { describe, expect, it } from "vitest";
import { headingId, slugify } from "../lib/slugify";

describe("slugify", () => {
  it("lowercases and hyphenates", () => {
    expect(slugify("Things I\u2019ve Built")).toBe("things-ive-built");
    expect(slugify("Community + Code")).toBe("community-code");
  });
  it("strips accents and edge punctuation", () => {
    expect(slugify("  Caf\u00e9 \u2014 Menu!  ")).toBe("cafe-menu");
  });
  it("returns undefined when nothing usable remains", () => {
    expect(slugify("")).toBeUndefined();
    expect(slugify("!!!")).toBeUndefined();
    expect(slugify(undefined)).toBeUndefined();
  });
});

describe("headingId", () => {
  it("prefers an explicit anchor", () => {
    expect(headingId("work", "Things I've built")).toBe("work");
  });
  it("falls back to the heading text when the anchor is blank or unusable", () => {
    expect(headingId("", "Who I am")).toBe("who-i-am");
    expect(headingId("  ", "Who I am")).toBe("who-i-am");
    expect(headingId("###", "Who I am")).toBe("who-i-am");
  });
  it("normalises the anchor the editor typed", () => {
    expect(headingId("My Work", "x")).toBe("my-work");
  });
});
