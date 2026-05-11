import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const runtime = "nodejs";
export const alt = "Writing — Paul Morar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const fonts = await ogFonts();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#FEFDF8",
        color: "#1B1B1F",
        padding: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "DM Sans",
      }}
    >
      <div
        style={{
          fontSize: 24,
          color: "#6B7280",
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        Paul Morar
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "Caveat",
            fontSize: 300,
            fontWeight: 700,
            lineHeight: 0.9,
            color: "#E8603C",
          }}
        >
          Writing
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#1B1B1F",
            maxWidth: 900,
            lineHeight: 1.35,
            marginTop: 24,
          }}
        >
          Notes on engineering, platforms, observability — and whatever else
          I&apos;ve been chewing on lately.
        </div>
      </div>

      <div
        style={{
          fontSize: 24,
          color: "#6B7280",
          borderTop: "1px solid #E4E4E7",
          paddingTop: 24,
        }}
      >
        paulmorar.com/writing
      </div>
    </div>,
    { ...size, fonts },
  );
}
