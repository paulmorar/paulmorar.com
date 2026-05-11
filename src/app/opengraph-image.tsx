import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const runtime = "nodejs";
export const alt = "Paul Morar — Engineer, builder, writer";
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
          display: "flex",
          alignItems: "center",
          gap: 16,
          fontSize: 24,
          color: "#6B7280",
          letterSpacing: 2,
          textTransform: "uppercase",
          fontWeight: 500,
        }}
      >
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "#10B981",
            boxShadow: "0 0 0 8px rgba(16, 185, 129, 0.18)",
          }}
        />
        Available · Copenhagen
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "Caveat",
            fontSize: 260,
            fontWeight: 700,
            lineHeight: 0.9,
            color: "#E8603C",
          }}
        >
          Paul Morar
        </div>
        <div
          style={{
            fontSize: 38,
            color: "#1B1B1F",
            maxWidth: 980,
            lineHeight: 1.3,
            marginTop: 24,
            display: "flex",
            flexWrap: "wrap",
            gap: 10,
          }}
        >
          <span>Engineer, builder of</span>
          <span
            style={{
              fontFamily: "Caveat",
              color: "#E8603C",
              fontSize: 56,
              lineHeight: 0.9,
            }}
          >
            platforms
          </span>
          <span>, occasional writer.</span>
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
        paulmorar.com
      </div>
    </div>,
    { ...size, fonts },
  );
}
