import { OG_CONTENT_TYPE, renderOgMark } from "@/lib/og";

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = OG_CONTENT_TYPE;

export default async function Icon() {
  return renderOgMark({
    size: 32,
    fontSize: 22,
    paddingBottom: 2,
    borderRadius: 6,
  });
}
