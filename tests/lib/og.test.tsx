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

const mockFont = {
  name: "Caveat" as const,
  data: new ArrayBuffer(8),
  style: "normal" as const,
  weight: 700 as const,
};

vi.mock("@/lib/og-fonts", () => ({
  ogFonts: vi.fn(async () => [mockFont]),
}));

beforeEach(() => {
  imageResponseMock.mockClear();
});

describe("og card", () => {
  it("renders at 1200x630 and forwards fonts from ogFonts()", async () => {
    const { renderOgCard, OG_SIZE, OG_CONTENT_TYPE } = await import("@/lib/og");
    expect(OG_SIZE).toEqual({ width: 1200, height: 630 });
    expect(OG_CONTENT_TYPE).toBe("image/png");

    await renderOgCard({
      eyebrow: "Writing",
      headline: "Hello",
      footer: "paulmorar.com",
    });

    expect(imageResponseMock).toHaveBeenCalledTimes(1);
    const [, opts] = imageResponseMock.mock.calls[0] as [
      unknown,
      { width: number; height: number; fonts: (typeof mockFont)[] },
    ];
    expect(opts.width).toBe(1200);
    expect(opts.height).toBe(630);
    expect(opts.fonts).toEqual([mockFont]);
  });

  it("accepts an eyebrow with a status dot without throwing", async () => {
    const { renderOgCard } = await import("@/lib/og");
    await renderOgCard({
      eyebrow: { text: "Available", dot: true },
      headline: "Hi",
      footer: "paulmorar.com",
    });
    expect(imageResponseMock).toHaveBeenCalledTimes(1);
  });
});

describe("og mark", () => {
  it("renders a square image at the requested size", async () => {
    const { renderOgMark } = await import("@/lib/og");
    await renderOgMark({ size: 512, fontSize: 360, paddingBottom: 32 });
    const [, opts] = imageResponseMock.mock.calls[0] as [
      unknown,
      { width: number; height: number },
    ];
    expect(opts.width).toBe(512);
    expect(opts.height).toBe(512);
  });

  it("forwards borderRadius into the rendered node when given", async () => {
    const { renderOgMark } = await import("@/lib/og");
    await renderOgMark({
      size: 180,
      fontSize: 130,
      paddingBottom: 10,
      borderRadius: 40,
    });
    const [node] = imageResponseMock.mock.calls[0] as [
      { props: { style: Record<string, unknown> } },
    ];
    expect(node.props.style.borderRadius).toBe(40);
  });
});
