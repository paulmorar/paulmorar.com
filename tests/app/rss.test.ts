import { describe, it, expect } from "vitest";
import { GET } from "@/app/writing/rss.xml/route";
import { getAllPosts } from "@/lib/posts";

describe("RSS feed", () => {
  it("responds with application/rss+xml", async () => {
    const res = await GET();
    expect(res.headers.get("Content-Type")).toMatch(/application\/rss\+xml/);
  });

  it("includes one <item> per post", async () => {
    const res = await GET();
    const body = await res.text();
    const items = body.match(/<item>/g) ?? [];
    expect(items.length).toBe(getAllPosts().length);
  });

  it("includes each post title and link", async () => {
    const body = await (await GET()).text();
    for (const post of getAllPosts()) {
      expect(body).toContain(post.slug);
      expect(body).toContain(post.title);
    }
  });

  it("is well-formed XML (declaration + closed channel)", async () => {
    const body = await (await GET()).text();
    expect(body.startsWith("<?xml")).toBe(true);
    expect(body).toContain("</channel>");
    expect(body).toContain("</rss>");
  });

  it("escapes XML-unsafe characters", async () => {
    const body = await (await GET()).text();
    // No raw ampersands outside of entity references
    const stripped = body.replace(/&(amp|lt|gt|apos|quot);/g, "");
    expect(stripped).not.toMatch(/&[^;\s]+/);
  });
});
