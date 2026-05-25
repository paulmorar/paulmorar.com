import { describe, it, expect, vi, beforeEach } from "vitest";

const imageResponseMock = vi.hoisted(() => vi.fn());

vi.mock("next/og", () => {
  class ImageResponse {
    node: unknown;
    opts: unknown;
    constructor(node: unknown, opts: unknown) {
      this.node = node;
      this.opts = opts;
      imageResponseMock(node, opts);
    }
  }
  return { ImageResponse };
});

vi.mock("@/lib/og-fonts", () => ({
  ogFonts: vi.fn(async () => [
    { name: "Caveat", data: new ArrayBuffer(1), style: "normal", weight: 700 },
  ]),
}));

beforeEach(() => {
  imageResponseMock.mockClear();
});

describe("og card", () => {
  it("renders at 1200x630 with brand fonts and the supplied headline", async () => {
    const { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } = await import("@/lib/og");
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 });
    expect(OG_CONTENT_TYPE).toBe("image/png");

    await renderOgCard({
      eyebrow: "Writing",
      headline: "Hello",
      footer: "paulmorar.com",
    });

    expect(imageResponseMock).toHaveBeenCalledTimes(1);
    const [, opts] = imageResponseMock.mock.calls[0];
    expect(opts).toMatchObject({ width: 1200, height: 630 });
    expect(Array.isArray((opts as { fonts: unknown[] }).fonts)).toBe(true);
  });

  it("supports an eyebrow with a status dot", async () => {
    const { renderOgCard } = await import("@/lib/og");
    await renderOgCard({
      eyebrow: { text: "Available", dot: true },
      headline: "Hi",
      footer: "paulmorar.com",
    });
    expect(imageResponseMock).toHaveBeenCalled();
  });
});

describe("og mark", () => {
  it("renders a square image at the requested size", async () => {
    const { renderOgMark } = await import("@/lib/og");
    await renderOgMark({ size: 512, fontSize: 360, paddingBottom: 32 });
    const [, opts] = imageResponseMock.mock.calls[0];
    expect(opts).toMatchObject({ width: 512, height: 512 });
  });
});
