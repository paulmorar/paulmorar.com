import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getAllPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays and notes by Paul Morar on platform engineering, observability, Kubernetes, and the slow craft of shipping software.",
  alternates: {
    canonical: `${site.url}/writing`,
    types: {
      "application/rss+xml": [
        { url: "/writing/rss.xml", title: `${site.name} — Writing` },
      ],
    },
  },
  openGraph: {
    title: `Writing · ${site.name}`,
    description:
      "Essays and notes on platform engineering, observability, and shipping software.",
    url: `${site.url}/writing`,
    type: "website",
  },
};

export default function WritingIndexPage() {
  const posts = getAllPosts();

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${site.url}/writing#blog`,
    url: `${site.url}/writing`,
    name: `${site.name} — Writing`,
    description:
      "Essays and notes on platform engineering, observability, Kubernetes, and shipping software.",
    inLanguage: "en-GB",
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": `${site.url}/writing/${p.slug}#article`,
      headline: p.title,
      description: p.summary,
      datePublished: p.date,
      url: `${site.url}/writing/${p.slug}`,
    })),
  } as const;

  const byYear = posts.reduce<Record<number, typeof posts>>((acc, p) => {
    (acc[p.year] ??= []).push(p);
    return acc;
  }, {});

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <SiteHeader active="writing" />
      <JsonLd data={blogSchema} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", url: site.url },
          { name: "Writing", url: `${site.url}/writing` },
        ])}
      />
      <main className={styles.main}>
        <h1 className={styles.title}>Writing</h1>
        <p className={styles.lede}>
          Notes on engineering, platforms, observability, and whatever else I've
          been chewing on lately.
        </p>

        {posts.length === 0 ? (
          <p className={styles.empty}>Nothing here yet — soon.</p>
        ) : (
          years.map((year) => (
            <section key={year} className={styles.yearGroup}>
              <div className={styles.year}>{year}</div>
              <ol className={styles.list}>
                {byYear[year].map((post) => (
                  <li key={post.slug} className={styles.row}>
                    <div className={styles.date}>{formatDate(post.date)}</div>
                    <div className={styles.entry}>
                      <Link href={`/writing/${post.slug}`}>{post.title}</Link>
                      <p className={styles.summary}>{post.summary}</p>
                      <span className={styles.meta}>
                        {post.readingMinutes} min read
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          ))
        )}
      </main>
      <SiteFooter />
    </>
  );
}
