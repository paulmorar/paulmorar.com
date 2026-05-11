import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";
import { getAllPosts } from "@/lib/posts";

describe("Home page", () => {
  it("renders the name and tagline", () => {
    render(<HomePage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /paul morar/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/builder of/i)).toBeInTheDocument();
  });

  it("links to About, Writing, and email", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: /^writing/i })).toHaveAttribute(
      "href",
      "/writing",
    );
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/^mailto:/),
    );
  });

  it("shows the latest writing teaser", () => {
    const latest = getAllPosts()[0];
    render(<HomePage />);
    expect(screen.getByText(/latest writing/i)).toBeInTheDocument();
    const link = screen.getByRole("link", {
      name: new RegExp(latest.title, "i"),
    });
    expect(link).toHaveAttribute("href", `/writing/${latest.slug}`);
  });

  it("renders social and RSS footer links", () => {
    render(<HomePage />);
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute(
      "href",
      expect.stringContaining("github.com"),
    );
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      expect.stringContaining("linkedin.com"),
    );
    expect(screen.getByRole("link", { name: /^x$/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /rss/i })).toHaveAttribute(
      "href",
      "/writing/rss.xml",
    );
  });
});
