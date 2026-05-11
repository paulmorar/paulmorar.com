import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { site } from "@/lib/site";
import { JsonLd, breadcrumbSchema } from "@/lib/seo";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: site.title,
  description: site.description,
  alternates: { canonical: site.url },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    type: "profile",
  },
};

export default function HomePage() {
  const latest = getAllPosts()[0];

  return (
    <main className={styles.page}>
      <JsonLd data={breadcrumbSchema([{ name: "Home", url: site.url }])} />
      <section className={styles.card}>
        <div className={styles.eyebrow}>
          <span className={styles.dot} aria-hidden />
          <span>{site.location} · Available for projects</span>
        </div>

        <h1 className={styles.name}>Paul Morar</h1>

        <p className={styles.tagline}>
          Engineer, builder of <em>platforms</em>, occasional writer.
        </p>

        <p className={styles.intro}>
          I lead engineers at Banking Circle in Copenhagen, working on the
          observability and platform layer that keeps a payments business
          honest. Before that: front-ends at Saxo, Vivino, and a handful of
          other places.
        </p>

        <nav className={styles.actions} aria-label="Pages">
          <Link href="/about">About →</Link>
          <Link href="/writing">Writing →</Link>
          <a href={`mailto:${site.email}`}>Email →</a>
        </nav>

        {latest && (
          <div className={styles.teaser}>
            <span className={styles.label}>Latest writing</span>
            <Link
              href={`/writing/${latest.slug}`}
              className={styles.teaserLink}
            >
              {latest.title} <span aria-hidden>→</span>
            </Link>
            <span className={styles.teaserMeta}>
              {formatDate(latest.date)} · {latest.readingMinutes} min read
            </span>
          </div>
        )}

        <div className={styles.footer}>
          <span>© {new Date().getFullYear()} Paul Morar</span>
          <div className={styles.socials}>
            <a href={site.social.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={site.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href={site.social.x} target="_blank" rel="noreferrer">
              X
            </a>
            <a href="/writing/rss.xml">RSS</a>
          </div>
        </div>
      </section>
    </main>
  );
}
