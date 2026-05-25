import { describe, it, expect } from "vitest";
import { site } from "@/lib/site";

describe("site config", () => {
  it("uses an https canonical url with no trailing slash", () => {
    expect(site.url).toMatch(/^https:\/\//);
    expect(site.url.endsWith("/")).toBe(false);
  });

  it("exposes a non-empty title and description", () => {
    expect(site.title.length).toBeGreaterThan(0);
    expect(site.description.length).toBeGreaterThan(20);
  });

  it("uses a valid email and a BCP-47-ish locale", () => {
    expect(site.email).toMatch(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    expect(site.locale).toMatch(/^[a-z]{2}_[A-Z]{2}$/);
  });

  it("declares social profiles as absolute urls", () => {
    for (const url of [
      site.social.github,
      site.social.linkedin,
      site.social.x,
      site.worksFor.url,
    ]) {
      expect(url).toMatch(/^https?:\/\//);
    }
  });

  it("twitter handle starts with @", () => {
    expect(site.social.xHandle.startsWith("@")).toBe(true);
  });

  it("keywords contain the author name", () => {
    expect(site.keywords).toContain("Paul Morar");
  });
});
