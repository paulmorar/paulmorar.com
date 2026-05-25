import { describe, it, expect } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { getAllPosts } from "@/lib/posts";
import { site } from "@/lib/site";

describe("sitemap", () => {
  const entries = sitemap();

  it("includes the home, about, and writing index", () => {
    const urls = entries.map((e) => e.url);
    expect(urls).toEqual(
      expect.arrayContaining([
        site.url,
        `${site.url}/about`,
        `${site.url}/writing`,
      ]),
    );
  });

  it("includes an entry per post with absolute urls", () => {
    const postUrls = getAllPosts().map((p) => `${site.url}/writing/${p.slug}`);
    const sitemapUrls = entries.map((e) => e.url);
    for (const url of postUrls) {
      expect(sitemapUrls).toContain(url);
    }
  });

  it("priorities are within [0, 1]", () => {
    for (const e of entries) {
      if (typeof e.priority === "number") {
        expect(e.priority).toBeGreaterThanOrEqual(0);
        expect(e.priority).toBeLessThanOrEqual(1);
      }
    }
  });

  it("home has the highest priority", () => {
    const home = entries.find((e) => e.url === site.url);
    expect(home?.priority).toBe(1.0);
  });
});

describe("robots", () => {
  const r = robots();

  it("allows everything for *", () => {
    const rules = Array.isArray(r.rules) ? r.rules : [r.rules];
    expect(rules[0]).toMatchObject({ userAgent: "*", allow: "/" });
  });

  it("advertises the sitemap and host", () => {
    expect(r.sitemap).toBe(`${site.url}/sitemap.xml`);
    expect(r.host).toBe(site.url);
  });
});
