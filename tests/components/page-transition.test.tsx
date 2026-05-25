import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, act } from "@testing-library/react";

// Provide a controllable usePathname for this file only. vi.mock is hoisted,
// so the pathname state lives in a hoisted ref shared with the factory.
const pathRef = vi.hoisted(() => ({ current: "/" }));

vi.mock("next/navigation", () => ({
  usePathname: () => pathRef.current,
}));

import { PageTransition } from "@/components/page-transition";

beforeEach(() => {
  pathRef.current = "/";
});

describe("PageTransition", () => {
  it("does not play on the initial render", () => {
    const { container } = render(<PageTransition />);
    const overlay = container.firstChild as HTMLElement;
    expect(overlay).not.toBeNull();
    expect(overlay.className).not.toMatch(/playing/);
    expect(overlay).toHaveAttribute("aria-hidden", "true");
  });

  it("renders two panels with a marked trailing one", () => {
    const { container } = render(<PageTransition />);
    const overlay = container.firstChild as HTMLElement;
    const panels = overlay.children;
    expect(panels).toHaveLength(2);
    expect(panels[0].getAttribute("data-trail")).toBeNull();
    expect(panels[1].getAttribute("data-trail")).toBe("true");
  });

  it("plays the sweep on route change and resets when the trailing panel ends", () => {
    const { container, rerender } = render(<PageTransition />);
    const overlay = container.firstChild as HTMLElement;

    pathRef.current = "/about";
    rerender(<PageTransition />);
    expect(overlay.className).toMatch(/playing/);

    // Dispatch a real bubbling animationend event; React 19 delegates these
    // at the root, so bubbling is required for the handler to run.
    const [lead, trail] = overlay.children as HTMLCollectionOf<HTMLElement>;
    act(() => {
      lead.dispatchEvent(new Event("animationend", { bubbles: true }));
    });
    expect(overlay.className).toMatch(/playing/);

    act(() => {
      trail.dispatchEvent(new Event("animationend", { bubbles: true }));
    });
    expect(overlay.className).not.toMatch(/playing/);
  });
});
