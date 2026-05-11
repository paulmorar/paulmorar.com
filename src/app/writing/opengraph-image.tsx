import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Writing — Paul Morar";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return renderOgCard({
    eyebrow: "Paul Morar",
    headline: "Writing",
    subline:
      "Notes on engineering, platforms, observability — and whatever else I’ve been chewing on lately.",
    footer: "paulmorar.com/writing",
  });
}
