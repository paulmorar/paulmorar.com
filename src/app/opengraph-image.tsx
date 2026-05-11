import { about } from "@/lib/about";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Paul Morar — Engineer, builder, writer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG() {
  return renderOgCard({
    eyebrow: { text: "Available · Copenhagen", dot: true },
    headline: "Paul Morar",
    headlineFontSize: 260,
    subline: (
      <>
        <span>{about.tagline.lead}</span>
        <span
          style={{
            fontFamily: "Caveat",
            color: "#E8603C",
            fontSize: 56,
            lineHeight: 0.9,
          }}
        >
          {about.tagline.accent}
        </span>
        <span>{about.tagline.tail}</span>
      </>
    ),
    footer: "paulmorar.com",
  });
}
