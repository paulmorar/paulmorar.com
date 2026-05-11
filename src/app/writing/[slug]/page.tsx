import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PostBody } from "@/components/post-body";
import {
  getAllPosts,
  getPost,
  getPostWithNeighbours,
  formatDate,
} from "@/lib/posts";
import { site } from "@/lib/site";
import {
  JsonLd,
  blogPostingSchema,
  breadcrumbSchema,
  pageMetadata,
} from "@/lib/seo";
import styles from "./page.module.css";

type Params = { slug: string };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const base = pageMetadata({
    path: `/writing/${post.slug}`,
    title: post.title,
    description: post.summary,
    keywords: post.tags ? [...post.tags, ...site.keywords] : undefined,
    authors: [{ name: site.name, url: site.url }],
    openGraph: { type: "article" },
  });

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.date,
      authors: [site.url],
      tags: post.tags ? [...post.tags] : undefined,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const bundle = getPostWithNeighbours(slug);
  if (!bundle) notFound();
  const { post, prev, next } = bundle;

  return (
    <>
      <SiteHeader active="writing" />
      <JsonLd data={blogPostingSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Writing", url: `${site.url}/writing` },
          { name: post.title, url: `${site.url}/writing/${post.slug}` },
        ])}
      />
      <article className={styles.article}>
        <header className={styles.header}>
          <div className={styles.meta}>
            <span>{formatDate(post.date)}</span>
            <span className={styles.dot}>·</span>
            <span>{post.readingMinutes} min read</span>
          </div>
          <h1 className={styles.title}>{post.title}</h1>
          <p className={styles.summary}>{post.summary}</p>
        </header>

        <div className={styles.prose}>
          <PostBody source={post.content} />
        </div>

        <nav className={styles.footerNav} aria-label="More posts">
          {prev ? (
            <Link href={`/writing/${prev.slug}`} className={styles.prev}>
              {prev.title}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/writing/${next.slug}`} className={styles.next}>
              {next.title}
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </article>
      <SiteFooter />
    </>
  );
}
