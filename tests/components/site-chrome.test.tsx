import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

describe("SiteHeader", () => {
  it("renders brand and nav links", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: /paul morar/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "href",
      "/about",
    );
    expect(screen.getByRole("link", { name: /writing/i })).toHaveAttribute(
      "href",
      "/writing",
    );
  });

  it("marks the active link", () => {
    render(<SiteHeader active="writing" />);
    expect(screen.getByRole("link", { name: /writing/i })).toHaveAttribute(
      "data-active",
      "true",
    );
    expect(screen.getByRole("link", { name: /about/i })).toHaveAttribute(
      "data-active",
      "false",
    );
  });
});

describe("SiteFooter", () => {
  it("renders social and RSS links", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /rss/i })).toHaveAttribute(
      "href",
      "/writing/rss.xml",
    );
  });

  it("includes the current year", () => {
    render(<SiteFooter />);
    expect(
      screen.getByText(new RegExp(String(new Date().getFullYear()))),
    ).toBeInTheDocument();
  });
});
