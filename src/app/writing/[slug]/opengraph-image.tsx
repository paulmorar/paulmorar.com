import { ImageResponse } from "next/og";
import { getPost } from "@/lib/posts";
import { ogFonts } from "@/lib/og-fonts";

export const runtime = "nodejs";
export const alt = "Paul Morar";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
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
          letterSpacing: 2,
          textTransform: "uppercase",
          color: "#6B7280",
          fontWeight: 500,
        }}
      >
        Paul Morar · Writing
      </div>
      <div
        style={{
          fontFamily: "Caveat",
          fontSize: 130,
          fontWeight: 700,
          lineHeight: 1.0,
          color: "#E8603C",
          maxWidth: 1040,
        }}
      >
        {post?.title ?? "Writing"}
      </div>
      <div
        style={{
          fontSize: 26,
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
