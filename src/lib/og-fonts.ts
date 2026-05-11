// Helpers for loading webfonts into next/og ImageResponse.
// Reads .woff files from @fontsource packages so we don't depend on remote
// font servers at request time.

import { readFile } from "node:fs/promises";
import path from "node:path";

function fontFile(pkg: string, file: string) {
  return path.join(process.cwd(), "node_modules", pkg, "files", file);
}

async function load(pkg: string, file: string): Promise<ArrayBuffer> {
  const buf = await readFile(fontFile(pkg, file));
  return buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength,
  ) as ArrayBuffer;
}

export async function ogFonts() {
  const [caveat, dmSans, dmSansBold] = await Promise.all([
    load("@fontsource/caveat", "caveat-latin-700-normal.woff"),
    load("@fontsource/dm-sans", "dm-sans-latin-400-normal.woff"),
    load("@fontsource/dm-sans", "dm-sans-latin-700-normal.woff"),
  ]);
  return [
    {
      name: "Caveat",
      data: caveat,
      style: "normal" as const,
      weight: 700 as const,
    },
    {
      name: "DM Sans",
      data: dmSans,
      style: "normal" as const,
      weight: 400 as const,
    },
    {
      name: "DM Sans",
      data: dmSansBold,
      style: "normal" as const,
      weight: 700 as const,
    },
  ];
}
