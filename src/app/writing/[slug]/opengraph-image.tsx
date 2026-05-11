import { getPost } from "@/lib/posts";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgCard } from "@/lib/og";

export const runtime = "nodejs";
export const alt = "Paul Morar";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function OG({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  return renderOgCard({
    eyebrow: "Paul Morar · Writing",
    headline: post?.title ?? "Writing",
    headlineFontSize: 130,
    headlineMaxWidth: 1040,
    footer: "paulmorar.com",
  });
}
