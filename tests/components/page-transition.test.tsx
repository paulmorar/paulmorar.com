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

  it("plays the sweep when the pathname changes and resets when it ends", () => {
    const { container, rerender } = render(<PageTransition />);
    const overlay = container.firstChild as HTMLElement;

    pathRef.current = "/about";
    rerender(<PageTransition />);
    expect(overlay.className).toMatch(/playing/);

    // The animationend listener lives on the trailing panel (native
    // addEventListener via ref). Firing it should drop the playing class.
    const trail = overlay.children[1] as HTMLElement;
    expect(trail.dataset.trail).toBe("true");
    act(() => {
      trail.dispatchEvent(new Event("animationend"));
    });
    expect(overlay.className).not.toMatch(/playing/);
  });

  it("re-plays on subsequent pathname changes", () => {
    const { container, rerender } = render(<PageTransition />);
    const overlay = container.firstChild as HTMLElement;
    const trail = overlay.children[1] as HTMLElement;

    pathRef.current = "/about";
    rerender(<PageTransition />);
    act(() => trail.dispatchEvent(new Event("animationend")));
    expect(overlay.className).not.toMatch(/playing/);

    pathRef.current = "/writing";
    rerender(<PageTransition />);
    expect(overlay.className).toMatch(/playing/);
  });
});
