import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PostPage, {
  generateMetadata,
  generateStaticParams,
} from "@/app/writing/[slug]/page";
import { getAllPosts } from "@/lib/posts";

async function renderPost(slug: string) {
  const ui = await PostPage({ params: Promise.resolve({ slug }) });
  return render(ui);
}

describe("Post page", () => {
  it("generateStaticParams returns one entry per post", () => {
    expect(generateStaticParams()).toEqual(
      getAllPosts().map((p) => ({ slug: p.slug })),
    );
  });

  it("generateMetadata returns title and description for a known post", async () => {
    const [post] = getAllPosts();
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: post.slug }),
    });
    expect(meta.title).toBe(post.title);
    expect(meta.description).toBe(post.summary);
  });

  it("generateMetadata returns empty object for an unknown post", async () => {
    const meta = await generateMetadata({
      params: Promise.resolve({ slug: "nope" }),
    });
    expect(meta).toEqual({});
  });

  it("renders the title, summary and reading time", async () => {
    const [post] = getAllPosts();
    await renderPost(post.slug);
    expect(
      screen.getByRole("heading", { level: 1, name: post.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(post.summary)).toBeInTheDocument();
    expect(screen.getByText(/min read/i)).toBeInTheDocument();
  });

  it("renders prev/next navigation between posts", async () => {
    const posts = getAllPosts();
    if (posts.length < 2) {
      // Only one seed post — assert the rendered nav reflects that rather
      // than silently skipping.
      await renderPost(posts[0].slug);
      const nav = screen.getByRole("navigation", { name: /more posts/i });
      expect(nav).toBeInTheDocument();
      return;
    }
    await renderPost(posts[0].slug);
    // Newest post: its "prev" is the next-older post; no "next".
    expect(screen.getByRole("link", { name: posts[1].title })).toHaveAttribute(
      "href",
      `/writing/${posts[1].slug}`,
    );
  });

  it("calls notFound for an unknown slug", async () => {
    await expect(
      PostPage({ params: Promise.resolve({ slug: "definitely-not-here" }) }),
    ).rejects.toThrow(/NEXT_NOT_FOUND/);
  });
});
