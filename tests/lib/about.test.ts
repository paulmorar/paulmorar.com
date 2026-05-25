import { describe, it, expect } from "vitest";
import { about } from "@/lib/about";

describe("about content", () => {
  it("has a three-part tagline", () => {
    expect(about.tagline.lead).toMatch(/\S/);
    expect(about.tagline.accent).toMatch(/\S/);
    expect(about.tagline.tail).toMatch(/\S/);
  });

  it("homeIntro and intro paragraphs are non-empty", () => {
    expect(about.homeIntro.length).toBeGreaterThan(40);
    expect(about.intro.length).toBeGreaterThan(0);
    for (const para of about.intro) {
      expect(para.length).toBeGreaterThan(40);
    }
  });

  it("work history is ordered newest first", () => {
    const starts = about.work.map((job) => Number(job.start));
    for (let i = 1; i < starts.length; i++) {
      expect(starts[i - 1]).toBeGreaterThanOrEqual(starts[i]);
    }
  });

  it("every job has a company, title, and https href", () => {
    for (const job of about.work) {
      expect(job.company).toMatch(/\S/);
      expect(job.title).toMatch(/\S/);
      expect(job.description).toMatch(/\S/);
      expect(job.href).toMatch(/^https?:\/\//);
    }
  });

  it("each job spans a sane year range", () => {
    const thisYear = new Date().getFullYear();
    for (const job of about.work) {
      const start = Number(job.start);
      expect(start).toBeGreaterThanOrEqual(2000);
      expect(start).toBeLessThanOrEqual(thisYear);
      if (job.end !== "Now") {
        const end = Number(job.end);
        expect(end).toBeGreaterThanOrEqual(start);
      }
    }
  });
});
