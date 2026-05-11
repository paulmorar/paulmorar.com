import type { Metadata } from "next";
import { site } from "@/lib/site";

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // Stringified once at render time; never user input so injection-safe.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Absolute URL builder for a path like "/about" or "/writing/foo".
// Empty / "/" returns the bare site.url.
export function absUrl(path = "/"): string {
  if (!path || path === "/") return site.url;
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

type PageMetadataInput = {
  path?: string;
  title: string;
  description: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: "website" | "profile" | "article";
  };
  twitter?: Metadata["twitter"];
  keywords?: string[];
  authors?: { name: string; url?: string }[];
  alternates?: Metadata["alternates"];
};

// Builds the per-route Metadata block. Centralises the canonical URL +
// OpenGraph/Twitter mirroring boilerplate that otherwise sprawls across pages.
export function pageMetadata(input: PageMetadataInput): Metadata {
  const url = absUrl(input.path);
  const og = input.openGraph ?? {};
  return {
    title: input.title,
    description: input.description,
    keywords: input.keywords,
    authors: input.authors,
    alternates: { canonical: url, ...input.alternates },
    openGraph: {
      title: og.title ?? input.title,
      description: og.description ?? input.description,
      url,
      siteName: site.name,
      locale: site.locale,
      type: og.type ?? "website",
    },
    twitter: input.twitter ?? {
      card: "summary_large_image",
      title: og.title ?? input.title,
      description: og.description ?? input.description,
      creator: site.social.xHandle,
      site: site.social.xHandle,
    },
  };
}

export const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.url}/#person`,
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: site.jobTitle,
  worksFor: {
    "@type": "Organization",
    name: site.worksFor.name,
    url: site.worksFor.url,
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Copenhagen",
    addressCountry: "DK",
  },
  sameAs: [site.social.github, site.social.linkedin, site.social.x],
  image: `${site.url}/apple-icon`,
} as const;

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  inLanguage: "en-GB",
  publisher: { "@id": `${site.url}/#person` },
} as const;

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingMinutes: number;
  tags?: readonly string[];
}) {
  const url = `${site.url}/writing/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    headline: post.title,
    description: post.summary,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: "en-GB",
    keywords: post.tags?.join(", "),
    timeRequired: `PT${post.readingMinutes}M`,
    author: { "@id": `${site.url}/#person` },
    publisher: { "@id": `${site.url}/#person` },
    image: `${url}/opengraph-image`,
    url,
  } as const;
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  } as const;
}

export const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.url}/about#page`,
  url: `${site.url}/about`,
  name: "About Paul Morar",
  about: { "@id": `${site.url}/#person` },
  mainEntity: { "@id": `${site.url}/#person` },
  inLanguage: "en-GB",
} as const;

export function blogSchema(
  posts: readonly {
    slug: string;
    title: string;
    summary: string;
    date: string;
  }[],
) {
  return {
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
}
