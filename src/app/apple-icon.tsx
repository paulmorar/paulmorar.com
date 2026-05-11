import { OG_CONTENT_TYPE, renderOgMark } from "@/lib/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = OG_CONTENT_TYPE;

export default async function AppleIcon() {
  return renderOgMark({
    size: 180,
    fontSize: 110,
    paddingBottom: 8,
  });
}
