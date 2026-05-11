import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import WritingIndexPage from "@/app/writing/page";
import { getAllPosts } from "@/lib/posts";

describe("Writing index", () => {
  it("renders the page title and lede", () => {
    render(<WritingIndexPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /writing/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/notes on engineering/i)).toBeInTheDocument();
  });

  it("renders a link per post", () => {
    render(<WritingIndexPage />);
    for (const post of getAllPosts()) {
      const link = screen.getByRole("link", {
        name: new RegExp(post.title, "i"),
      });
      expect(link).toHaveAttribute("href", `/writing/${post.slug}`);
    }
  });

  it("renders each post summary and reading time", () => {
    render(<WritingIndexPage />);
    for (const post of getAllPosts()) {
      expect(
        screen.getByText(new RegExp(post.summary.slice(0, 30))),
      ).toBeInTheDocument();
    }
    expect(screen.getAllByText(/min read/i).length).toBe(getAllPosts().length);
  });

  it("groups posts by year", () => {
    const years = new Set(getAllPosts().map((p) => String(p.year)));
    render(<WritingIndexPage />);
    for (const year of years) {
      expect(screen.getByText(year)).toBeInTheDocument();
    }
  });
});
