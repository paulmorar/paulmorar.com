import { describe, it, expect, vi, beforeEach } from "vitest";

const readFileMock = vi.hoisted(() => vi.fn());

vi.mock("node:fs/promises", () => ({
  default: { readFile: readFileMock },
  readFile: readFileMock,
}));

beforeEach(() => {
  readFileMock.mockReset();
  // Return a tiny unique buffer per call so we can assert wiring.
  let counter = 0;
  readFileMock.mockImplementation(async () => {
    counter += 1;
    return Buffer.from([counter]);
  });
});

describe("ogFonts", () => {
  it("loads Caveat 700, DM Sans 400, and DM Sans 700 from @fontsource", async () => {
    const { ogFonts } = await import("@/lib/og-fonts");
    const fonts = await ogFonts();

    expect(fonts).toHaveLength(3);
    expect(fonts[0]).toMatchObject({ name: "Caveat", weight: 700 });
    expect(fonts[1]).toMatchObject({ name: "DM Sans", weight: 400 });
    expect(fonts[2]).toMatchObject({ name: "DM Sans", weight: 700 });
    for (const font of fonts) {
      expect(font.style).toBe("normal");
      // ArrayBuffer can cross realms (Node/jsdom) so duck-type via byteLength.
      expect(typeof (font.data as ArrayBuffer).byteLength).toBe("number");
      expect((font.data as ArrayBuffer).byteLength).toBeGreaterThan(0);
    }
  });

  it("reads the woff files from the expected @fontsource paths", async () => {
    const { ogFonts } = await import("@/lib/og-fonts");
    await ogFonts();
    const paths = readFileMock.mock.calls.map((c) => String(c[0]));
    expect(paths.some((p) => p.includes("@fontsource/caveat"))).toBe(true);
    expect(paths.some((p) => p.includes("@fontsource/dm-sans"))).toBe(true);
    expect(paths.every((p) => p.endsWith(".woff"))).toBe(true);
  });
});
