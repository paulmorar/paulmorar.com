import { ImageResponse } from "next/og";
import { ogFonts } from "@/lib/og-fonts";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default async function Icon() {
  const fonts = await ogFonts();
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#E8603C",
        color: "#FEFDF8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Caveat",
        fontWeight: 700,
        fontSize: 22,
        lineHeight: 1,
        paddingBottom: 2,
        borderRadius: 6,
      }}
    >
      pm
    </div>,
    { ...size, fonts },
  );
}
