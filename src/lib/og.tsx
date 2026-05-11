// Brand-frame builders for next/og image routes. Owns the cream/orange visual
// language, the 1200x630 layout, and font loading so per-route files only
// supply content.

import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const OG_SIZE = { width: 1200, height: 630 } as const;
export const OG_CONTENT_TYPE = "image/png";

const COLORS = {
  cream: "#FEFDF8",
  ink: "#1B1B1F",
  mute: "#6B7280",
  rule: "#E4E4E7",
  accent: "#E8603C",
  green: "#10B981",
} as const;

type Eyebrow = string | { text: string; dot?: boolean };

export type OgCardOptions = {
  eyebrow: Eyebrow;
  headline: string;
  headlineMaxWidth?: number;
  headlineFontSize?: number;
  subline?: React.ReactNode;
  footer: string;
};

function EyebrowRow({ eyebrow }: { eyebrow: Eyebrow }) {
  const text = typeof eyebrow === "string" ? eyebrow : eyebrow.text;
  const dot = typeof eyebrow === "string" ? false : eyebrow.dot === true;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        fontSize: 24,
        color: COLORS.mute,
        letterSpacing: 2,
        textTransform: "uppercase",
        fontWeight: 500,
      }}
    >
      {dot ? (
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: COLORS.green,
            boxShadow: "0 0 0 8px rgba(16, 185, 129, 0.18)",
          }}
        />
      ) : null}
      {text}
    </div>
  );
}

export async function renderOgCard(
  opts: OgCardOptions,
): Promise<ImageResponse> {
  const fonts = await ogFonts();
  const {
    eyebrow,
    headline,
    headlineFontSize = 300,
    headlineMaxWidth,
    subline,
    footer,
  } = opts;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.cream,
        color: COLORS.ink,
        padding: "80px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        fontFamily: "DM Sans",
      }}
    >
      <EyebrowRow eyebrow={eyebrow} />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "Caveat",
            fontSize: headlineFontSize,
            fontWeight: 700,
            lineHeight: 0.9,
            color: COLORS.accent,
            ...(headlineMaxWidth ? { maxWidth: headlineMaxWidth } : {}),
          }}
        >
          {headline}
        </div>
        {subline ? (
          <div
            style={{
              fontSize: 36,
              color: COLORS.ink,
              maxWidth: 900,
              lineHeight: 1.35,
              marginTop: 24,
              display: "flex",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {subline}
          </div>
        ) : null}
      </div>

      <div
        style={{
          fontSize: 24,
          color: COLORS.mute,
          borderTop: `1px solid ${COLORS.rule}`,
          paddingTop: 24,
        }}
      >
        {footer}
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}

export type OgMarkOptions = {
  size: number;
  fontSize: number;
  paddingBottom: number;
  borderRadius?: number;
};

export async function renderOgMark(
  opts: OgMarkOptions,
): Promise<ImageResponse> {
  const fonts = await ogFonts();
  const { size, fontSize, paddingBottom, borderRadius } = opts;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: COLORS.accent,
        color: COLORS.cream,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Caveat",
        fontWeight: 700,
        fontSize,
        lineHeight: 1,
        paddingBottom,
        ...(borderRadius ? { borderRadius } : {}),
      }}
    >
      pm
    </div>,
    { width: size, height: size, fonts },
  );
}
