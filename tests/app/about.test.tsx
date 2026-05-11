import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AboutPage from "@/app/about/page";
import { about } from "@/lib/about";

describe("About page", () => {
  it("renders the page title and intro paragraphs", () => {
    render(<AboutPage />);
    expect(
      screen.getByRole("heading", { level: 1, name: /about/i }),
    ).toBeInTheDocument();
    for (const paragraph of about.intro) {
      // Match a short substring to avoid quote/whitespace mismatches
      expect(
        screen.getByText(new RegExp(paragraph.slice(0, 40))),
      ).toBeInTheDocument();
    }
  });

  it("renders the tools blurb", () => {
    render(<AboutPage />);
    expect(
      screen.getByText(new RegExp(about.tools.slice(0, 30))),
    ).toBeInTheDocument();
  });

  it("renders every job in the timeline", () => {
    render(<AboutPage />);
    for (const job of about.work) {
      expect(
        screen.getByRole("heading", { level: 3, name: job.title }),
      ).toBeInTheDocument();
    }
  });

  it("links each company to its homepage", () => {
    render(<AboutPage />);
    const companies = new Set(about.work.map((j) => j.company));
    for (const company of companies) {
      const links = screen.getAllByRole("link", { name: company });
      expect(links.length).toBeGreaterThan(0);
      const job = about.work.find((j) => j.company === company)!;
      expect(links[0]).toHaveAttribute("href", job.href);
    }
  });

  it("renders the site header with About active", () => {
    render(<AboutPage />);
    const aboutLink = screen.getByRole("link", { name: /^about$/i });
    expect(aboutLink).toHaveAttribute("data-active", "true");
  });
});
