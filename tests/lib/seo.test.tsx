import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import {
  JsonLd,
  absUrl,
  pageMetadata,
  personSchema,
  websiteSchema,
  blogPostingSchema,
  blogSchema,
  breadcrumbSchema,
  profilePageSchema,
} from "@/lib/seo";
import { site } from "@/lib/site";

describe("absUrl", () => {
  it("returns bare site url for empty/root paths", () => {
    expect(absUrl()).toBe(site.url);
    expect(absUrl("/")).toBe(site.url);
  });

  it("joins paths with a single slash", () => {
    expect(absUrl("/about")).toBe(`${site.url}/about`);
    expect(absUrl("writing")).toBe(`${site.url}/writing`);
  });
});

describe("JsonLd", () => {
  it("renders a JSON-LD <script> tag with the stringified payload", () => {
    const { container } = render(<JsonLd data={{ hello: "world" }} />);
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    expect(script?.innerHTML).toBe('{"hello":"world"}');
  });
});

describe("pageMetadata", () => {
  it("builds a canonical url and mirrors title/description into OG and twitter", () => {
    const meta = pageMetadata({
      path: "/writing",
      title: "Writing",
      description: "Essays.",
    });
    expect(meta.alternates?.canonical).toBe(`${site.url}/writing`);
    expect(meta.openGraph?.title).toBe("Writing");
    expect(meta.openGraph?.url).toBe(`${site.url}/writing`);
    expect(meta.openGraph?.type).toBe("website");
    const twitter = meta.twitter as { card: string; title: string };
    expect(twitter.card).toBe("summary_large_image");
    expect(twitter.title).toBe("Writing");
  });

  it("honours custom openGraph overrides", () => {
    const meta = pageMetadata({
      title: "Post",
      description: "Body.",
      openGraph: { title: "OG Post", type: "article" },
    });
    expect(meta.openGraph?.title).toBe("OG Post");
    expect(meta.openGraph?.type).toBe("article");
  });
});

describe("schema builders", () => {
  it("personSchema and websiteSchema reference each other by @id", () => {
    expect(personSchema["@id"]).toBe(`${site.url}/#person`);
    expect(websiteSchema.publisher["@id"]).toBe(personSchema["@id"]);
  });

  it("blogPostingSchema renders post-specific fields", () => {
    const schema = blogPostingSchema({
      slug: "my-post",
      title: "My Post",
      summary: "About things.",
      date: "2026-04-22",
      readingMinutes: 7,
      tags: ["platform", "observability"],
    });
    expect(schema["@type"]).toBe("BlogPosting");
    expect(schema.url).toBe(`${site.url}/writing/my-post`);
    expect(schema.timeRequired).toBe("PT7M");
    expect(schema.keywords).toBe("platform, observability");
  });

  it("breadcrumbSchema positions items 1..n", () => {
    const schema = breadcrumbSchema([
      { name: "Home", url: site.url },
      { name: "Writing", url: `${site.url}/writing` },
    ]);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[1].position).toBe(2);
    expect(schema.itemListElement[1].name).toBe("Writing");
  });

  it("profilePageSchema points at /about", () => {
    expect(profilePageSchema.url).toBe(`${site.url}/about`);
    expect(profilePageSchema.about["@id"]).toBe(personSchema["@id"]);
  });

  it("blogSchema lists each post as BlogPosting", () => {
    const schema = blogSchema([
      { slug: "a", title: "A", summary: "a.", date: "2026-01-01" },
      { slug: "b", title: "B", summary: "b.", date: "2026-02-02" },
    ]);
    expect(schema.blogPost).toHaveLength(2);
    expect(schema.blogPost[0]["@id"]).toBe(`${site.url}/writing/a#article`);
    expect(schema.blogPost[1].url).toBe(`${site.url}/writing/b`);
  });
});
