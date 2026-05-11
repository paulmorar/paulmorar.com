import { describe, it, expect } from "vitest";
import { getAllPosts, getPost, getAllSlugs, formatDate } from "@/lib/posts";

describe("posts library", () => {
  it("loads the seed posts from disk", () => {
    const posts = getAllPosts();
    expect(posts.length).toBeGreaterThanOrEqual(1);
  });

  it("sorts posts newest first", () => {
    const posts = getAllPosts();
    for (let i = 1; i < posts.length; i++) {
      expect(+new Date(posts[i - 1].date)).toBeGreaterThanOrEqual(
        +new Date(posts[i].date),
      );
    }
  });

  it("exposes slug, year, and reading time", () => {
    const [first] = getAllPosts();
    expect(first.slug).toMatch(/^[a-z0-9-]+$/);
    expect(first.year).toBe(new Date(first.date).getFullYear());
    expect(first.readingMinutes).toBeGreaterThan(0);
  });

  it("getAllSlugs returns one slug per post", () => {
    const slugs = getAllSlugs();
    expect(slugs).toEqual(getAllPosts().map((p) => p.slug));
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("getPost returns the post for a known slug", () => {
    const slug = getAllSlugs()[0];
    const post = getPost(slug);
    expect(post?.slug).toBe(slug);
    expect(post?.content.length).toBeGreaterThan(0);
  });

  it("getPost returns null for an unknown slug", () => {
    expect(getPost("does-not-exist-anywhere")).toBeNull();
  });

  it("frontmatter contains title and summary", () => {
    for (const p of getAllPosts()) {
      expect(p.title).toBeTruthy();
      expect(p.summary).toBeTruthy();
      expect(p.date).toBeTruthy();
    }
  });
});

describe("formatDate", () => {
  it("formats ISO dates as 'D MMM YYYY'", () => {
    expect(formatDate("2026-04-22")).toMatch(/22 Apr 2026/);
  });

  it("handles single-digit days", () => {
    expect(formatDate("2026-02-08")).toMatch(/8 Feb 2026/);
  });
});
